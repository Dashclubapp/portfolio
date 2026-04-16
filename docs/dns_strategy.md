# Stratégie DNS - Domaines personnalisés Clubboard

## Objectif
Définir une stratégie simple, scalable et opérable pour permettre a chaque club Clubboard de connecter son propre domaine a son site heberge sur la plateforme.

Exemples:
- sous-domaine natif Clubboard: `clubname.clubboard.app`
- domaine personnalise client: `monclub.fr` ou `www.monclub.fr`

## Architecture recommandee

### 1. Domaine plateforme par defaut
- Configurer un wildcard DNS sur `*.clubboard.app`.
- Chaque club recoit automatiquement un sous-domaine de la forme `clubslug.clubboard.app`.
- L'application Clubboard resolve le tenant a partir du host recu dans la requete.
- Ce domaine wildcard reste le point d'entree de secours tant qu'un domaine personnalise n'est pas actif.

### 2. Gestion des domaines personnalises via Vercel
- Utiliser Vercel comme couche principale d'exposition publique et de terminaison TLS pour les domaines personnalises.
- Lorsqu'un club ajoute un domaine, Clubboard rattache ce domaine au projet Vercel via l'API Domains/Projects.
- Vercel gere ensuite le routage HTTP(S) du domaine client vers l'application Clubboard deja deployee.
- Vercel est l'option recommandee pour la premiere version car elle reduit fortement la complexite d'exploitation:
  - ajout de domaine programmable,
  - verification DNS,
  - provisionnement SSL automatique,
  - gestion centralisee au niveau du projet.

### 3. Reverse proxy / couche edge
- Option recommandee court terme: Vercel uniquement, sans couche supplementaire.
- Option d'evolution: ajouter Cloudflare Workers devant l'application si Clubboard a besoin plus tard de logique edge avancee:
  - normalisation de hostnames,
  - protections anti-abus,
  - redirects globaux,
  - observabilite DNS/HTTP plus fine,
  - architecture "Custom Hostnames" / SaaS a grande echelle.
- Tant que le besoin principal est simplement de connecter des domaines clients a une meme application multi-tenant, Vercel seul est le chemin le plus simple.

### 4. SSL automatique
- Pour `*.clubboard.app`, le certificat wildcard de la plateforme couvre les sous-domaines natifs.
- Pour les domaines personnalises, le certificat SSL doit etre gere automatiquement apres verification DNS.
- Strategie recommandee:
  - avec Vercel: laisser Vercel provisionner automatiquement les certificats Let's Encrypt;
  - avec Cloudflare en alternative future: laisser Cloudflare gerer les certificats edge pour les hostnames clients.
- Aucun certificat ne doit etre gere manuellement par l'equipe pour les clubs standards.

### 5. Pilotage programmatique avec Vercel Domains API
- Clubboard doit appeler l'API Vercel des qu'un club soumet un domaine.
- Donnees a conserver cote Clubboard:
  - domaine demande,
  - identifiant du club,
  - statut de verification,
  - identifiant renvoye par Vercel si disponible,
  - date de verification finale.
- Le back-office Clubboard reste la source de verite metier; Vercel est la source de verite d'infrastructure pour l'attachement du domaine et l'etat DNS/SSL.

Operations API a prevoir dans l'implementation:
- `POST /v9/projects/{idOrName}/domains` pour rattacher un domaine au projet Clubboard.
- `POST /v9/projects/{idOrName}/domains/{domain}/verify` pour declencher ou retenter la verification DNS si necessaire.
- `DELETE /v9/projects/{idOrName}/domains/{domain}` pour detacher un domaine quand un club le retire.

Ce cycle permet a Clubboard d'automatiser l'ajout, la verification et la suppression sans intervention manuelle sur Vercel.

## Flux technique complet pour l'ajout d'un domaine client

### Etape 1 - Saisie dans le back-office
Le club renseigne son domaine dans le back-office Clubboard.

