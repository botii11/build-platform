export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
            Кыргызстан • Казахстан • Узбекистан
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight mb-6">
            Строй дом мечты <br />
            <span className="text-indigo-600">с проверенными мастерами</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 mb-8 leading-relaxed">
            Единая платформа для поиска архитекторов, строительных компаний и материалов. 
            Сравнивайте портфолио, цены и отзывы — в одном месте.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input type="text" placeholder="Что ищете? Например: архитектор в Бишкеке" className="w-full px-5 py-4 pl-12 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-lg shadow-indigo-600/20">Найти</button>
          </div>
          <div className="flex items-center gap-6 mt-8 text-sm text-stone-500">
            <div className="flex items-center gap-2"><span className="font-bold text-stone-900 text-lg">2,400+</span><span>специалистов</span></div>
            <div className="flex items-center gap-2"><span className="font-bold text-stone-900 text-lg">850+</span><span>проектов</span></div>
            <div className="flex items-center gap-2"><span className="font-bold text-stone-900 text-lg">15</span><span>городов</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}