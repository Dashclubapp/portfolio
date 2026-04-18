# DashClub Portfolio — CLAUDE.md

## Rôle du projet

Site marketing et plateforme SaaS de DashClub. Permet aux clubs sportifs de souscrire à un abonnement et déclenche automatiquement le provisioning complet de leur site (base de données, sous-domaine, déploiement Vercel d'un club-starter).

- **URL prod** : https://dashclub.app
- **URL démo** : https://demo.dashclub.app
- **Port local** : 3000
- **Framework** : Next.js 14.2 (App Router), React 18, TypeScript, Tailwind CSS 3

---

## Stack technique

| Couche | Techno |
|--------|--------|
| DB | PostgreSQL via Neon (`pg` 8.20) |
| Auth | JWT custom (`jose`) + bcryptjs (12 rounds) |
| Paiement | Stripe 22 (subscriptions + Connect) |
| Email | Resend (principal) / NanoCorp CLI (fallback) |
| Infra provisioning | Neon API + Vercel API + Cloudflare API |
| CAPTCHA | Cloudflare Turnstile |
| Déploiement | Vercel |

---

## Variables d'environnement requises

```
DATABASE_URL                        # Neon PostgreSQL connection string
JWT_SECRET                          # 32+ bytes pour signer les tokens admin
STRIPE_SECRET_KEY                   # sk_live_* ou sk_test_*
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  # pk_live_* ou pk_test_*
STRIPE_PRICE_19                     # Price ID formule Essentiel (19€/mois)
STRIPE_PRICE_49                     # Price ID formule Compétition (49€/mois)
STRIPE_PRICE_99                     # Price ID formule Illimité (99€/mois)
STRIPE_PRICE_DOMAIN                 # Price ID add-on domaine personnalisé
STRIPE_WEBHOOK_SECRET               # whsec_* pour vérification signature webhook
RESEND_API_KEY                      # Clé Resend
INSCRIPTION_NOTIFICATION_EMAIL      # Email destinataire notifications inscriptions
INSCRIPTION_EMAIL_MODE              # "nanocorp" (défaut) ou "capture" (debug)
NEXT_PUBLIC_TURNSTILE_SITE_KEY      # Cloudflare Turnstile public key
TURNSTILE_SECRET_KEY                # Cloudflare Turnstile secret key
NEXT_PUBLIC_SITE_URL                # https://dashclub.app (ou http://localhost:3000)
CRON_SECRET                         # Bearer token pour /api/cron/send-emails
```

---

## Schéma base de données (PostgreSQL brut, pas Prisma)

### `clubs`
- `id`, `nom_club`, `sport`, `ville`, `email`, `telephone`
- `nom_responsable`, `prenom_responsable`
- `formule` — essentiel | saison | competition | illimite
- `stripe_subscription_id`, `stripe_customer_id`
- `stripe_connect_account_id`, `stripe_connect_status` — not_connected | pending | connected
- `onboarding_status` — pending | completed | error
- `website_url`, `instagram_url`, `facebook_url`, `social_placement`
- `description_courte`, `logo_url`, `couleur_primaire`, `couleur_secondaire`

### `club_admin_users`
- `club_id`, `email` (unique), `nom`, `prenom`, `password_hash`
- `setup_token`, `setup_token_expires_at` (validité 72h)
- `last_login`

### `club_domains`
- `club_id`, `subdomain` (unique), `custom_domain`
- `vercel_project_id`, `neon_project_id`
- `created_at`, `activated_at`

### `club_events`
- `club_id`, `titre`, `slug`, `description`
- `date_evenement`, `nb_places`, `tarif_standard`, `tarif_membre`
- `statut` — draft | published

### `email_queue`
- `club_id`, `email_type` — stripe_reminder | event_reminder | share_reminder
- `recipient_email`, `send_at`, `sent_at`
- `status` — pending | sent | skipped | failed

---

## Routes API

### Auth admin
- `POST /api/admin/login` — login email/password → cookie JWT 24h (rate limit : 5 tentatives / 15 min)
- `POST /api/admin/logout` — supprime le cookie
- `GET /api/admin/me` — session courante

### Gestion club (JWT requis)
- `GET/PUT /api/admin/club` — infos du club
- `GET/POST /api/admin/events` — liste / création événement
- `GET /api/admin/stripe-status` — statut Stripe Connect

### Paiement & checkout
- `POST /api/create-checkout-session` — crée une session Stripe Checkout (formule + metadata club)
- `POST /api/stripe/connect/onboard` — démarre l'onboarding Stripe Connect

### Webhooks
- `POST /api/webhooks/stripe` — webhook direct Stripe (`checkout.session.completed`)
- `POST /api/webhooks/nanocorp` — relais NanoCorp (même handler, fallback)
- Les deux appellent `handleSuccessfulSubscription()` dans `lib/onboarding.ts`

### Divers
- `POST /api/setup-password` — création mot de passe admin (token 72h + Turnstile)
- `POST /api/inscription` — formulaire d'inscription (rate limit 5/h)
- `GET /api/cron/send-emails` — traitement file d'attente emails (Bearer CRON_SECRET)

---

## Flux d'onboarding (déclenché par webhook Stripe)

```
1. generateUniqueSubdomain(clubName) → slug unique en DB
2. createClubInDB()                  → INSERT clubs (status: pending)
3. createAdminUser()                 → setupToken 72h
4. provisionClubSite()
   ├── createNeonProject(slug)        → DB dédiée par club
   ├── createSubdomain(slug)          → CNAME Cloudflare *.dashclub.app
   └── createVercelProject()          → déploie club-starter avec les env vars
5. sendWelcomeEmail()                → lien /setup-password/[token]
6. scheduleEmailSequence()           → email_queue : J+1, J+3, J+5
7. updateOnboardingStatus('completed')
```

---

## Séquence emails (cron horaire)

| Type | Délai | Condition d'envoi |
|------|-------|-------------------|
| `stripe_reminder` | J+1 | `stripe_connect_status != 'connected'` |
| `event_reminder` | J+3 | Toujours (TODO: vérifier si événement créé) |
| `share_reminder` | J+5 | Toujours |

---

## Middleware & sécurité

- IP allowlist : 90.47.13.240 et 2001:4860:7:150f::fc
- Demo host (`demo.dashclub.app`) : `/back/*` → `/demo/admin/*`, `/*` → `/demo/club/*`
- Routes `/admin/*` protégées par JWT (sauf `/admin/login`)
- Route `/docs` protégée par cookie `dashclub_access`
- Headers : X-Frame-Options DENY, CSP, HSTS, Referrer-Policy

---

## Fichiers clés

- `lib/onboarding.ts` — orchestrateur du provisioning
- `lib/db.ts` — pool PostgreSQL (query générique)
- `lib/admin-auth.ts` — vérification JWT cookie
- `lib/provisioning/neon.ts` — création DB Neon
- `lib/provisioning/cloudflare.ts` — création CNAME
- `lib/provisioning/vercel.ts` — déploiement Vercel
- `lib/nanocorp-email.ts` — envoi email via CLI NanoCorp
- `middleware.ts` — routing demo, auth admin, IP filter

---

## Ce qui manque / TODO

- Retry automatique si une étape du provisioning échoue
- Webhook dead-letter queue (pas de relance sur échec)
- Vérification d'existence d'événement avant `event_reminder` (TODO dans `cron/send-emails/route.ts`)
