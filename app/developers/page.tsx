import { Header } from '../components/Header';
import { Catalog } from '../components/Catalog';
import { getProfiles } from '@/lib/supabase/queries';

export default async function DevelopersPage() {
  const profiles = await getProfiles({ type: 'developer' });

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-stone-900 mb-3">Застройщики</h1>
          <p className="text-lg text-stone-600">
            Новостройки и жилые комплексы от проверенных девелоперов.
          </p>
        </div>

        <Catalog profiles={profiles} filterType="developer" />
      </div>
    </main>
  );
}