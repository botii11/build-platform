'use server';

import { createProfile } from '@/lib/supabase/queries';
import { CreateProfileData } from '@/lib/supabase/types';
import { uploadAvatar, uploadPortfolio } from '@/lib/supabase/storage';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function submitProfileAction(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  // 1. Проверяем авторизацию
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Необходимо войти в аккаунт' };
  }

  // 2. Загружаем аватар (если есть)
  let imageUrl: string | null = null;
  const avatarFile = formData.get('avatar') as File | null;
  
  if (avatarFile && avatarFile.size > 0) {
    const avatarResult = await uploadAvatar(avatarFile);
    if (!avatarResult.success) {
      return { success: false, error: avatarResult.error };
    }
    imageUrl = avatarResult.url || null;
  }

  // 3. Загружаем портфолио (если есть)
  let portfolioUrls: string[] = [];
  const portfolioFiles = formData.getAll('portfolio') as File[];
  const validPortfolioFiles = portfolioFiles.filter(f => f && f.size > 0);
  
  if (validPortfolioFiles.length > 0) {
    const portfolioResult = await uploadPortfolio(validPortfolioFiles);
    if (!portfolioResult.success) {
      return { success: false, error: portfolioResult.error };
    }
    portfolioUrls = portfolioResult.urls || [];
  }

  // 4. Собираем данные профиля
  const data: CreateProfileData & { image?: string | null; portfolio?: string[] } = {
    name: formData.get('name') as string,
    type: formData.get('type') as CreateProfileData['type'],
    country: formData.get('country') as string,
    city: formData.get('city') as string,
    specialization: formData.get('specialization') as string,
    price: formData.get('price') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    experience: formData.get('experience') as string,
    about: formData.get('about') as string,
    image: imageUrl,
    portfolio: portfolioUrls,
  };

  // 5. Сохраняем профиль с user_id
  const result = await createProfile(data, user.id);
  
  return { 
    success: result.success, 
    error: result.error 
  };
}