import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export async function Header() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="text-xl font-bold text-stone-900 tracking-tight">BUILD</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/architects" className="text-stone-600 hover:text-stone-900 transition">Архитекторы</Link>
          <Link href="/builders" className="text-stone-600 hover:text-stone-900 transition">Строители</Link>
          <Link href="/developers" className="text-stone-600 hover:text-stone-900 transition">Застройщики</Link>
          <Link href="/materials" className="text-stone-600 hover:text-stone-900 transition">Материалы</Link>
          <Link href="/about" className="text-stone-600 hover:text-stone-900 transition">О проекте</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden md:block px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition">
                Личный кабинет
              </Link>
              <Link href="/add-profile" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
                Разместить профиль
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block px-4 py-2 text-stone-700 hover:text-stone-900 font-medium transition">
                Войти
              </Link>
              <Link href="/register" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}