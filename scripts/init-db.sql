-- ─── DashClub — Schéma base de données ───────────────────────────────────────

-- Clubs
CREATE TABLE IF NOT EXISTS clubs (
  id                    SERIAL PRIMARY KEY,
  nom_club              TEXT NOT NULL,
  sport                 TEXT,
  ville                 TEXT,
  nom_responsable       TEXT NOT NULL,
  prenom_responsable    TEXT NOT NULL,
  email                 TEXT NOT NULL UNIQUE,
  telephone             TEXT,
  formule               TEXT NOT NULL DEFAULT 'essentiel',
  stripe_subscription_id TEXT,
  stripe_customer_id    TEXT,
  onboarding_status     TEXT NOT NULL DEFAULT 'pending',
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Utilisateurs admin des clubs
CREATE TABLE IF NOT EXISTS club_admin_users (
  id            SERIAL PRIMARY KEY,
  club_id       INTEGER NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  email         TEXT NOT NULL UNIQUE,
  nom           TEXT,
  prenom        TEXT,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Domaines / sous-domaines des clubs
CREATE TABLE IF NOT EXISTS club_domains (
  id            SERIAL PRIMARY KEY,
  club_id       INTEGER NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  subdomain     TEXT NOT NULL UNIQUE,
  custom_domain TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  activated_at  TIMESTAMPTZ
);

-- Pages des sites clubs
CREATE TABLE IF NOT EXISTS club_pages (
  id         SERIAL PRIMARY KEY,
  club_id    INTEGER NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  slug       TEXT NOT NULL,
  titre      TEXT NOT NULL,
  contenu    TEXT,
  publie     BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (club_id, slug)
);

-- File d'attente d'emails (J+1, J+3, J+5...)
CREATE TABLE IF NOT EXISTS email_queue (
  id               SERIAL PRIMARY KEY,
  club_id          INTEGER NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  email_type       TEXT NOT NULL,
  recipient_email  TEXT NOT NULL,
  send_at          TIMESTAMPTZ NOT NULL,
  status           TEXT NOT NULL DEFAULT 'pending',
  sent_at          TIMESTAMPTZ,
  error            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (club_id, email_type)
);

-- Index utiles
CREATE INDEX IF NOT EXISTS idx_clubs_email ON clubs(email);
CREATE INDEX IF NOT EXISTS idx_clubs_onboarding_status ON clubs(onboarding_status);
CREATE INDEX IF NOT EXISTS idx_club_domains_subdomain ON club_domains(subdomain);
CREATE INDEX IF NOT EXISTS idx_email_queue_send_at ON email_queue(send_at) WHERE status = 'pending';
