import { Suspense } from 'react';
import SetupPasswordClient from './SetupPasswordClient';

export const metadata = {
  robots: { index: false },
  title: 'Créer votre mot de passe — DashClub',
};

export default function SetupPasswordPage({ params }: { params: { token: string } }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="text-white/50 text-sm">Chargement…</div>
      </div>
    }>
      <SetupPasswordClient token={params.token} />
    </Suspense>
  );
}
