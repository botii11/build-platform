import { Header } from '../components/Header';
import { Catalog } from '../components/Catalog';
import { getProfiles } from '@/lib/supabase/queries';

export default async function BuildersPage() {
  const profiles = await getProfiles({ type: 'builder' });

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-stone-900 mb-3">Строительные компании</h1>
          <p className="text-lg text-stone-600">
            Надёжные подрядчики для строительства дома под ключ, фундамента и отделочных работ.
          </p>
        </div>

        <Catalog profiles={profiles} filterType="builder" />
      </div>
    </main>
  );
}