import { createClient } from '@/lib/supabase/server';
import { Header } from '../components/Header';
import AddProfileForm from './AddProfileForm';
import Link from 'next/link';

export default async function AddProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-stone-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl p-12 border border-stone-200 shadow-lg text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 mb-4">Необходима авторизация</h1>
            <p className="text-lg text-stone-600 mb-8">
              Чтобы создать профиль специалиста, необходимо войти в аккаунт или зарегистрироваться.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition">
                Войти
              </Link>
              <Link href="/register" className="px-6 py-3 bg-white border-2 border-stone-200 hover:border-stone-300 text-stone-900 rounded-xl font-medium transition">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <AddProfileForm user={user} />
    </main>
  );
}