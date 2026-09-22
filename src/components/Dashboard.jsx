import {
  MapPin,
  LayoutGrid,
  BookOpen,
  Droplets,
  Phone,
  Clock,
  AlertTriangle,
  Baby,
  Heart,
  Scale,
  Sparkles,
} from 'lucide-react';

import { useStore } from '../store';

export default function Dashboard({
  profile,
  onNavigate,
  onEmergencia,
}) {
  const {
    user,
    t,
    ordenhaRecords,
    getNextPumpingEstimate,
  } = useStore();

  const displayName = profile?.displayName || user?.name || t('guest');

  const lastRecord = ordenhaRecords[0];
  const nextEstimate = getNextPumpingEstimate();

  const formatTimeAgo = (date) => {
    const diff = new Date() - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(
      (diff % (1000 * 60 * 60)) / (1000 * 60)
    );

    return hours > 0
      ? `${hours}${t('hours')} ${mins}${t('minutes')} ${t('ago')}`
      : `${mins}${t('minutes')} ${t('ago')}`;
  };

  const formatTimeUntil = (date) => {
    const diff = new Date(date) - new Date();

    if (diff < 0) {
      return t('now');
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(
      (diff % (1000 * 60 * 60)) / (1000 * 60)
    );

    return hours > 0
      ? `${t('in')} ${hours}${t('hours')} ${mins}${t('minutes')}`
      : `${t('in')} ${mins}${t('minutes')}`;
  };

  const quickAccessItems = [
    {
      id: 'mapa',
      icon: MapPin,
      label: t('map'),
      color: 'from-[#FFE4C4] to-[#FFDAB9]',
      iconColor: 'text-orange-400',
    },
    {
      id: 'tarefas',
      icon: LayoutGrid,
      label: t('tasks'),
      color: 'from-[#E6E6FA] to-[#DCD0FF]',
      iconColor: 'text-purple-400',
    },
    {
      id: 'biblioteca',
      icon: BookOpen,
      label: t('library'),
      color: 'from-[#FFDAB9] to-[#FFCBA4]',
      iconColor: 'text-amber-500',
    },
    {
      id: 'direitos',
      icon: Scale,
      label: t('rights'),
      color: 'from-[#DCD0FF] to-[#B8A9C9]',
      iconColor: 'text-indigo-400',
    },
    {
      id: 'cuidados',
      icon: Sparkles,
      label: t('smartCare'),
      color: 'from-[#DFF7F0] to-[#C8EFE4]',
      iconColor: 'text-emerald-500',
    },
    {
      id: 'retorno',
      icon: Heart,
      label: t('returnToWork'),
      color: 'from-[#EDE9FE] to-[#D8CFF5]',
      iconColor: 'text-indigo-500',
    },
    {
      id: 'ordenha',
      icon: Droplets,
      label: t('pumpingDiary'),
      color: 'from-[#FFF0F5] to-[#FFD6E7]',
      iconColor: 'text-pink-500',
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="rounded-2xl bg-gradient-to-r from-[#FFDAB9]/40 to-[#E6E6FA]/40 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-md">
            {profile?.profilePhoto ? (
              <img
                src={profile.profilePhoto}
                alt={`${t('profilePhotoOf')} ${displayName}`}
                className="h-full w-full object-cover"
              />
            ) : profile?.avatar ? (
              <span
                className="text-2xl"
                aria-label={`${t('avatarOf')} ${displayName}`}
              >
                {profile.avatar}
              </span>
            ) : (
              <Baby className="h-8 w-8 text-[#FFCBA4]" />
            )}
          </div>

          <div>
            <p className="text-base text-gray-500">
              {t('welcome')},
            </p>

            <h2 className="text-2xl font-bold text-gray-800">
              {displayName} 💕
            </h2>
          </div>
        </div>
      </div>

      {lastRecord && (
        <div className="rounded-2xl border border-[#E6E6FA]/30 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-[#B8A9C9]" />

            <h3 className="text-base font-semibold text-gray-700">
              {t('lastPumping')}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#FFF5EE] p-3">
              <p className="text-sm text-gray-500">
                {t('duration')}
              </p>

              <p className="text-lg font-bold text-[#FFCBA4]">
                {lastRecord.duration} {t('minutes')}
              </p>
            </div>

            <div className="rounded-xl bg-[#F5F0FF] p-3">
              <p className="text-sm text-gray-500">
                {t('quantity')}
              </p>

              <p className="text-lg font-bold text-[#B8A9C9]">
                {lastRecord.quantity || '-'} {t('milliliters')}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-base text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{formatTimeAgo(lastRecord.date)}</span>
          </div>

          {nextEstimate && (
            <div className="mt-4 rounded-xl border border-dashed border-[#DCD0FF] bg-gradient-to-r from-[#FFDAB9]/20 to-[#E6E6FA]/20 p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#B8A9C9]" />

                <div>
                  <p className="text-sm text-gray-500">
                    {t('nextPumping')}
                  </p>

                  <p className="text-base font-semibold text-[#B8A9C9]">
                    {formatTimeUntil(nextEstimate)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-700">
          <Heart className="h-4 w-4 text-[#FFCBA4]" />
          {t('quickAccess')}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex min-h-[120px] flex-col items-center gap-2 rounded-2xl bg-gradient-to-br ${item.color} p-4 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80">
                  <Icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>

                <span className="text-center text-base font-medium text-gray-700">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onEmergencia}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-400 to-red-500 p-4 text-white shadow-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Phone className="h-5 w-5" />
        </div>

        <span className="text-lg font-bold">
          {t('emergencyBtn')}
        </span>

        <AlertTriangle className="h-5 w-5 animate-pulse" />
      </button>
    </div>
  );
}
