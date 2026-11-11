'use server';

import { updateProfile } from '@/lib/supabase/queries';
import { CreateProfileData } from '@/lib/supabase/types';
import { uploadAvatar, uploadPortfolio } from '@/lib/supabase/storage';
import { createClient } from '@/lib/supabase/server';

export async function updateProfileAction(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Необходимо войти в аккаунт' };
  }

  const profileId = formData.get('profileId') as string;
  if (!profileId) {
    return { success: false, error: 'ID профиля не указан' };
  }

  // 1. Загружаем новый аватар (если есть)
  let imageUrl = formData.get('currentImage') as string | null;
  const avatarFile = formData.get('avatar') as File | null;
  
  if (avatarFile && avatarFile.size > 0) {
    const avatarResult = await uploadAvatar(avatarFile);
    if (!avatarResult.success) {
      return { success: false, error: avatarResult.error };
    }
    imageUrl = avatarResult.url || null;
  }

  // 2. Загружаем новые фото портфолио (если есть)
  let portfolioUrls: string[] = [];
  const existingPortfolio = formData.get('currentPortfolio') as string;
  if (existingPortfolio) {
    try {
      portfolioUrls = JSON.parse(existingPortfolio);
    } catch {
      portfolioUrls = [];
    }
  }

  const newPortfolioFiles = formData.getAll('portfolio') as File[];
  const validNewFiles = newPortfolioFiles.filter(f => f && f.size > 0);
  
  if (validNewFiles.length > 0) {
    const portfolioResult = await uploadPortfolio(validNewFiles);
    if (!portfolioResult.success) {
      return { success: false, error: portfolioResult.error };
    }
    portfolioUrls = [...portfolioUrls, ...(portfolioResult.urls || [])];
  }

  // 3. Собираем данные
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

  // 4. Обновляем
  const result = await updateProfile(profileId, user.id, data);
  return { success: result.success, error: result.error };
}