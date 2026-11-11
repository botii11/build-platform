import { createClient } from './server';
import { Profile, CreateProfileData, ValidationResult } from './types';

// Кэш в памяти
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 60 * 1000;

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  return null;
}

function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

export function clearCache() {
  cache.clear();
}

// Получить ОДОБРЕННЫЕ профили (для публичного каталога)
export async function getProfiles(filters?: {
  type?: string;
  city?: string;
  country?: string;
  minRating?: number;
  verified?: boolean;
  search?: string;
}): Promise<Profile[]> {
  const cacheKey = `profiles:approved:${JSON.stringify(filters || {})}`;
  
  const cached = getCached<Profile[]>(cacheKey);
  if (cached) return cached;

  const supabase = createClient();
  let query = supabase
    .from('profiles')
    .select('*')
    .eq('status', 'approved');

  if (filters?.type && filters.type !== 'all') query = query.eq('type', filters.type);
  if (filters?.city && filters.city !== 'all') query = query.eq('city', filters.city);
  if (filters?.country && filters.country !== 'all') query = query.eq('country', filters.country);
  if (filters?.minRating && filters.minRating > 0) query = query.gte('rating', filters.minRating);
  if (filters?.verified) query = query.eq('verified', true);
  if (filters?.search) query = query.or(`name.ilike.%${filters.search}%,specialization.ilike.%${filters.search}%`);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching profiles:', error);
    return [];
  }

  const result = data || [];
  setCache(cacheKey, result);
  return result;
}

// Получить один одобренный профиль по UUID
export async function getProfileById(id: string): Promise<Profile | null> {
  const cacheKey = `profile:approved:${id}`;
  
  const cached = getCached<Profile>(cacheKey);
  if (cached) return cached;

  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  if (data) setCache(cacheKey, data);
  return data;
}

// Получить ВСЕ профили (для админки)
export async function getAllProfiles(filters?: {
  status?: 'pending' | 'approved' | 'rejected';
  type?: string;
}): Promise<Profile[]> {
  const supabase = createClient();
  let query = supabase.from('profiles').select('*');

  if (filters?.status) query = query.eq('status', filters.status);
  if (filters?.type && filters.type !== 'all') query = query.eq('type', filters.type);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all profiles:', error);
    return [];
  }

  return data || [];
}

// Получить профиль пользователя (для личного кабинета)
export async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

// Изменить статус профиля (для админки)
export async function updateProfileStatus(
  id: string,
  status: 'pending' | 'approved' | 'rejected'
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase
    .from('profiles')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating profile status:', error);
    return { success: false, error: 'Не удалось обновить статус' };
  }

  clearCache();
  return { success: true };
}

// Удалить профиль (для админки)
export async function deleteProfile(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting profile:', error);
    return { success: false, error: 'Не удалось удалить профиль' };
  }

  clearCache();
  return { success: true };
}

// Валидация данных профиля
export function validateProfileData(data: CreateProfileData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Имя должно содержать минимум 2 символа';
  }

  if (!data.type || !['architect', 'builder', 'developer', 'supplier'].includes(data.type)) {
    errors.type = 'Выберите тип профиля';
  }

  if (!data.country) {
    errors.country = 'Выберите страну';
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'Укажите город';
  }

  if (!data.specialization || data.specialization.trim().length < 3) {
    errors.specialization = 'Укажите специализацию (минимум 3 символа)';
  }

  if (!data.price || data.price.trim().length < 2) {
    errors.price = 'Укажите ориентировочную стоимость';
  }

  const hasPhone = data.phone && data.phone.trim().length >= 5;
  const hasEmail = data.email && data.email.includes('@');
  
  if (!hasPhone && !hasEmail) {
    errors.contact = 'Укажите телефон или email для связи';
  }

  if (data.email && !data.email.includes('@')) {
    errors.email = 'Некорректный email';
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
}

// Создать новый профиль (со статусом pending)
export async function createProfile(
  data: CreateProfileData & { image?: string | null; portfolio?: string[] },
  userId?: string
): Promise<{ success: boolean; error?: string; profileId?: string }> {
  const validation = validateProfileData(data);
  if (!validation.success) {
    return { 
      success: false, 
      error: Object.values(validation.errors).join(', ') 
    };
  }

  const supabase = createClient();

  const { data: newProfile, error } = await supabase
    .from('profiles')
    .insert({
      name: data.name.trim(),
      type: data.type,
      city: data.city.trim(),
      country: data.country,
      specialization: data.specialization.trim(),
      price: data.price.trim(),
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      experience: data.experience?.trim() || null,
      about: data.about?.trim() || null,
      image: data.image || null,
      portfolio: data.portfolio || [],
      status: 'pending',
      verified: false,
      rating: 0,
      reviews_count: 0,
      completed_projects: 0,
      reviews_list: [],
      user_id: userId || null,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Error creating profile:', error);
    return { success: false, error: 'Не удалось сохранить профиль. Попробуйте позже.' };
  }

  clearCache();

  return { success: true, profileId: newProfile.id };
}

// Обновить профиль пользователя
export async function updateProfile(
  profileId: string,
  userId: string,
  data: CreateProfileData & { image?: string | null; portfolio?: string[] }
): Promise<{ success: boolean; error?: string }> {
  const validation = validateProfileData(data);
  if (!validation.success) {
    return { 
      success: false, 
      error: Object.values(validation.errors).join(', ') 
    };
  }

  const supabase = createClient();

  // Проверяем, что профиль принадлежит пользователю
  const { data: existingProfile, error: fetchError } = await supabase
    .from('profiles')
    .select('user_id')
    .eq('id', profileId)
    .single();

  if (fetchError || !existingProfile || existingProfile.user_id !== userId) {
    return { success: false, error: 'Профиль не найден или нет доступа' };
  }

  // Обновляем профиль и возвращаем статус pending на модерацию
  const { error } = await supabase
    .from('profiles')
    .update({
      name: data.name.trim(),
      type: data.type,
      city: data.city.trim(),
      country: data.country,
      specialization: data.specialization.trim(),
      price: data.price.trim(),
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      experience: data.experience?.trim() || null,
      about: data.about?.trim() || null,
      image: data.image || null,
      portfolio: data.portfolio || [],
      status: 'pending', // После изменений — снова на модерацию
    })
    .eq('id', profileId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating profile:', error);
    return { success: false, error: 'Не удалось обновить профиль' };
  }

  clearCache();
  return { success: true };
}