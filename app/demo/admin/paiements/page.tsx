import { adminPayments } from "../../usm-data";

export default function AdminPaiementsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Paiements
        </h1>
        <p className="text-sm text-[#0D1F3C]/50">
          Toutes les transactions du club — avril 2025.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total encaissé", value: "2 847€", color: "text-green-700 bg-green-50", icon: "✅" },
          { label: "En attente", value: "120€", sub: "4 paiements non confirmés", color: "text-amber-700 bg-amber-50", icon: "⏳" },
          { label: "Remboursés", value: "0€", color: "text-[#0D1F3C] bg-[#0D1F3C]/5", icon: "↩️" },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl border p-5 ${item.color} border-current/10`}
          >
            <div className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                {item.label}
              </span>
            </div>
            <p
              className="mt-2 text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {item.value}
            </p>
            {item.sub && <p className="mt-1 text-xs opacity-60">{item.sub}</p>}
          </div>
        ))}
      </div>

      {/* Info banner */}
      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-800">
        💳 Les paiements sont versés directement sur le compte bancaire du club via Stripe.{" "}
        <strong>DashClub ne conserve aucune commission.</strong>
      </div>

      {/* Transactions */}
      <div className="rounded-2xl border border-[#0D1F3C]/10 bg-white shadow-sm">
        <div className="border-b border-[#0D1F3C]/10 px-6 py-4">
          <h2
            className="font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Dernières transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#0D1F3C]/5 bg-[#F8F6F1] text-left text-xs font-medium uppercase tracking-wider text-[#0D1F3C]/40">
                <th className="px-6 py-3">Nom</th>
                <th className="px-4 py-3">Objet</th>
                <th className="px-4 py-3">Montant</th>
                <th className="px-4 py-3">Méthode</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0D1F3C]/5">
              {adminPayments.map((p, i) => (
                <tr key={i} className="hover:bg-[#F8F6F1]/50">
                  <td className="px-6 py-3 font-medium text-[#0D1F3C]">{p.nom}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/70">{p.objet}</td>
                  <td className="px-4 py-3 font-semibold text-[#0D1F3C]">{p.montant}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/60">{p.methode}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        p.statut === "Payé"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {p.statut === "Payé" ? "✅" : "⏳"} {p.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#0D1F3C]/50">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
