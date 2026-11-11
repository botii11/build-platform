import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function TestSupabasePage() {
  let status = 'checking';
  let message = 'Проверка подключения...';
  let details = '';

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Проверка на лишний слэш в конце URL
    if (!url || !key || url.endsWith('/')) {
      status = 'error';
      message = 'Ошибка в формате .env.local';
      details = 'Убедись, что URL НЕ заканчивается на слэш (/) и ключ начинается на eyJ';
    } else {
      const supabase = createClient();
      
      // Пытаемся сделать простой запрос к таблице profiles
      const { data, error } = await supabase.from('profiles').select('id').limit(1);

      if (error && error.message.includes('relation')) {
        status = 'success';
        message = 'Подключение к Supabase работает! 🎉';
        details = 'Сервер отвечает. Таблица "profiles" ещё не создана — это нормально. Следующий шаг: запустить SQL-скрипт в Supabase.';
      } else if (error) {
        status = 'warning';
        message = 'Подключение есть, но есть другая ошибка';
        details = error.message;
      } else {
        status = 'success';
        message = 'Подключение работает отлично! Таблица найдена.';
        details = 'Всё готово к работе с базой данных.';
      }
    }
  } catch (err) {
    status = 'error';
    message = 'Ошибка подключения';
    details = err instanceof Error ? err.message : 'Неизвестная ошибка';
  }

  const statusColors = {
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    checking: 'bg-stone-100 text-stone-800 border-stone-200',
  };

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-stone-200 shadow-lg">
        <h1 className="text-2xl font-bold text-stone-900 mb-6">Тест подключения Supabase</h1>
        
        <div className={`p-4 rounded-xl border ${statusColors[status as keyof typeof statusColors]}`}>
          <div className="font-semibold mb-1">{message}</div>
          {details && <div className="text-sm opacity-80">{details}</div>}
        </div>

        <div className="mt-6 space-y-3 text-sm text-stone-600">
          <div>
            <span className="font-medium">URL:</span>{' '}
            <span className="font-mono text-xs">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ задан' : '✗ не задан'}
            </span>
          </div>
          <div>
            <span className="font-medium">Key:</span>{' '}
            <span className="font-mono text-xs">
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.startsWith('eyJ') ? '✓ корректный формат' : '✗ неверный формат'}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}