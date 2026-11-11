import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { Catalog } from './components/Catalog';
import { getProfiles } from '@/lib/supabase/queries';
import Link from 'next/link';

export default async function Home() {
  const profiles = await getProfiles();

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <Hero />
      <Categories />
      
      {/* Блок "Подобрать специалиста" */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative">
            <h2 className="text-4xl font-bold mb-4">Не знаете, с чего начать?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Ответьте на 4 простых вопроса, и мы подберём лучших специалистов под ваш проект
            </p>
            <Link href="/match" className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-stone-100 transition shadow-lg">
              Подобрать специалиста →
            </Link>
          </div>
        </div>
      </section>

      <Catalog profiles={profiles} />
    </main>
  );
}