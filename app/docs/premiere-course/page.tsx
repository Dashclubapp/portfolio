export default function DocsPremiereEpreuve() {
  return (
    <article className="prose prose-stone max-w-none">
      <Breadcrumb label="Créer votre première course" />

      <h1>🏁 Créer et publier votre première course</h1>
      <p className="lead">
        Ce guide vous accompagne pas à pas pour créer un événement sportif avec inscription en ligne
        et paiement sécurisé, directement depuis votre backoffice DashClub.
      </p>

      <Prereqs items={[
        'Être connecté à votre backoffice DashClub',
        'Avoir connecté votre compte Stripe (voir guide Stripe)',
        'Avoir les informations de base de votre course (date, lieu, distances)',
      ]} />

      <h2>Étape 1 — Accéder à la création d&apos;événement</h2>
      <p>
        Depuis votre backoffice, cliquez sur <strong>Événements</strong> dans le menu de gauche,
        puis sur le bouton <strong>"+ Nouvel événement"</strong>.
      </p>

      <h2>Étape 2 — Remplir les informations de base</h2>
      <Steps items={[
        'Donnez un nom à votre course (ex : "Triathlon de printemps 2025")',
        'Choisissez la date et l\'heure de départ',
        'Ajoutez le lieu (ville, adresse ou nom du site)',
        'Rédigez une description (présentation de la course, parcours, etc.)',
        'Ajoutez une image de couverture si disponible',
      ]} />

      <h2>Étape 3 — Configurer les distances et catégories</h2>
      <p>
        Vous pouvez créer plusieurs <strong>épreuves</strong> au sein d&apos;un même événement
        (ex : Sprint, Olympique, Longue distance). Pour chaque épreuve :
      </p>
      <ul>
        <li>Nommez l&apos;épreuve (ex : "Sprint — 750m / 20km / 5km")</li>
        <li>Définissez le prix d&apos;inscription (HT ou TTC)</li>
        <li>Fixez la date limite d&apos;inscription</li>
        <li>Optionnel : limitez le nombre de participants</li>
      </ul>

      <Info>
        Vous pouvez proposer un tarif réduit (licenciés FFTri, jeunes…) en ajoutant plusieurs
        niveaux de prix pour la même épreuve.
      </Info>

      <h2>Étape 4 — Configurer le formulaire d&apos;inscription</h2>
      <p>
        DashClub génère automatiquement un formulaire d&apos;inscription standard.
        Vous pouvez y ajouter des champs personnalisés selon vos besoins :
      </p>
      <ul>
        <li>Numéro de licence</li>
        <li>Club d&apos;appartenance</li>
        <li>Certificat médical (upload de fichier)</li>
        <li>Questions personnalisées (texte, case à cocher…)</li>
      </ul>

      <h2>Étape 5 — Publier l&apos;événement</h2>
      <p>
        Une fois toutes les informations renseignées, cliquez sur <strong>"Publier l&apos;événement"</strong>.
        Votre course sera immédiatement visible sur votre site club et les inscriptions seront ouvertes.
      </p>

      <Success>
        Votre événement est en ligne ! Partagez le lien de votre page événement sur vos réseaux
        sociaux et newsletters pour maximiser les inscriptions.
      </Success>

      <h2>Gérer les inscriptions</h2>
      <p>
        Depuis <strong>Événements → [Nom de votre course] → Inscriptions</strong>, vous pouvez :
      </p>
      <ul>
        <li>Voir la liste des inscrits en temps réel</li>
        <li>Exporter la liste en CSV (pour les chronométreurs, la préparation du dossard…)</li>
        <li>Rembourser un participant si besoin (via Stripe)</li>
        <li>Envoyer un email à tous les inscrits</li>
      </ul>

      <h2>En cas de problème</h2>
      <p>
        Vous rencontrez un problème lors de la création de votre événement ? Contactez-nous à{' '}
        <a href="mailto:hello@dashclub.app">hello@dashclub.app</a>{' '}
        et nous vous répondrons sous 24h ouvrées.
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

function Success({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-6 rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-800 leading-relaxed">
      <span className="mr-1.5">✅</span>{children}
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
