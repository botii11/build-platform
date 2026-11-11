# 🛠️ BUILD Platform — Команды для терминала

## 🚀 ОСНОВНЫЕ КОМАНДЫ РАЗРАБОТКИ

```bash
# Запустить сервер разработки
npm run dev

# Установить все зависимости (если package.json обновился)
npm install

# Установить конкретный пакет
npm install название_пакета

# Собрать проект для продакшена
npm run build

# Запустить продакшен-версию локально
npm start

# Проверить код на ошибки (lint)
npm run lint
```

---

## 📁 РАБОТА С ФАЙЛАМИ И ПАПКАМИ

```bash
# Посмотреть содержимое текущей папки
dir

# Посмотреть содержимое конкретной папки
dir app
dir app\add-profile
dir lib\supabase

# Создать новую папку
mkdir app\edit-profile

# Создать пустой файл
type nul > app\edit-profile\page.tsx

# Удалить файл
del app\edit-profile\page.tsx

# Переименовать файл
ren app\add-profile\addprofileform.tsx AddProfileForm.tsx

# Перейти в другую папку
cd app
cd ..

# Очистить терминал
cls
```

---

## 🔧 ДИАГНОСТИКА И ПРОВЕРКИ

```bash
# Проверить версию Node.js
node -v

# Проверить версию npm
npm -v

# Очистить кэш npm (если проблемы с установкой)
npm cache clean --force

# Удалить node_modules и переустановить
rmdir /s /q node_modules
npm install

# Проверить, какие процессы占用 порт 3000
netstat -ano | findstr :3000

# Убить процесс по PID (замени 12345 на реальный PID)
taskkill /PID 12345 /F
```

---

## 🗄️ SUPABASE CLI (если установлен)

```bash
# Установить Supabase CLI глобально
npm install -g supabase

# Войти в аккаунт Supabase
supabase login

# Проверить статус проекта
supabase status

# Запустить миграции
supabase db push

# Сбросить базу данных (ОСТОРОЖНО!)
supabase db reset
```

---

## 🌐 ДЕПЛОЙ НА VERCEL

```bash
# Установить Vercel CLI
npm install -g vercel

# Войти в аккаунт Vercel
vercel login

# Задеплоить проект
vercel

# Задеплоить в продакшен
vercel --prod

# Посмотреть список деплоев
vercel ls
```

---

## 📦 УСТАНОВКА НОВЫХ ПАКЕТОВ

```bash
# Supabase клиент
npm install @supabase/supabase-js
npm install @supabase/ssr

# Утилиты для работы с датами
npm install date-fns

# Иконки (если нужны)
npm install lucide-react

# Формы и валидация
npm install react-hook-form
npm install zod
```

---

## 🔄 GIT — КОНТРОЛЬ ВЕРСИЙ

### Первоначальная настройка
```bash
# Инициализировать git в проекте
git init

# Указать имя пользователя
git config --global user.name "Твоё Имя"

# Указать email
git config --global user.email "твой@email.com"
```

### Ежедневная работа
```bash
# Посмотреть статус изменений
git status

# Добавить все изменения
git add .

# Добавить конкретный файл
git add app/dashboard/page.tsx

# Сделать коммит
git commit -m "Описание изменений"

# Примеры хороших коммитов:
git commit -m "feat: добавить страницу редактирования профиля"
git commit -m "fix: исправить ошибку загрузки фото"
git commit -m "style: обновить дизайн хедера"
git commit -m "docs: обновить README"
```

### Работа с удалённым репозиторием
```bash
# Подключить удалённый репозиторий
git remote add origin https://github.com/твой-username/build-platform.git

# Отправить изменения на GitHub
git push -u origin main

# Просто отправить (если уже связано)
git push

# Получить изменения с GitHub
git pull

# Клонировать репозиторий
git clone https://github.com/твой-username/build-platform.git
```

### Ветвление
```bash
# Создать новую ветку
git checkout -b feature/edit-profile

# Переключиться на другую ветку
git checkout main

# Посмотреть список всех веток
git branch -a

# Удалить ветку
git branch -d feature/edit-profile

# Слить ветку в main
git merge feature/edit-profile
```

### Отмена изменений
```bash
# Отменить изменения в файле (до коммита)
git checkout -- app/dashboard/page.tsx

# Отменить последний коммит (файлы остаются)
git reset --soft HEAD~1

# Полностью отменить последний коммит
git reset --hard HEAD~1

# Посмотреть историю коммитов
git log --oneline
```

---

## 🐛 РЕШЕНИЕ ТИПИЧНЫХ ПРОБЛЕМ

### Ошибка: "port 3000 already in use"
```bash
# Найти процесс на порту 3000
netstat -ano | findstr :3000
# Убить процесс (замени 12345 на PID)
taskkill /PID 12345 /F
```

### Ошибка: "Module not found"
```bash
# Очистить кэш Next.js
rmdir /s /q .next
npm run dev
```

### Ошибка: "Cannot find module"
```bash
# Перезапустить TypeScript сервер через VS Code:
# Ctrl+Shift+P → TypeScript: Restart TS Server
```

### Ошибка: npm install не работает
```bash
# Удалить node_modules и package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Переустановить
npm install
```

### Supabase не отвечает
```bash
# Проверить подключение к Supabase
curl https://zpdltovexglsoislnmki.supabase.co/rest/v1/

# Проверить переменные окружения
type .env.local
```

---

## 📝 ПОЛЕЗНЫЕ КОМБИНАЦИИ КЛАВИШ В ТЕРМИНАЛЕ

| Комбинация | Действие |
|---|---|
| `Ctrl + C` | Остановить текущую команду |
| `Ctrl + Z` | Приостановить процесс |
| `↑` / `↓` | Листать историю команд |
| `Tab` | Автодополнение |
| `Ctrl + L` | Очистить экран |
| `Ctrl + A` | В начало строки |
| `Ctrl + E` | В конец строки |

---

## 🎯 БЫСТРЫЙ СТАРТ (копировать целиком)

```bash
# 1. Перейти в папку проекта
cd C:\Users\Alienware\Desktop\projects\build-platform

# 2. Установить зависимости (если нужно)
npm install

# 3. Запустить сервер
npm run dev

# 4. Открыть в браузере
start http://localhost:3000
```

---

## 🔥 ПОЛЕЗНЫЕ ССЫЛКИ

- Локальный сайт: http://localhost:3000
- Админка: http://localhost:3000/admin
- Личный кабинет: http://localhost:3000/dashboard
- Supabase Dashboard: https://supabase.com/dashboard/project/zpdltovexglsoislnmki
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs