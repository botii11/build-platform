import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAllProfiles } from '@/lib/supabase/queries';
import { AdminContent } from './AdminContent';

export const dynamic = 'force-dynamic';

async function checkAuth() {
  const cookieStore = cookies();
  const cookie = cookieStore.get('build_admin_auth');
  return cookie?.value === 'authenticated';
}

export default async function AdminPage() {
  const isAuth = await checkAuth();
  
  if (!isAuth) {
    redirect('/admin/login');
  }

  const allProfiles = await getAllProfiles();

  const stats = {
    total: allProfiles.length,
    pending: allProfiles.filter(p => p.status === 'pending').length,
    approved: allProfiles.filter(p => p.status === 'approved').length,
    rejected: allProfiles.filter(p => p.status === 'rejected').length,
  };

  return (
    <main className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <div className="font-bold text-stone-900">BUILD Admin</div>
              <div className="text-xs text-stone-500">Панель модерации</div>
            </div>
          </div>
          
          <form action="/admin/logout" method="POST">
            <button type="submit" className="px-4 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium">
              Выйти
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-stone-200">
            <div className="text-sm text-stone-500 mb-1">Всего</div>
            <div className="text-3xl font-bold text-stone-900">{stats.total}</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <div className="text-sm text-amber-700 mb-1">На проверке</div>
            <div className="text-3xl font-bold text-amber-900">{stats.pending}</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
            <div className="text-sm text-emerald-700 mb-1">Одобрено</div>
            <div className="text-3xl font-bold text-emerald-900">{stats.approved}</div>
          </div>
          <div className="bg-red-50 rounded-xl p-5 border border-red-200">
            <div className="text-sm text-red-700 mb-1">Отклонено</div>
            <div className="text-3xl font-bold text-red-900">{stats.rejected}</div>
          </div>
        </div>

        <AdminContent initialProfiles={allProfiles} />
      </div>
    </main>
  );
}