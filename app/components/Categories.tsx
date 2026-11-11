import Link from 'next/link';

const categories = [
  { id: 'architects', title: 'Архитекторы', description: 'Проекты домов, интерьеры', icon: '📐', count: 340, color: 'from-indigo-500 to-indigo-700' },
  { id: 'builders', title: 'Строительные компании', description: 'Фундамент, коробка, под ключ', icon: '🏗️', count: 580, color: 'from-amber-500 to-orange-600' },
  { id: 'developers', title: 'Застройщики', description: 'Новостройки и жилые комплексы', icon: '🏢', count: 120, color: 'from-emerald-500 to-teal-600' },
  { id: 'materials', title: 'Стройматериалы', description: 'Поставщики и цены', icon: '🧱', count: 1360, color: 'from-rose-500 to-pink-600' },
];

export function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-stone-900 mb-8">Категории</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/${cat.id}`} className="group relative overflow-hidden bg-white rounded-2xl p-6 border border-stone-200 hover:border-stone-300 hover:shadow-xl transition-all duration-300">
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${cat.color} opacity-10 group-hover:opacity-20 rounded-full blur-2xl transition-opacity`}></div>
            <div className="relative">
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="text-lg font-bold text-stone-900 mb-1">{cat.title}</h3>
              <p className="text-sm text-stone-600 mb-4">{cat.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 font-medium">{cat.count} предложений</span>
                <svg className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}