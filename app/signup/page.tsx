import { redirect } from 'next/navigation';

export default function SignupRedirect({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  void searchParams;
  redirect('/register');
}
