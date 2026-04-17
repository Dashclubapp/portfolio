export default function DocsDns() {
  return (
    <article className="prose prose-stone max-w-none">
      <Breadcrumb label="Configurer votre nom de domaine" />

      <h1>🌐 Connecter votre domaine personnalisé</h1>
      <p className="lead">
        Votre site DashClub est accessible par défaut sur <code>votreclubname.dashclub.app</code>.
        Ce guide vous explique comment le rendre accessible sur votre propre domaine (ex : <code>monclub.fr</code>).
      </p>

      <Prereqs items={[
        'Posséder un nom de domaine (ex : monclub.fr)',
        'Avoir accès à l\'interface de gestion DNS de votre registrar',
      ]} />

      <h2>Étape 1 — Trouver votre sous-domaine DashClub</h2>
      <p>
        Connectez-vous à votre backoffice DashClub puis allez dans{' '}
        <strong>Paramètres → Domaine personnalisé</strong>. Vous y trouverez votre sous-domaine actuel
        (ex : <code>monclub.dashclub.app</code>).
      </p>

      <h2>Étape 2 — Créer un enregistrement CNAME chez votre registrar</h2>
      <p>
        Rendez-vous dans l&apos;interface DNS de votre registrar et ajoutez l&apos;enregistrement suivant :
      </p>

      <DnsTable rows={[
        ['Type', 'Nom / Hôte', 'Valeur / Destination', 'TTL'],
        ['CNAME', 'www', 'votreclubname.dashclub.app', '3600'],
      ]} />

      <Info>
        Si vous souhaitez utiliser la racine du domaine (<code>monclub.fr</code> sans <code>www</code>),
        certains registrars proposent un enregistrement <strong>ALIAS</strong> ou <strong>ANAME</strong> à la place du CNAME.
        Vérifiez la documentation de votre prestataire.
      </Info>

      <h2>Étape 3 — Renseigner le domaine dans DashClub</h2>
      <p>
        De retour dans votre backoffice <strong>Paramètres → Domaine personnalisé</strong>,
        saisissez votre domaine (ex : <code>www.monclub.fr</code>) et cliquez sur <strong>Enregistrer</strong>.
        DashClub configurera automatiquement le certificat SSL.
      </p>

      <h2>Étape 4 — Attendre la propagation DNS</h2>
      <p>
        La propagation DNS peut prendre de <strong>quelques minutes à 48 heures</strong> selon votre registrar.
        Vous pouvez vérifier l&apos;état avec{' '}
        <a href="https://dnschecker.org" target="_blank" rel="noopener noreferrer">dnschecker.org</a>.
      </p>

      <h2>Documentation par registrar</h2>
      <p>Retrouvez les guides spécifiques à votre hébergeur DNS :</p>

      <ul>
        <ProviderLink name="OVH" href="https://help.ovhcloud.com/csm/fr-dns-edit-dns-zone?id=kb_article_view&sysparm_article=KB0051683" />
        <ProviderLink name="Gandi" href="https://docs.gandi.net/fr/noms_de_domaine/gestion_courante/modifier_la_zone_dns.html" />
        <ProviderLink name="Namecheap" href="https://www.namecheap.com/support/knowledgebase/article.aspx/315/2237/how-to-create-cname-records/" />
        <ProviderLink name="GoDaddy" href="https://fr.godaddy.com/help/ajouter-un-enregistrement-cname-19300" />
        <ProviderLink name="Cloudflare" href="https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/" />
        <ProviderLink name="Google Domains / Squarespace Domains" href="https://support.google.com/domains/answer/9211383" />
        <ProviderLink name="Ionos (1&1)" href="https://www.ionos.fr/assistance/domaines/creer-un-enregistrement-cname/" />
      </ul>

      <h2>En cas de problème</h2>
      <p>
        Si votre domaine n&apos;est toujours pas actif après 48h, contactez-nous à{' '}
        <a href="mailto:hello@dashclub.app">hello@dashclub.app</a> en indiquant votre domaine.
        Nous diagnostiquerons le problème avec vous.
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

function DnsTable({ rows }: { rows: string[][] }) {
  const [head, ...body] = rows;
  return (
    <div className="not-prose my-4 overflow-x-auto rounded-xl border border-stone-200">
      <table className="w-full text-sm">
        <thead className="bg-stone-50">
          <tr>
            {head.map(h => (
              <th key={h} className="px-4 py-2.5 text-left font-semibold text-stone-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i} className="border-t border-stone-100">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 font-mono text-stone-800">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