Contraintes recommandees:
- normaliser en minuscules,
- retirer le prefixe `https://` si l'utilisateur le colle,
- interdire les chemins et parametres,
- verifier que le format du domaine est valide.

### Etape 2 - Enregistrement en base
Clubboard cree un enregistrement dans la table `custom_domains` avec le statut initial `pending`.

Objectif:
- garder une trace des demandes,
- eviter les doublons,
- permettre la reprise en cas d'erreur ou de propagation DNS lente.

### Etape 3 - Ajout du domaine au projet Vercel
Clubboard appelle l'API Vercel pour rattacher le domaine au projet applicatif.

Resultat attendu:
- Vercel enregistre le domaine,
- renvoie un etat de configuration,
- expose les informations necessaires pour guider la configuration DNS.

### Etape 4 - Provisionnement SSL automatique
Une fois le domaine ajoute dans Vercel, la plateforme prepare automatiquement l'emission du certificat SSL.

Le certificat ne devient actif qu'apres:
- presence des bons enregistrements DNS,
- propagation DNS suffisante,
- verification du challenge par le fournisseur edge.

### Etape 5 - Affichage des instructions DNS au club
Clubboard affiche au club les enregistrements a creer chez son registrar/DNS provider.

Regles produit recommandees:
- domaine apex (`monclub.fr`): afficher un `A record` vers la cible recommandee par Vercel;
- sous-domaine (`www.monclub.fr`): afficher un `CNAME` vers la cible fournie par Vercel;
- si Vercel retourne une methode nameserver/verif specifique, afficher exactement cette configuration.

L'interface doit aussi montrer:
- la valeur attendue,
- le type d'enregistrement,
- un message clair indiquant que la propagation peut prendre de quelques minutes a 24-48h selon le provider.

### Etape 6 - Verification periodique
Un cron job Clubboard verifie regulierement les domaines en statut `pending`.

Pour chaque domaine:
- verifier la resolution DNS reelle,
- verifier l'etat remonte par Vercel si disponible,
- passer le statut a `active` quand la configuration est correcte,
- enregistrer `verified_at`,
- consigner un statut `error` si la configuration est invalide de maniere durable ou si l'API retourne une erreur non recuperable.

## Schema SQL recommande

```sql
CREATE TABLE custom_domains (
  id SERIAL PRIMARY KEY,
  club_id INTEGER REFERENCES clubs(id),
  domain VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending / active / error
  vercel_domain_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP
);
```

## Variables d'environnement necessaires
- `VERCEL_TOKEN`: token API Vercel utilise par le backend Clubboard.
- `VERCEL_PROJECT_ID`: identifiant du projet Vercel auquel rattacher les domaines clients.
- `VERCEL_TEAM_ID`: identifiant d'equipe Vercel si le projet n'est pas dans un compte personnel.

## Recommandations d'implementation
- Conserver `clubboard.app` comme domaine technique permanent, meme si le club utilise un domaine personnalise.
- Privilegier `www.monclub.fr` + redirection du domaine apex si le provider DNS du club gere mal certaines configurations apex.
- Ajouter des logs structures sur chaque transition `pending -> active` et `pending -> error`.
- Ne jamais baser l'activation uniquement sur la saisie utilisateur; toujours attendre une verification DNS reelle.
- Prevoir plus tard une gestion explicite des collisions de domaine:
  - domaine deja utilise par un autre club,
  - domaine deja attache a un autre projet Vercel,
  - domaine en cours de migration.

## Decision recommandee
- **Court terme:** `*.clubboard.app` en wildcard + gestion des domaines personnalises directement dans Vercel.
- **Moyen terme:** cron de verification DNS + back-office de suivi des statuts.
- **Long terme:** evaluer Cloudflare Workers/Cloudflare for SaaS uniquement si Clubboard a besoin d'une couche edge plus puissante ou d'un volume de custom domains qui depasse le confort operationnel de la premiere architecture.
