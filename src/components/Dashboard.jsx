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
  BriefcaseBusiness,
} from 'lucide-react';

import { useStore } from '../store';

export default function Dashboard({ onNavigate, onEmergencia }) {
  const { user, t, ordenhaRecords, getNextPumpingEstimate } = useStore();

  const lastRecord = ordenhaRecords[0];
  const nextEstimate = getNextPumpingEstimate();

  const formatTimeAgo = (date) => {
    const diff = new Date() - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return hours > 0
      ? `${hours}${t('hours')} ${mins}${t('minutes')} ${t('ago')}`
      : `${mins}${t('minutes')} ${t('ago')}`;
  };

  const formatTimeUntil = (date) => {
    const diff = new Date(date) - new Date();

    if (diff < 0) {
      return 'Agora!';
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

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
      label: 'Tarefas',
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
      label: 'Cuidados Inteligentes',
      color: 'from-[#DFF7F0] to-[#C8EFE4]',
      iconColor: 'text-emerald-500',
    },
    {
      id: 'retorno',
      icon: Briefcase,
      label: 'Retorno ao Trabalho',
      color: 'from-[#EDE9FE] to-[#D8CFF5]',
      iconColor: 'text-indigo-500',
    },
    {
      id: 'ordenha',
      icon: Droplets,
      label: 'Diário de Ordenha',
      color: 'from-[#FFF0F5] to-[#FFD6E7]',
      iconColor: 'text-pink-500',
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-r from-[#FFDAB9]/40 to-[#E6E6FA]/40 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
            <Baby className="w-8 h-8 text-[#FFCBA4]" />
          </div>

          <div>
            <p className="text-gray-500 text-base">
              {t('welcome')},
            </p>

            <h2 className="text-2xl font-bold text-gray-800">
              {user?.name || t('guest')} 💕
            </h2>
          </div>
        </div>
      </div>

      {lastRecord && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E6E6FA]/30">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-5 h-5 text-[#B8A9C9]" />

            <h3 className="font-semibold text-gray-700 text-base">
              {t('lastPumping')}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FFF5EE] rounded-xl p-3">
              <p className="text-sm text-gray-500">
                {t('duration')}
              </p>

              <p className="text-lg font-bold text-[#FFCBA4]">
                {lastRecord.duration} min
              </p>
            </div>

            <div className="bg-[#F5F0FF] rounded-xl p-3">
              <p className="text-sm text-gray-500">
                {t('quantity')}
              </p>

              <p className="text-lg font-bold text-[#B8A9C9]">
                {lastRecord.quantity || '-'} ml
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-gray-500 text-base">
            <Clock className="w-4 h-4" />

            <span>{formatTimeAgo(lastRecord.date)}</span>
          </div>

          {nextEstimate && (
            <div className="mt-4 bg-gradient-to-r from-[#FFDAB9]/20 to-[#E6E6FA]/20 rounded-xl p-3 border border-dashed border-[#DCD0FF]">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#B8A9C9]" />

                <div>
                  <p className="text-sm text-gray-500">
                    {t('nextPumping')}
                  </p>

                  <p className="font-semibold text-[#B8A9C9] text-base">
                    {formatTimeUntil(nextEstimate)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-base">
          <Heart className="w-4 h-4 text-[#FFCBA4]" />
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
                className={`bg-gradient-to-br ${item.color} p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] flex flex-col items-center gap-2 min-h-[120px]`}
              >
                <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>

                <span className="font-medium text-gray-700 text-center text-base">
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
        className="w-full bg-gradient-to-r from-red-400 to-red-500 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 hover:scale-[1.01]"
      >
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Phone className="w-5 h-5" />
        </div>

        <span className="font-bold text-lg">
          {t('emergencyBtn')}
        </span>

        <AlertTriangle className="w-5 h-5 animate-pulse" />
      </button>
    </div>
  );
}
