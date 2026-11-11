'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/Header';
import { profiles, cities, specializations } from '../data/profiles';
import Link from 'next/link';

export default function MatchPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    country: '',
    city: '',
    budget: '',
    specialization: '',
  });
  const [results, setResults] = useState<typeof profiles>([]);

  const goals = [
    { id: 'build-house', label: 'Построить частный дом', icon: '🏠', types: ['builder', 'architect'] },
    { id: 'design-project', label: 'Разработать архитектурный проект', icon: '📐', types: ['architect'] },
    { id: 'find-company', label: 'Найти строительную компанию', icon: '🏗️', types: ['builder'] },
    { id: 'renovation', label: 'Сделать ремонт', icon: '🔨', types: ['builder'] },
    { id: 'materials', label: 'Найти строительные материалы', icon: '🧱', types: ['supplier'] },
  ];

  const budgets = [
    { id: 'low', label: 'До $10,000', range: [0, 10000] },
    { id: 'medium', label: '$10,000 - $50,000', range: [10000, 50000] },
    { id: 'high', label: '$50,000 - $200,000', range: [50000, 200000] },
    { id: 'premium', label: 'Более $200,000', range: [200000, 999999] },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Подбираем результаты
      const filtered = profiles.filter((p) => {
        const goal = goals.find((g) => g.id === formData.goal);
        const matchesType = goal ? goal.types.includes(p.type) : true;
        const matchesCity = formData.city ? p.city === formData.city : true;
        const matchesSpec = formData.specialization ? p.specialization.toLowerCase().includes(formData.specialization.toLowerCase()) : true;
        return matchesType && matchesCity && matchesSpec;
      });
      setResults(filtered.length > 0 ? filtered : profiles.slice(0, 6));
      setStep(5);
    }
  };

  const getCitiesByCountry = () => {
    return cities.filter((c) => c.country === formData.country).map((c) => c.city);
  };

  const getSpecializations = () => {
    const goal = goals.find((g) => g.id === formData.goal);
    if (!goal) return [];
    return specializations[goal.types[0] as keyof typeof specializations] || [];
  };

  if (step === 5) {
    return (
      <main className="min-h-screen bg-stone-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-4xl font-bold text-stone-900 mb-3">Мы нашли подходящих специалистов</h1>
            <p className="text-lg text-stone-600">На основе ваших критериев подобрано {results.length} вариантов</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((profile) => (
              <Link key={profile.id} href={`/profile/${profile.id}`} className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img src={profile.image} alt={profile.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {profile.verified && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md flex items-center gap-1">
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span className="text-xs font-medium text-stone-700">Проверен</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-stone-900 text-lg mb-2">{profile.name}</h3>
                  <p className="text-sm text-stone-600 mb-3">{profile.specialization}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      <span className="text-sm font-semibold text-stone-900">{profile.rating}</span>
                    </div>
                    <span className="text-sm font-bold text-indigo-600">{profile.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => { setStep(1); setResults([]); }} className="px-6 py-3 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 mr-3">
              Пройти заново
            </button>
            <Link href="/" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              На главную
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Прогресс */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-stone-600">Шаг {step} из 4</span>
            <span className="text-sm text-stone-600">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-lg">
          {step === 1 && (
            <>
              <h1 className="text-3xl font-bold text-stone-900 mb-3">Что вы хотите сделать?</h1>
              <p className="text-stone-600 mb-8">Выберите цель, и мы подберём лучших специалистов</p>
              <div className="space-y-3">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setFormData({ ...formData, goal: goal.id })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition flex items-center gap-4 ${
                      formData.goal === goal.id ? 'border-indigo-600 bg-indigo-50' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className="text-3xl">{goal.icon}</span>
                    <span className="font-medium text-stone-900">{goal.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-3xl font-bold text-stone-900 mb-3">Где находится ваш объект?</h1>
              <p className="text-stone-600 mb-8">Выберите страну и город</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Страна</label>
                  <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value, city: '' })} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Выберите страну</option>
                    <option>Кыргызстан</option>
                    <option>Казахстан</option>
                    <option>Узбекистан</option>
                  </select>
                </div>
                {formData.country && (
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Город</label>
                    <select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">Выберите город</option>
                      {getCitiesByCountry().map((city) => (
                        <option key={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-3xl font-bold text-stone-900 mb-3">Какой примерный бюджет?</h1>
              <p className="text-stone-600 mb-8">Это поможет подобрать специалистов в вашем ценовом диапазоне</p>
              <div className="space-y-3">
                {budgets.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setFormData({ ...formData, budget: budget.id })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition ${
                      formData.budget === budget.id ? 'border-indigo-600 bg-indigo-50' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className="font-medium text-stone-900">{budget.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1 className="text-3xl font-bold text-stone-900 mb-3">Какая услуга вам нужна?</h1>
              <p className="text-stone-600 mb-8">Выберите специализацию для более точного подбора</p>
              <div className="space-y-3">
                {getSpecializations().map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setFormData({ ...formData, specialization: spec })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition ${
                      formData.specialization === spec ? 'border-indigo-600 bg-indigo-50' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <span className="font-medium text-stone-900">{spec}</span>
                  </button>
                ))}
                <button
                  onClick={() => setFormData({ ...formData, specialization: '' })}
                  className={`w-full p-4 rounded-xl border-2 text-left transition ${
                    formData.specialization === '' ? 'border-indigo-600 bg-indigo-50' : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="font-medium text-stone-900">Любая специализация</span>
                </button>
              </div>
            </>
          )}

          {/* Навигация */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-stone-200 rounded-lg hover:bg-stone-50">
                Назад
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={(step === 1 && !formData.goal) || (step === 2 && !formData.country) || (step === 2 && !formData.city)}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-stone-300 disabled:cursor-not-allowed transition"
            >
              {step === 4 ? 'Подобрать специалистов' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}