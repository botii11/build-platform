'use client';

import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Profile } from '@/lib/supabase/types';
import { approveProfileAction, rejectProfileAction, deleteProfileAction } from './actions';

interface AdminContentProps {
  initialProfiles: Profile[];
}

function ActionButton({ 
  action, 
  id, 
  children, 
  variant = 'default' 
}: { 
  action: (prevState: any, formData: FormData) => Promise<any>;
  id: string;
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'danger' | 'warning';
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useFormState(action, { success: false, error: '' });

  // Автоматически обновляем страницу после успешного действия
  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);

  const variants = {
    default: 'bg-white border border-stone-200 hover:bg-stone-50 text-stone-700',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white',
  };

  return (
    <div>
      <form action={formAction}>
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          disabled={isPending}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition disabled:opacity-50 ${variants[variant]}`}
        >
          {isPending ? '...' : children}
        </button>
      </form>
      {state.error && (
        <div className="mt-1 text-xs text-red-600">{state.error}</div>
      )}
    </div>
  );
}

export function AdminContent({ initialProfiles }: AdminContentProps) {
  const [profiles] = useState(initialProfiles);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [filterType, setFilterType] = useState('all');

  const filteredProfiles = profiles.filter(p => {
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    const matchType = filterType === 'all' || p.type === filterType;
    return matchStatus && matchType;
  });

  const typeLabels: Record<string, string> = {
    architect: 'Архитектор',
    builder: 'Строитель',
    developer: 'Застройщик',
    supplier: 'Поставщик',
  };

  const statusStyles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-emerald-100 text-emerald-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const statusLabels: Record<string, string> = {
    pending: 'На проверке',
    approved: 'Одобрен',
    rejected: 'Отклонён',
  };

  return (
    <div>
      {/* Фильтры */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  filterStatus === status
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {status === 'all' ? 'Все' : statusLabels[status]}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Все типы</option>
              <option value="architect">Архитекторы</option>
              <option value="builder">Строители</option>
              <option value="developer">Застройщики</option>
              <option value="supplier">Поставщики</option>
            </select>
          </div>
        </div>
      </div>

      {/* Список профилей */}
      <div className="space-y-3">
        {filteredProfiles.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-stone-200 text-center">
            <div className="text-stone-500">Нет профилей с выбранным фильтром</div>
          </div>
        ) : (
          filteredProfiles.map(profile => (
            <div
              key={profile.id}
              className="bg-white rounded-xl p-5 border border-stone-200 hover:border-stone-300 transition"
            >
              <div className="flex flex-wrap items-start gap-4">
                <img
                  src={profile.image || 'https://via.placeholder.com/80'}
                  alt={profile.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-stone-900">{profile.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusStyles[profile.status]}`}>
                      {statusLabels[profile.status]}
                    </span>
                    {profile.verified && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                        ✓ Проверен
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-stone-600 mb-2">
                    {typeLabels[profile.type]} • {profile.city}, {profile.country}
                  </div>
                  <div className="text-sm text-stone-500">
                    {profile.specialization} • {profile.price}
                  </div>
                  {profile.phone && (
                    <div className="text-xs text-stone-400 mt-1">📞 {profile.phone}</div>
                  )}
                  {profile.email && (
                    <div className="text-xs text-stone-400">✉️ {profile.email}</div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.status !== 'approved' && (
                    <ActionButton action={approveProfileAction} id={profile.id} variant="success">
                      ✓ Одобрить
                    </ActionButton>
                  )}
                  {profile.status !== 'rejected' && (
                    <ActionButton action={rejectProfileAction} id={profile.id} variant="warning">
                      ✗ Отклонить
                    </ActionButton>
                  )}
                  <ActionButton action={deleteProfileAction} id={profile.id} variant="danger">
                    🗑 Удалить
                  </ActionButton>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}