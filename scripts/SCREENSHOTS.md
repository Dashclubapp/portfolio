# Screenshots hero DashClub

Les screenshots du hero sont capturés automatiquement depuis les pages live de `demo.dashclub.app`.
Ils sont committés dans `/public/hero/` — **pas générés au build**.

## Lancer la capture

```bash
npm run screenshots
```

Aucune variable d'environnement requise — la démo est publique (pas de login).

## Architecture démo

`demo.dashclub.app` est servi par le Portfolio Next.js (pas un déploiement club-starter séparé) :
- Routes publiques → `/demo/club/*`
- `/back/*` → `/demo/admin/*` (back-office démo sans authentification)

## Fichiers générés

| Fichier | Description |
|---|---|
| `public/hero/screenshot-site-desktop.png` | Site public, 1280×800 |
| `public/hero/screenshot-site-mobile.png` | Site public, 390×844 |
| `public/hero/screenshot-backoffice-desktop.png` | Back-office, 1280×800 |
| `public/hero/screenshot-backoffice-mobile.png` | Back-office, 390×844 |

## Quand régénérer

- Refonte UI du site démo (`demo.dashclub.app`)
- Changement de données démo (événements, licenciés, etc.)
- Mise à jour branding (couleurs, logo)
- Avant un déploiement Vercel si les visuels hero sont obsolètes

## Commit workflow

```bash
npm run screenshots
git add public/hero/*.png
git commit -m "chore: update hero screenshots"
git push
```

## Masquage des données sensibles

Le script injecte du JS avant la capture pour masquer :
- Le nom et les initiales de l'utilisateur connecté (top-bar)
- Le message de bienvenue avec le prénom dans le dashboard

Les données du club (inscrits, recettes, événements) sont des données démo — elles peuvent apparaître.
