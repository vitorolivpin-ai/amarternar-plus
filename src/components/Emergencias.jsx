import {
  Phone,
  X,
  Heart,
  AlertTriangle,
  Info,
  Shield,
} from 'lucide-react';

import { useStore } from '../store';

const emergencyNumbers = [
  {
    id: 1,
    name: 'SAMU',
    number: '192',
    descriptionKey: 'emergencySamuDescription',
    color: 'bg-red-500',
    icon: AlertTriangle,
  },
  {
    id: 2,
    name: 'CVV',
    number: '188',
    descriptionKey: 'emergencyCvvDescription',
    color: 'bg-[#B8A9C9]',
    icon: Heart,
  },
  {
    id: 3,
    name: 'Disque Saúde',
    nameKey: 'emergencyHealthLineName',
    number: '136',
    descriptionKey: 'emergencyHealthLineDescription',
    color: 'bg-[#FFCBA4]',
    icon: Info,
  },
  {
    id: 4,
    name: 'Polícia',
    nameKey: 'emergencyPoliceName',
    number: '190',
    descriptionKey: 'emergencyPoliceDescription',
    color: 'bg-blue-500',
    icon: Shield,
  },
  {
    id: 5,
    name: 'Bombeiros',
    nameKey: 'emergencyFirefightersName',
    number: '193',
    descriptionKey: 'emergencyFirefightersDescription',
    color: 'bg-orange-500',
    icon: AlertTriangle,
  },
];

export default function Emergencias({ onClose }) {
  const t = useStore((state) => state.t);

  function handleCall(number) {
    window.location.href = `tel:${number}`;
  }

  return (
    <div className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <Phone className="h-5 w-5 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            {t('emergencyNumbers')}
          </h2>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
            aria-label={t('close')}
            title={t('close')}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {emergencyNumbers.map((item) => {
          const Icon = item.icon;
          const serviceName = item.nameKey
            ? t(item.nameKey)
            : item.name;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleCall(item.number)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md"
              aria-label={`${t('call')} ${serviceName}: ${item.number}`}
              title={`${t('call')} ${serviceName}`}
            >
              <div
                className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${item.color} transition-transform group-hover:scale-105`}
              >
                <Icon className="h-7 w-7 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">
                    {serviceName}
                  </h3>

                  <span className="text-2xl font-bold text-gray-800">
                    {item.number}
                  </span>
                </div>

                <p className="mt-1 text-base text-gray-500">
                  {t(item.descriptionKey)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-sm text-gray-400">
        {t('emergencyTapToCall')}
      </p>
    </div>
  );
}
