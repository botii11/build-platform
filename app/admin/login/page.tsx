'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminLoginAction } from '../actions';

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useFormState(adminLoginAction, {
    success: false,
    error: '',
  });

  useEffect(() => {
    if (state.success) {
      router.push('/admin');
    }
  }, [state.success, router]);

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-stone-200 shadow-lg">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Админ-панель BUILD</h1>
          <p className="text-stone-600">Введите пароль для входа</p>
        </div>

        {state.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Пароль</label>
            <input
              type="password"
              name="password"
              required
              disabled={isPending}
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-stone-100"
              placeholder="Введите пароль администратора"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Проверка...
              </>
            ) : (
              'Войти'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-stone-500 hover:text-stone-700">
            ← Вернуться на сайт
          </a>
        </div>
      </div>
    </main>
  );
}