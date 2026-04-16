import { adminRecentRegistrations } from "../usm-data";

export default function AdminDashboard() {
  const kpis = [
    {
      icon: "📊",
      label: "Inscrits ce mois",
      value: "34",
      delta: "+12 vs mois dernier",
      positive: true,
    },
    {
      icon: "💰",
      label: "Revenus du mois",
      value: "2 847€",
      delta: "+18%",
      positive: true,
    },
    {
      icon: "👥",
      label: "Adhérents actifs",
      value: "142",
      delta: "23 en renouvellement",
      positive: null,
    },
    {
      icon: "📅",
      label: "Prochain événement",
      value: "47 jours",
      delta: "Triathlon de Mézy",
      positive: null,
    },
  ];

  const notifications = [
    {
      color: "bg-amber-50 border-amber-200 text-amber-800",
      dot: "🟡",
      text: "23 adhérents ont leur licence qui expire dans 30 jours",
      action: "Envoyer un email de rappel ?",
      actionHref: "/demo/admin/emails",
    },
    {
      color: "bg-green-50 border-green-200 text-green-800",
      dot: "🟢",
      text: "12 personnes sur liste d'attente Duathlon Printanier",
      action: "Un désistement libère automatiquement une place",
      actionHref: "/demo/admin/evenements",
    },
    {
      color: "bg-blue-50 border-blue-200 text-blue-800",
      dot: "🔵",
      text: "Bilan de saison disponible en PDF",
      action: "Généré automatiquement — Télécharger",
      actionHref: "#",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Dashboard
        </h1>
        <p className="text-sm text-[#0D1F3C]/50">Bonjour, voici le résumé de votre club.</p>
      </div>

      {/* KPIs */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{kpi.icon}</span>
              {kpi.positive !== null && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    kpi.positive ? "bg-green-50 text-green-700" : "bg-[#0D1F3C]/5 text-[#0D1F3C]/60"
                  }`}
                >
                  {kpi.delta}
                </span>
              )}
            </div>
            <p
              className="mt-3 text-3xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {kpi.value}
            </p>
            <p className="mt-1 text-xs text-[#0D1F3C]/50">{kpi.label}</p>
            {kpi.positive === null && (
              <p className="mt-0.5 text-xs text-[#0D1F3C]/40">{kpi.delta}</p>
            )}
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className="mb-8 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0D1F3C]/50">
          Notifications
        </h2>
        {notifications.map((notif) => (
          <div
            key={notif.text}
            className={`flex items-start gap-3 rounded-xl border p-4 ${notif.color}`}
          >
            <span>{notif.dot}</span>
            <div className="flex-1">
              <p className="text-sm font-medium">{notif.text}</p>
              <a href={notif.actionHref} className="mt-0.5 text-xs underline opacity-70">
                {notif.action}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Recent registrations */}
      <div className="rounded-2xl border border-[#0D1F3C]/10 bg-white shadow-sm">
        <div className="border-b border-[#0D1F3C]/10 px-6 py-4">
          <h2
            className="font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Dernières inscriptions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#0D1F3C]/5 bg-[#F8F6F1] text-left text-xs font-medium uppercase tracking-wider text-[#0D1F3C]/40">
                <th className="px-6 py-3">Nom</th>
                <th className="px-4 py-3">Prénom</th>
                <th className="px-4 py-3">Événement</th>
                <th className="px-4 py-3">Formule</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0D1F3C]/5">
              {adminRecentRegistrations.map((reg, i) => (
                <tr key={i} className="hover:bg-[#F8F6F1]/50">
                  <td className="px-6 py-3 font-medium text-[#0D1F3C]">{reg.nom}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/70">{reg.prenom}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/70">{reg.evenement}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/70">{reg.formule}</td>
                  <td className="px-4 py-3 font-semibold text-[#0D1F3C]">{reg.montant}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        reg.statut === "Payé"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {reg.statut === "Payé" ? "✅" : "⏳"} {reg.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#0D1F3C]/50">{reg.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
