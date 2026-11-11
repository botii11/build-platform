'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Profile } from '@/lib/supabase/types';
import { Lightbox } from './Lightbox';

interface CatalogProps {
  profiles?: Profile[];
  filterCity?: string;
  filterType?: string;
}

export function Catalog({ profiles = [], filterCity = 'all', filterType = 'all' }: CatalogProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterRating, setFilterRating] = useState(0);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredProfiles = profiles.filter((profile) => {
    const matchesCity = filterCity === 'all' || profile.city === filterCity;
    const matchesType = filterType === 'all' || profile.type === filterType;
    const matchesCountry = filterCountry === 'all' || profile.country === filterCountry;
    const matchesRating = profile.rating >= filterRating;
    const matchesVerified = !onlyVerified || profile.verified;
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         profile.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesType && matchesCountry && matchesRating && matchesVerified && matchesSearch;
  });

  function openLightbox(images: string[], index: number = 0) {
    setLightboxImages(images);
    setLightboxIndex(index);
  }

  return (
    <div>
      {/* Фильтры */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Страна</label>
            <select value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">Все страны</option>
              <option>Кыргызстан</option>
              <option>Казахстан</option>
              <option>Узбекистан</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Мин. рейтинг</label>
            <select value={filterRating} onChange={(e) => setFilterRating(Number(e.target.value))} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value={0}>Любой</option>
              <option value={4}>4.0+</option>
              <option value={4.5}>4.5+</option>
              <option value={4.8}>4.8+</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
              <span className="text-sm font-medium text-stone-700">Только проверенные</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Поиск</label>
            <input type="text" placeholder="Имя или специализация..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
      </div>

      {/* Карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <div 
            key={profile.id} 
            onClick={() => router.push(`/profile/${profile.id}`)} 
            className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-stone-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Фото с правильным aspect ratio */}
            <div 
              className="relative aspect-[4/3] overflow-hidden bg-stone-100"
              onClick={(e) => {
                e.stopPropagation();
                if (profile.image) {
                  openLightbox([profile.image]);
                }
              }}
            >
              <img 
                src={profile.image || 'https://via.placeholder.com/400x300'} 
                alt={profile.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {/* Иконка лупы при наведении */}
              {profile.image && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              )}
              {profile.verified && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md flex items-center gap-1">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  <span className="text-xs font-medium text-stone-700">Проверен</span>
                </div>
              )}
            </div>

            {/* Информация */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-stone-900 text-lg">{profile.name}</h3>
                <div className="flex items-center gap-1 text-amber-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="text-sm font-semibold text-stone-900">{profile.rating}</span>
                  <span className="text-xs text-stone-500">({profile.reviews_count})</span>
                </div>
              </div>
              <p className="text-sm text-stone-600 mb-3">{profile.specialization}</p>
              <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                <div className="flex items-center gap-1 text-sm text-stone-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>{profile.city}</span>
                </div>
                <span className="text-sm font-bold text-indigo-600">{profile.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          Ничего не найдено. Попробуйте изменить фильтры.
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