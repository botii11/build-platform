export type ProfileStatus = 'pending' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  created_at: string;
  name: string;
  type: 'architect' | 'builder' | 'developer' | 'supplier';
  city: string;
  country: string;
  rating: number;
  reviews_count: number;
  specialization: string;
  price: string;
  image: string | null;
  verified: boolean;
  phone: string | null;
  email: string | null;
  experience: string | null;
  completed_projects: number;
  about: string | null;
  portfolio: string[] | null;
  reviews_list: Array<{
    author: string;
    text: string;
    rating: number;
    date: string;
  }> | null;
  status: ProfileStatus;
}

// Данные для создания нового профиля (то, что вводит пользователь)
export interface CreateProfileData {
  name: string;
  type: 'architect' | 'builder' | 'developer' | 'supplier';
  city: string;
  country: string;
  specialization: string;
  price: string;
  phone?: string;
  email?: string;
  experience?: string;
  about?: string;
}

// Результат валидации
export interface ValidationResult {
  success: boolean;
  errors: Record<string, string>;
}
