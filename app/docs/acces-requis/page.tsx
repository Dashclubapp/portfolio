import Link from 'next/link';

export const metadata = {
  robots: { index: false },
  title: 'Accès réservé — DashClub Docs',
};

export default function AccesRequis() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mb-4 text-5xl">🔒</div>
        <h1 className="text-2xl font-bold text-stone-900">Accès réservé</h1>
        <p className="mt-3 text-stone-500 leading-relaxed">
          Cette documentation est réservée aux clients DashClub disposant d&apos;un backoffice actif.
        </p>
        <p className="mt-4 text-sm text-stone-400">
          Vous avez déjà un compte ?{' '}
          <a href="mailto:hello@dashclub.app" className="text-[#C9A84C] underline underline-offset-2">
            Contactez-nous
          </a>{' '}
          pour recevoir un nouveau lien d&apos;accès.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
