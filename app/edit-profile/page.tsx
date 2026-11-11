import { createClient } from '@/lib/supabase/server';
import { Header } from '../components/Header';
import { getUserProfile } from '@/lib/supabase/queries';
import EditProfileForm from './EditProfileForm';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function EditProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await getUserProfile(user.id);

  if (!profile) {
    redirect('/add-profile');
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <EditProfileForm profile={profile} />
    </main>
  );
}