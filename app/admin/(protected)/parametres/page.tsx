import Link from "next/link";

export default function ParametresPage() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-white">Paramètres</h1>
        <p className="text-sm text-white/50 mt-0.5">Configuration avancée de votre club.</p>
      </div>

      <div className="rounded-2xl bg-[#0D1F3C] border border-white/10 divide-y divide-white/10">
        <Link
          href="/admin/parametres/domaine-personnalise"
          className="flex items-center justify-between px-5 py-4 hover:bg-white/5 transition group"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🌐</span>
            <div>
              <p className="text-sm font-medium text-white">Domaine personnalisé</p>
              <p className="text-xs text-white/40">Connectez votre propre domaine (monclub.fr)</p>
            </div>
          </div>
          <span className="text-white/30 group-hover:text-white/60 transition">→</span>
        </Link>

        <div className="px-5 py-4 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔐</span>
            <div>
              <p className="text-sm font-medium text-white">Changer le mot de passe</p>
              <p className="text-xs text-white/40">Disponible prochainement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
