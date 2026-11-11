import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Header } from '../components/Header';
import { getUserProfile } from '@/lib/supabase/queries';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const profile = await getUserProfile(user.id);

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-stone-900 mb-2">Личный кабинет</h1>
          <p className="text-lg text-stone-600">Добро пожаловать, {user.email}</p>
        </div>

        {!profile ? (
          <div className="bg-white rounded-2xl p-12 border border-stone-200 shadow-lg text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">У вас пока нет профиля</h2>
            <p className="text-stone-600 mb-8">
              Создайте профиль специалиста, чтобы клиенты могли найти вас в каталоге BUILD.
            </p>
            <Link href="/add-profile" className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-lg">
              Создать профиль
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  {profile.image && (
                    <img 
                      src={profile.image} 
                      alt={profile.name} 
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 mb-1">{profile.name}</h2>
                    <p className="text-stone-600">{profile.specialization}</p>
                    <p className="text-sm text-stone-500 mt-1">{profile.city}, {profile.country}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${
                  profile.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 
                  profile.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  {profile.status === 'approved' && '✓ Одобрен'}
                  {profile.status === 'pending' && '⏳ На проверке'}
                  {profile.status === 'rejected' && '✗ Отклонён'}
                </span>
              </div>

              {profile.status === 'approved' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Ваш профиль опубликован в каталоге!</span>
                  </div>
                  <Link href={`/profile/${profile.id}`} className="inline-block mt-3 text-sm text-emerald-700 hover:text-emerald-900 underline">
                    Посмотреть в каталоге →
                  </Link>
                </div>
              )}

              {profile.status === 'pending' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-amber-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Ваш профиль проходит проверку модератором.</span>
                  </div>
                  <p className="text-sm text-amber-700 mt-2">Обычно это занимает до 24 часов.</p>
                </div>
              )}

              {profile.status === 'rejected' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-red-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">К сожалению, ваш профиль был отклонён.</span>
                  </div>
                  <p className="text-sm text-red-700 mt-2">
                    Пожалуйста, отредактируйте профиль и отправьте на повторную проверку.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="text-sm text-stone-500 mb-1">Стоимость</div>
                  <div className="font-semibold text-stone-900">{profile.price}</div>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="text-sm text-stone-500 mb-1">Опыт работы</div>
                  <div className="font-semibold text-stone-900">{profile.experience || '—'}</div>
                </div>
                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="text-sm text-stone-500 mb-1">Контакты</div>
                  <div className="font-semibold text-stone-900 text-sm">{profile.phone || profile.email || '—'}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link 
                  href={`/profile/${profile.id}`} 
                  className="px-6 py-3 bg-white border-2 border-stone-200 hover:border-stone-300 text-stone-900 rounded-xl font-medium transition"
                >
                  👁 Посмотреть профиль
                </Link>
                <Link 
                  href="/edit-profile" 
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition"
                >
                  ✏️ Редактировать
                </Link>
                <form action="/auth/logout" method="POST">
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-medium transition"
                  >
                    Выйти из аккаунта
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}