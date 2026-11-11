import React from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-stone-900 mb-6">О платформе BUILD</h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Единое цифровое пространство для строительного рынка Центральной Азии
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 border border-stone-200">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Простой поиск</h3>
            <p className="text-stone-600">Находите архитекторов, строителей и материалы в одном месте с удобными фильтрами</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone-200">
            <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Проверенные специалисты</h3>
            <p className="text-stone-600">Все профили проходят модерацию, рейтинги и отзывы реальных клиентов</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone-200">
            <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Прозрачные цены</h3>
            <p className="text-stone-600">Сравнивайте предложения и выбирайте оптимальный вариант по бюджету</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">География проекта</h2>
          <p className="text-lg mb-8 opacity-90">
            BUILD работает в Кыргызстане, Казахстане и Узбекистане с перспективой расширения на весь регион
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg">🇰🇬 Кыргызстан</div>
            <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg">🇰🇿 Казахстан</div>
            <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg">🇺🇿 Узбекистан</div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link href="/add-profile" className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-lg">
            Разместить свой профиль
          </Link>
        </div>
      </div>
    </main>
  );
}