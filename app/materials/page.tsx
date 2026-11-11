import { Header } from '../components/Header';
import { Catalog } from '../components/Catalog';
import { getProfiles } from '@/lib/supabase/queries';

export default async function MaterialsPage() {
  const profiles = await getProfiles({ type: 'supplier' });

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-stone-900 mb-3">Стройматериалы</h1>
          <p className="text-lg text-stone-600">
            Поставщики строительных материалов с доставкой по всему региону.
          </p>
        </div>

        <Catalog profiles={profiles} filterType="supplier" />
      </div>
    </main>
  );
}