'use client';

import { useFormState } from 'react-dom';
import { useState, useRef } from 'react';
import { submitProfileAction } from './actions';
import Link from 'next/link';

export default function AddProfileForm({ user }: { user: any }) {
  const [state, formAction, isPending] = useFormState(submitProfileAction, {
    success: false,
    error: '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [portfolioPreviews, setPortfolioPreviews] = useState<string[]>([]);
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
    if (files.length > 6) {
      alert('Максимум 6 фото в портфолио');
      e.target.value = '';
      return;
    }
    const previews: string[] = [];
    let loaded = 0;
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`Файл "${file.name}" слишком большой. Максимум 5 MB`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        loaded++;
        if (loaded === files.length) setPortfolioPreviews(previews);
      };
      reader.readAsDataURL(file);
    });
  }

  function removePortfolioImage(index: number) {
    const newPreviews = portfolioPreviews.filter((_, i) => i !== index);
    setPortfolioPreviews(newPreviews);
    if (portfolioInputRef.current) {
      const dt = new DataTransfer();
      const files = portfolioInputRef.current.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (i !== index) dt.items.add(files[i]);
        }
        portfolioInputRef.current.files = dt.files;
      }
    }
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
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Профиль отправлен на проверку!</h1>
          <p className="text-lg text-stone-600 mb-8">
            Спасибо за регистрацию. Наш модератор проверит вашу заявку в течение 24 часов.
          </p>
          <Link href="/dashboard" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition">
            Перейти в личный кабинет
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-3">Разместить профиль</h1>
      <p className="text-lg text-stone-600 mb-8">
        Заполните информацию о себе или вашей компании. После модерации профиль появится в каталоге.
      </p>

      {state.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
          <div className="font-semibold mb-1">Ошибка при отправке</div>
          <div className="text-sm">{state.error}</div>
        </div>
      )}

      <form action={formAction} className="bg-white rounded-2xl p-8 border border-stone-200 shadow-lg space-y-6">
        
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
            <div className="flex-1">
              <input ref={avatarInputRef} type="file" name="avatar" accept="image/jpeg,image/png,image/webp" onChange={handleAvatarChange} disabled={isPending} className="hidden" />
              <button type="button" onClick={() => avatarInputRef.current?.click()} disabled={isPending} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition disabled:bg-stone-400">
                Выбрать фото
              </button>
              <div className="text-xs text-stone-500 mt-2">JPG, PNG или WebP. Максимум 5 MB.</div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Название / Имя <span className="text-red-500">*</span></label>
          <input type="text" name="name" required disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" placeholder="Например: Айбек Жумабеков" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Тип <span className="text-red-500">*</span></label>
            <select name="type" required disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100">
              <option value="">Выберите тип</option>
              <option value="architect">Архитектор</option>
              <option value="builder">Строительная компания</option>
              <option value="developer">Застройщик</option>
              <option value="supplier">Поставщик материалов</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Страна <span className="text-red-500">*</span></label>
            <select name="country" required disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100">
              <option value="">Выберите страну</option>
              <option value="Кыргызстан">Кыргызстан</option>
              <option value="Казахстан">Казахстан</option>
              <option value="Узбекистан">Узбекистан</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Город <span className="text-red-500">*</span></label>
          <input type="text" name="city" required disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" placeholder="Например: Бишкек" />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Специализация <span className="text-red-500">*</span></label>
          <input type="text" name="specialization" required disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" placeholder="Например: Жилые дома, интерьеры" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Ориентировочная стоимость <span className="text-red-500">*</span></label>
            <input type="text" name="price" required disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" placeholder="Например: от $15/м²" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Опыт работы</label>
            <input type="text" name="experience" disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" placeholder="Например: 5 лет" />
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
          <div className="text-sm font-medium text-stone-700 mb-3">Контактные данные <span className="text-red-500">*</span> <span className="text-stone-500 font-normal">(минимум одно поле)</span></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="tel" name="phone" disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" placeholder="Телефон: +996 555 123 456" />
            <input type="email" name="email" disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" placeholder="Email: example@mail.com" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">О себе / О компании</label>
          <textarea name="about" rows={4} disabled={isPending} className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100" placeholder="Расскажите о вашем опыте, услугах и преимуществах..." />
        </div>

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

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
          <strong>Важно:</strong> После отправки профиль будет проверен модератором. Публикация в каталоге происходит в течение 24 часов.
        </div>

        <button type="submit" disabled={isPending} className="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-lg disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isPending ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Загрузка и отправка...
            </>
          ) : (
            'Отправить на проверку'
          )}
        </button>
      </form>
    </div>
  );
}