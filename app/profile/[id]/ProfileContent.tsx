'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Profile } from '@/lib/supabase/types';
import { Lightbox } from '@/app/components/Lightbox';

export default function ProfileContent({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  function openLightbox(images: string[], index: number = 0) {
    setLightboxImages(images);
    setLightboxIndex(index);
  }

  // Собираем все фото для lightbox
  const allImages = [
    ...(profile.image ? [profile.image] : []),
    ...(profile.portfolio || []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => router.back()} className="mb-6 text-stone-600 hover:text-stone-900 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Назад
      </button>

      {/* Шапка профиля */}
      <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-lg mb-8">
        <div 
          className="relative h-64 md:h-96 overflow-hidden bg-stone-100 cursor-pointer group"
          onClick={() => {
            if (profile.image) {
              const imageIndex = allImages.indexOf(profile.image);
              openLightbox(allImages, imageIndex >= 0 ? imageIndex : 0);
            }
          }}
        >
          <img 
            src={profile.image || 'https://via.placeholder.com/1200x400'} 
            alt={profile.name} 
            className="w-full h-full object-cover" 
          />
          {profile.image && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-stone-900 mb-2">{profile.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-stone-600">
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {profile.city}, {profile.country}
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="font-semibold text-stone-900">{profile.rating}</span>
                  <span className="text-stone-500">({profile.reviews_count} отзывов)</span>
                </span>
                {profile.verified && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg flex items-center gap-2 text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Проверен
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-stone-50 rounded-xl p-4">
              <div className="text-sm text-stone-500 mb-1">Специализация</div>
              <div className="font-semibold text-stone-900">{profile.specialization}</div>
            </div>
            <div className="bg-stone-50 rounded-xl p-4">
              <div className="text-sm text-stone-500 mb-1">Опыт работы</div>
              <div className="font-semibold text-stone-900">{profile.experience}</div>
            </div>
            <div className="bg-stone-50 rounded-xl p-4">
              <div className="text-sm text-stone-500 mb-1">Стоимость</div>
              <div className="font-semibold text-indigo-600">{profile.price}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="flex-1 min-w-[140px] px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-center transition flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Позвонить
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="flex-1 min-w-[140px] px-6 py-3 bg-white border-2 border-stone-200 hover:border-stone-300 text-stone-900 rounded-xl font-medium text-center transition flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Написать
              </a>
            )}
          </div>

          {profile.about && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-stone-900 mb-4">О специалисте</h2>
              <p className="text-stone-600 leading-relaxed text-lg">{profile.about}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">{profile.completed_projects}</div>
              <div className="text-sm text-stone-600">Выполненных проектов</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">{profile.rating}</div>
              <div className="text-sm text-stone-600">Средний рейтинг</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">{profile.experience}</div>
              <div className="text-sm text-stone-600">Опыт работы</div>
            </div>
          </div>
        </div>
      </div>

      {/* Портфолио */}
      {profile.portfolio && profile.portfolio.length > 0 && (
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Портфолио</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.portfolio.map((img, idx) => (
              <div 
                key={idx} 
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 cursor-pointer group"
                onClick={() => openLightbox(profile.portfolio || [], idx)}
              >
                <img 
                  src={img} 
                  alt={`Проект ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Отзывы */}
      {profile.reviews_list && profile.reviews_list.length > 0 && (
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-lg">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Отзывы клиентов</h2>
          <div className="space-y-4">
            {profile.reviews_list.map((review, idx) => (
              <div key={idx} className="border-b border-stone-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-stone-900">{review.author}</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-500' : 'text-stone-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-stone-600 mb-1">{review.text}</p>
                <div className="text-sm text-stone-400">{review.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImages && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxImages(null)}
        />
      )}
    </div>
  );
}