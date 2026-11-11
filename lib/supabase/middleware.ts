import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  // Пока авторизация не подключена, просто пропускаем запросы.
  // Это убирает лишний запрос к Supabase на каждой странице.
  // Когда будем делать вход/регистрацию, вернём сюда проверку сессии.
  return NextResponse.next({
    request,
  });
}