import { createClient } from '@/lib/supabase/server';
import { getAllProfiles } from '@/lib/supabase/queries';
import { AdminContent } from './AdminContent';
import { Header } from '../components/Header';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// ⚠️ ЭТА СТРОКА ЗАПРЕЩАЕТ КЭШИРОВАНИЕ АДМИНКИ!
// Без неё Next.js будет показывать устаревшие данные
export const dynamic = 'force-dynamic';

const ADMIN_COOKIE = 'build_admin_auth';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'build2026admin';

export default async function AdminPage() {
  // Проверяем авторизацию через cookie
  const cookieStore = cookies();
  const adminCookie = cookieStore.get(ADMIN_COOKIE);

  if (!adminCookie || adminCookie.value !== 'authenticated') {
    redirect('/admin/login');
  }

  // Получаем ВСЕ профили (включая pending, rejected)
  const profiles = await getAllProfiles();

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-stone-900 mb-2">Админ-панель</h1>
            <p className="text-lg text-stone-600">
              Управление профилями специалистов
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-stone-100 rounded-lg">
              <span className="text-sm text-stone-600">Всего профилей: </span>
              <span className="font-bold text-stone-900">{profiles.length}</span>
            </div>
            <a
              href="/admin/logout"
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition"
            >
              Выйти
            </a>
          </div>
        </div>

        <AdminContent initialProfiles={profiles} />
      </div>
    </main>
  );
}