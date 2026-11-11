'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { updateProfileStatus, deleteProfile } from '@/lib/supabase/queries';

const ADMIN_COOKIE = 'build_admin_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 часа

// Вход по паролю
export async function adminLoginAction(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const password = formData.get('password') as string;
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    return { success: false, error: 'Пароль админа не настроен на сервере' };
  }

  if (password !== correctPassword) {
    return { success: false, error: 'Неверный пароль' };
  }

  const cookieStore = cookies();
  cookieStore.set(ADMIN_COOKIE, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  return { success: true };
}

// Выход
export async function adminLogoutAction() {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect('/admin/login');
}

// Одобрить профиль
export async function approveProfileAction(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const id = formData.get('id') as string;
  
  if (!id) {
    return { success: false, error: 'ID профиля не указан' };
  }

  console.log('[Admin] Approving profile:', id);
  const result = await updateProfileStatus(id, 'approved');
  console.log('[Admin] Result:', result);
  
  return result;
}

// Отклонить профиль
export async function rejectProfileAction(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const id = formData.get('id') as string;
  
  if (!id) {
    return { success: false, error: 'ID профиля не указан' };
  }

  console.log('[Admin] Rejecting profile:', id);
  const result = await updateProfileStatus(id, 'rejected');
  console.log('[Admin] Result:', result);
  
  return result;
}

// Удалить профиль
export async function deleteProfileAction(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const id = formData.get('id') as string;
  
  if (!id) {
    return { success: false, error: 'ID профиля не указан' };
  }

  console.log('[Admin] Deleting profile:', id);
  const result = await deleteProfile(id);
  console.log('[Admin] Result:', result);
  
  return result;
}