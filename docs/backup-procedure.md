# Procédure de sauvegarde mensuelle — DashClub

> **Pour qui ?** Ce document est destiné au CEO de Triflow. Aucune compétence technique n'est requise.
> **Durée estimée :** 5 à 10 minutes par mois.

---

## Pourquoi sauvegarder ?

Le site DashClub est hébergé sur la plateforme NanoCorp et déployé automatiquement depuis GitHub. En cas de suppression accidentelle, de bug critique ou de problème d'hébergement, une sauvegarde vous permet de restaurer le site complet en quelques minutes.

---

## Ce qui est sauvegardé

| Élément | Contenu |
|---|---|
| **Code source** | Toutes les pages (accueil, /formules, /inscription) |
| **Assets** | Logo (logo-dark.svg, logo-white.svg, favicon.svg) |
| **Styles** | CSS global (globals.css), configuration Tailwind |
| **Configuration** | Meta tags SEO, structure Next.js, middleware sécurité |
| **Composants** | Navigation mobile, formulaire d'inscription, cartes pricing |

---

## Méthode 1 — Téléchargement depuis GitHub (recommandée)

Le code source complet est versionné sur GitHub à l'adresse :
**https://github.com/nanocorp-hq/triflow**

### Étapes pas à pas

**Étape 1 — Ouvrir le dépôt GitHub**
1. Ouvrez votre navigateur
2. Allez sur : https://github.com/nanocorp-hq/triflow
3. Connectez-vous si nécessaire

**Étape 2 — Télécharger le ZIP**
1. Cliquez sur le bouton vert **`< > Code`** (en haut à droite de la liste des fichiers)
2. Dans le menu déroulant, cliquez sur **"Download ZIP"**
3. Un fichier `triflow-main.zip` se télécharge sur votre ordinateur

**Étape 3 — Renommer le fichier**
Renommez le fichier selon la convention :
```
dashclub-backup-YYYY-MM.zip
```
Exemples :
- `dashclub-backup-2026-04.zip` (pour avril 2026)
- `dashclub-backup-2026-05.zip` (pour mai 2026)

**Étape 4 — Stocker la sauvegarde**
Déposez le fichier ZIP dans votre dossier de sauvegarde (voir section "Où stocker" ci-dessous).

---

## Méthode 2 — Export via NanoCorp CLI (pour utilisateur technique)

Si vous avez accès au terminal NanoCorp, utilisez le script automatisé :

```bash
cd /chemin/vers/le/repo
./scripts/backup.sh
```

Ce script génère automatiquement un fichier `dashclub-backup-YYYY-MM.zip` avec l'intégralité du code source.

---

## Où stocker la sauvegarde ?

### Recommandation : Google Drive ⭐

**Pourquoi Google Drive ?**
- Accessible depuis n'importe quel appareil
- Partageable facilement avec votre équipe
- Gratuit jusqu'à 15 Go
- Interface simple et connue

**Organisation recommandée dans Google Drive :**
```
📁 DashClub — Sauvegardes
    📄 dashclub-backup-2026-04.zip
    📄 dashclub-backup-2026-03.zip
    📄 dashclub-backup-2026-02.zip
    ...
```

### Alternatives acceptables

| Service | Avantages | Pour qui |
|---|---|---|
| **iCloud Drive** | Intégré sur Mac/iPhone | Utilisateurs Apple |
| **Dropbox** | Très simple, historique des versions | Équipes mixtes |
| **OneDrive** | Intégré Windows | Utilisateurs Windows |

### À éviter
- ❌ Stocker uniquement sur l'ordinateur local (risque de perte)
- ❌ Envoyer par email à soi-même (limite de taille, difficile à retrouver)

---

## Comment vérifier que la sauvegarde est complète ?

### Vérification rapide (2 minutes)

1. **Ouvrez le fichier ZIP** — il doit pouvoir s'ouvrir sans erreur
2. **Vérifiez la présence des dossiers clés :**
   - `app/` (pages du site)
   - `public/` (images et logo)
   - `components/` (composants réutilisables)
   - `package.json` (configuration du projet)
3. **Vérifiez la date** — le fichier ZIP doit avoir été créé aujourd'hui

### Vérification approfondie (optionnelle, 10 minutes)

Si vous souhaitez vérifier que le site peut être reconstruit :
1. Envoyez le ZIP à votre développeur technique
2. Demandez-lui de confirmer que le site peut être redéployé depuis cette archive

### Indicateurs d'une bonne sauvegarde

✅ Fichier ZIP non corrompu (s'ouvre sans erreur)
✅ Taille du fichier entre 1 Mo et 50 Mo (taille normale pour ce site)
✅ Présence du dossier `app/` avec au minimum 3 sous-dossiers (`formules/`, `inscription/`, `admin/`)
✅ Présence des fichiers SVG dans `public/` (logo-dark.svg, logo-white.svg, favicon.svg)
✅ Fichier `package.json` présent à la racine

---

## Combien garder d'archives ?

**Recommandation : conserver les 6 derniers mois**

Cela représente 6 fichiers ZIP, soit environ 50-300 Mo au total — très raisonnable.

Chaque début d'année, archivez les sauvegardes de l'année précédente dans un sous-dossier `Archives/2025/`.

---

## En cas de problème

Si vous avez besoin de **restaurer** le site depuis une sauvegarde :
1. Contactez votre développeur technique
2. Fournissez-lui le fichier ZIP de la dernière sauvegarde
3. Il pourra redéployer le site en moins d'une heure

Le site est hébergé sur Vercel (via NanoCorp). La restauration consiste à ré-uploader le code source sur GitHub — le déploiement est ensuite automatique.

---

*Document créé le 15 avril 2026 — à réviser si l'infrastructure change.*
