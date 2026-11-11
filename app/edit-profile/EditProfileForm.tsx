'use client';

import { useFormState } from 'react-dom';
import { useState, useRef } from 'react';
import { updateProfileAction } from './actions';
import Link from 'next/link';
import { Profile } from '@/lib/supabase/types';

export default function EditProfileForm({ profile }: { profile: Profile }) {
  const [state, formAction, isPending] = useFormState(updateProfileAction, {
    success: false,
    error: '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.image || null);
  const [portfolioPreviews, setPortfolioPreviews] = useState<string[]>(profile.portfolio || []);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой. Максимум 5 MB');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handlePortfolioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const currentCount = portfolioPreviews.length;
    if (currentCount + files.length > 6) {
      alert(`Максимум 6 фото в портфолио. Сейчас у вас ${currentCount}, можно добавить ещё ${6 - currentCount}`);
      e.target.value = '';
      return;
    }
    const newPreviews = [...portfolioPreviews];
    let loaded = 0;
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`Файл "${file.name}" слишком большой. Максимум 5 MB`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        loaded++;
        if (loaded === files.length) setPortfolioPreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  }

  function removePortfolioImage(index: number) {
    const newPreviews = portfolioPreviews.filter((_, i) => i !== index);
    setPortfolioPreviews(newPreviews);
  }

  function removeAvatar() {
    setAvatarPreview(null);
    if (avatarInputRef.current) avatarInputRef.current.value = '';
  }

  if (state.success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-12 border border-stone-200 shadow-lg text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Изменения сохранены!</h1>
          <p className="text-lg text-stone-600 mb-8">
            Ваш профиль отправлен на повторную проверку модератором.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-amber-800">
                <strong>Что дальше?</strong><br />
                Модератор проверит изменения в течение 24 часов. После одобрения профиль снова появится в каталоге.
              </div>
            </div>
          </div>
          <Link href="/dashboard" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition">
            Вернуться в личный кабинет
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-stone-900 mb-3">Редактировать профиль</h1>
        <p className="text-lg text-stone-600">
          Внесите изменения. После сохранения профиль снова пройдёт модерацию.
        </p>
      </div>

      {state.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
          <div className="font-semibold mb-1">Ошибка при сохранении</div>
          <div className="text-sm">{state.error}</div>
        </div>
      )}

      <form action={formAction} className="bg-white rounded-2xl p-8 border border-stone-200 shadow-lg space-y-6">
        <input type="hidden" name="profileId" value={profile.id} />
        <input type="hidden" name="currentImage" value={profile.image || ''} />
        <input type="hidden" name="currentPortfolio" value={JSON.stringify(profile.portfolio || [])} />

        {/* ФОТО ПРОФИЛЯ */}
        <div className="border-b border-stone-200 pb-6">
          <label className="block text-sm font-medium text-stone-700 mb-3">📷 Фото профиля или логотип</label>
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-xl bg-stone-100 border-2 border-dashed border-stone-300 overflow-hidden flex items-center justify-center flex-shrink-0">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>
            <div className="flex-1 flex flex-wrap gap-2">
              <input ref={avatarInputRef} type="file" name="avatar" accept="image/jpeg,image/png,image/webp" onChange={handleAvatarChange} disabled={isPending} className="hidden" />
              <button type="button" onClick={() => avatarInputRef.current?.click()} disabled={isPending} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition disabled:bg-stone-400">
                Загрузить новое
              </button>
              {avatarPreview && (
                <button type="button" onClick={removeAvatar} disabled={isPending} className="px-4 py-2 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-lg text-sm font-medium transition disabled:bg-stone-100">
                  Удалить фото
                </button>
              )}
              <div className="w-full text-xs text-stone-500 mt-2">JPG, PNG или WebP. Максимум 5 MB.</div>
            </div>
          </div>
        </div>

        {/* ИМЯ */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Название / Имя <span className="text-red-500">*</span></label>
          <input type="text" name="name" required defaultValue={profile.name} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" />
        </div>

        {/* ТИП И СТРАНА */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Тип <span className="text-red-500">*</span></label>
            <select name="type" required defaultValue={profile.type} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100">
              <option value="architect">Архитектор</option>
              <option value="builder">Строительная компания</option>
              <option value="developer">Застройщик</option>
              <option value="supplier">Поставщик материалов</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Страна <span className="text-red-500">*</span></label>
            <select name="country" required defaultValue={profile.country} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100">
              <option value="Кыргызстан">Кыргызстан</option>
              <option value="Казахстан">Казахстан</option>
              <option value="Узбекистан">Узбекистан</option>
            </select>
          </div>
        </div>

        {/* ГОРОД */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Город <span className="text-red-500">*</span></label>
          <input type="text" name="city" required defaultValue={profile.city} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" />
        </div>

        {/* СПЕЦИАЛИЗАЦИЯ */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Специализация <span className="text-red-500">*</span></label>
          <input type="text" name="specialization" required defaultValue={profile.specialization} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" />
        </div>

        {/* ЦЕНА И ОПЫТ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Стоимость <span className="text-red-500">*</span></label>
            <input type="text" name="price" required defaultValue={profile.price} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Опыт работы</label>
            <input type="text" name="experience" defaultValue={profile.experience || ''} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" />
          </div>
        </div>

        {/* КОНТАКТЫ */}
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
          <div className="text-sm font-medium text-stone-700 mb-3">Контактные данные <span className="text-red-500">*</span> <span className="text-stone-500 font-normal">(минимум одно поле)</span></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="tel" name="phone" defaultValue={profile.phone || ''} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" placeholder="Телефон" />
            <input type="email" name="email" defaultValue={profile.email || ''} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" placeholder="Email" />
          </div>
        </div>

        {/* О СЕБЕ */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">О себе / О компании</label>
          <textarea name="about" rows={4} defaultValue={profile.about || ''} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" />
        </div>

        {/* ПОРТФОЛИО */}
        <div className="border-t border-stone-200 pt-6">
          <label className="block text-sm font-medium text-stone-700 mb-3">🖼️ Портфолио <span className="text-stone-500 font-normal">(до 6 фото)</span></label>
          <input ref={portfolioInputRef} type="file" name="portfolio" accept="image/jpeg,image/png,image/webp" multiple onChange={handlePortfolioChange} disabled={isPending} className="hidden" />
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-3">
            {portfolioPreviews.map((preview, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-stone-100 group">
                <img src={preview} alt={`Portfolio ${index + 1}`} className="w-full h-full object-cover" />
                <button type="button" onClick={() => removePortfolioImage(index)} disabled={isPending} className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">×</button>
              </div>
            ))}
            {portfolioPreviews.length < 6 && (
              <button type="button" onClick={() => portfolioInputRef.current?.click()} disabled={isPending} className="aspect-square rounded-lg border-2 border-dashed border-stone-300 hover:border-indigo-500 bg-stone-50 hover:bg-indigo-50 flex flex-col items-center justify-center gap-1 transition disabled:opacity-50">
                <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                <span className="text-xs text-stone-500">Добавить</span>
              </button>
            )}
          </div>
          <div className="text-xs text-stone-500">JPG, PNG или WebP. Каждое фото максимум 5 MB.</div>
        </div>

        {/* ПРЕДУПРЕЖДЕНИЕ */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
          <strong>Важно:</strong> После сохранения изменений профиль будет отправлен на повторную проверку модератором.
        </div>

        {/* КНОПКИ */}
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={isPending} className="flex-1 min-w-[200px] px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-lg disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isPending ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Сохранение...
              </>
            ) : (
              'Сохранить изменения'
            )}
          </button>
          <Link href="/dashboard" className="px-6 py-4 bg-white border-2 border-stone-200 hover:border-stone-300 text-stone-900 rounded-xl font-semibold transition flex items-center justify-center">
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}