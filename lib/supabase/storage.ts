import { createClient } from './server';

// Константы для валидации
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_PORTFOLIO_IMAGES = 6;

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

// Валидация файла
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: `Файл "${file.name}" имеет неподдерживаемый формат. Разрешены: JPG, PNG, WebP` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `Файл "${file.name}" слишком большой. Максимум 5 MB` };
  }
  return { valid: true };
}

// Загрузка аватара
export async function uploadAvatar(file: File): Promise<UploadResult> {
  const validation = validateFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  const { error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading avatar:', error);
    return { success: false, error: 'Не удалось загрузить аватар' };
  }

  // Получаем публичный URL
  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  
  return { success: true, url: data.publicUrl };
}

// Загрузка портфолио (несколько файлов)
export async function uploadPortfolio(files: File[]): Promise<UploadResult & { urls?: string[] }> {
  if (files.length > MAX_PORTFOLIO_IMAGES) {
    return { success: false, error: `Максимум ${MAX_PORTFOLIO_IMAGES} фото в портфолио` };
  }

  const supabase = createClient();
  const urls: string[] = [];

  for (const file of files) {
    const validation = validateFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `portfolios/${fileName}`;

    const { error } = await supabase.storage
      .from('portfolios')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading portfolio image:', error);
      return { success: false, error: 'Не удалось загрузить фото портфолио' };
    }

    const { data } = supabase.storage.from('portfolios').getPublicUrl(filePath);
    urls.push(data.publicUrl);
  }

  return { success: true, urls };
}