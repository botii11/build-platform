# Настройка Supabase для BUILD Platform

## ШАГ 1: Регистрация в Supabase

1. Открой https://supabase.com
2. Нажми **Start your project** или **Sign In**
3. Войди через GitHub (рекомендуется) или email

**Бесплатный тариф:**
- 500 MB базы данных
- 50,000 активных пользователей в месяц
- 1 GB хранилища файлов

## ШАГ 2: Создание проекта

1. Нажми **New Project**
2. Заполни:
   - **Name:** `build-platform`
   - **Database Password:** Придумай надёжный пароль (сохрани!)
   - **Region:** `West Europe (Ireland)` (ближе к ЦА)
3. Нажми **Create new project**
4. Подожди 2-3 минуты

## ШАГ 3: Где найти Project URL

1. Открой проект в Dashboard
2. Левое меню → **Settings** (шестерёнка внизу)
3. Выбери **API**
4. Найди секцию **Project URL**
5. Скопируй URL (выглядит как `https://xxxxxxxxxxxxx.supabase.co`)

## ШАГ 4: Где найти anon/public key

1. Там же, в **Settings → API**
2. Найди секцию **Project API keys**
3. Скопируй значение **anon public** (НЕ service_role!)

⚠️ **ВАЖНО:** Используй только `anon` ключ. `service_role` даёт полный доступ к БД.

## ШАГ 5: Что вставить в .env.local

Открой `.env.local` и вставь:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...