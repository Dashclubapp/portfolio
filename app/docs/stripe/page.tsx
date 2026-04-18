export default function DocsStripe() {
  return (
    <article className="prose prose-stone max-w-none">
      <Breadcrumb label="Connecter Stripe pour les paiements" />

      <h1>💳 Connecter votre compte Stripe</h1>
      <p className="lead">
        DashClub utilise <strong>Stripe Connect</strong> pour vous permettre de collecter les paiements
        directement sur votre compte bancaire, sans commission DashClub, avec une sécurité de niveau bancaire.
      </p>

      <Prereqs items={[
        'Avoir un compte Stripe (gratuit à créer)',
        'Avoir un RIB / IBAN de votre association ou compte pro',
        'Être connecté à votre backoffice DashClub',
      ]} />

      <h2>Pourquoi Stripe ?</h2>
      <p>
        Stripe est la référence mondiale du paiement en ligne, utilisée par des millions d&apos;associations et d&apos;entreprises.
        Les avantages pour votre club :
      </p>
      <ul>
        <li><strong>0 % de commission DashClub</strong> — seuls les frais Stripe s&apos;appliquent (1,5 % + 0,25 € par transaction pour les cartes européennes)</li>
        <li>Paiement par carte, Apple Pay, Google Pay</li>
        <li>Versements automatiques sur votre compte bancaire</li>
        <li>Tableau de bord Stripe pour suivre toutes vos transactions</li>
      </ul>

      <h2>Étape 1 — Créer un compte Stripe</h2>
      <p>
        Si vous n&apos;avez pas encore de compte Stripe, rendez-vous sur{' '}
        <a href="https://stripe.com/fr" target="_blank" rel="noopener noreferrer">stripe.com</a> et créez un compte gratuit.
        Choisissez le type <strong>Association / Entreprise individuelle</strong> selon votre situation.
      </p>
      <Info>
        Pour les associations loi 1901, Stripe demande le numéro RNA ou SIRET, une pièce d&apos;identité
        du représentant légal et un RIB. Préparez ces documents avant de commencer.
      </Info>

      <h2>Étape 2 — Lancer l&apos;onboarding depuis DashClub</h2>
      <p>
        Dans votre backoffice DashClub, allez dans <strong>Paramètres → Paiements Stripe</strong> et cliquez sur
        <strong> &ldquo;Connecter Stripe&rdquo;</strong>. Vous serez redirigé vers Stripe pour compléter la configuration.
      </p>

      <Steps items={[
        'Renseignez vos informations légales (SIRET ou RNA, adresse)',
        'Ajoutez votre compte bancaire (IBAN) pour les virements',
        'Vérifiez votre identité (pièce d\'identité du représentant légal)',
        'Validez et revenez sur DashClub',
      ]} />

      <h2>Étape 3 — Vérifier la connexion</h2>
      <p>
        Une fois revenu sur votre backoffice, le statut Stripe doit afficher <strong>✅ Connecté</strong>.
        Vous pouvez maintenant activer les paiements sur vos événements.
      </p>

      <h2>Tester avec une carte de test</h2>
      <p>
        Avant de publier votre premier événement, vous pouvez tester le paiement en mode test Stripe
        avec la carte <code>4242 4242 4242 4242</code>, date <code>12/34</code>, CVC <code>123</code>.
      </p>

      <h2>Documentation Stripe utile</h2>
      <ul>
        <ProviderLink name="Guide Stripe Connect pour les plateformes" href="https://stripe.com/fr/connect" />
        <ProviderLink name="Frais Stripe en France" href="https://stripe.com/fr/pricing" />
        <ProviderLink name="Vérification d'identité Stripe" href="https://stripe.com/fr/docs/connect/identity-verification" />
        <ProviderLink name="FAQ Stripe pour les associations" href="https://support.stripe.com/questions/supported-business-types" />
      </ul>

      <h2>En cas de problème</h2>
      <p>
        Si votre compte Stripe est bloqué ou si vous rencontrez un problème lors de l&apos;onboarding,
        contactez-nous à{' '}
        <a href="mailto:hello@dashclub.app">hello@dashclub.app</a>.
        Nous pouvons vous accompagner étape par étape.
      </p>
    </article>
  );
}

function Breadcrumb({ label }: { label: string }) {
  return (
    <nav className="not-prose mb-6 flex items-center gap-1.5 text-sm text-stone-400">
      <a href="/docs" className="hover:text-stone-600">Documentation</a>
      <span>›</span>
      <span className="text-stone-700">{label}</span>
    </nav>
  );
}

function Prereqs({ items }: { items: string[] }) {
  return (
    <div className="not-prose my-6 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">Prérequis</p>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
            <span className="mt-0.5 text-blue-400">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-xl border border-amber-100 bg-amber-50 px-5 py-4 text-sm text-amber-800 leading-relaxed">
      <span className="mr-1.5">💡</span>{children}
    </div>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="not-prose my-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C9A84C] text-xs font-bold text-white">
            {i + 1}
          </span>
          <span className="text-sm text-stone-700 leading-6">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function ProviderLink({ name, href }: { name: string; href: string }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">
        {name} →
      </a>
    </li>
  );
}
