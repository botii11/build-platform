import { notFound } from 'next/navigation';
import { Header } from '../../components/Header';
import { getProfileById } from '@/lib/supabase/queries';
import ProfileContent from './ProfileContent';

interface ProfilePageProps {
  params: { id: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  // 1. Получаем данные на сервере
  const profile = await getProfileById(params.id);

  // 2. Если профиль не найден или не одобрен, показываем 404
  if (!profile) {
    notFound();
  }

  // 3. Передаем данные в клиентский компонент для отображения
  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <ProfileContent profile={profile} />
    </main>
  );
}