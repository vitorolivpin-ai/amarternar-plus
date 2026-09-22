import {
  ShieldCheck,
  Database,
  UserRound,
  ClipboardList,
  Droplets,
  Globe,
  Trash2,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';

import { useStore } from '../store';

export default function Privacidade({ onBack }) {
  const t = useStore((state) => state.t);

  function handleDeleteData() {
    const confirmed = window.confirm(
      t('privacyDeleteConfirmation')
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem('amarternar_profile');
    localStorage.removeItem('amarternar-storage');

    window.location.reload();
  }

  const dataItems = [
    {
      icon: UserRound,
      title: t('privacyProfileDataTitle'),
      description: t('privacyProfileDataDescription'),
      color: 'bg-[#FFF0F5] text-pink-500',
    },
    {
      icon: ClipboardList,
      title: t('privacyRoutineDataTitle'),
      description: t('privacyRoutineDataDescription'),
      color: 'bg-[#E6E6FA] text-[#8B7BA8]',
    },
    {
      icon: Droplets,
      title: t('privacyPumpingDataTitle'),
      description: t('privacyPumpingDataDescription'),
      color: 'bg-[#E8F6FF] text-[#62A6C8]',
    },
    {
      icon: Globe,
      title: t('privacyPreferencesTitle'),
      description: t('privacyPreferencesDescription'),
      color: 'bg-[#FFF4D8] text-amber-600',
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 pb-28">
      <section className="rounded-3xl bg-gradient-to-br from-[#B8A9C9] to-[#DCD0FF] p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <div>
            <p className="text-sm text-white/80">
              {t('privacyEyebrow')}
            </p>

            <h1 className="text-2xl font-bold">
              {t('privacyTitle')}
            </h1>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-white/90">
          {t('privacyHeaderDescription')}
        </p>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">
          {t('privacyWhatDataTitle')}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {t('privacyWhatDataDescription')}
        </p>

        <div className="mt-5 space-y-3">
          {dataItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-xl border border-[#F1EEFA] bg-[#FFFDFB] p-4"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-[#B8A9C9]" />

          <h2 className="text-lg font-bold text-gray-800">
            {t('privacyStorageTitle')}
          </h2>
        </div>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {t('privacyStorageDescription')}
        </p>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">
          {t('privacyPurposeTitle')}
        </h2>

        <ul className="mt-3 space-y-3">
          {[
            t('privacyPurpose1'),
            t('privacyPurpose2'),
            t('privacyPurpose3'),
            t('privacyPurpose4'),
          ].map((purpose) => (
            <li
              key={purpose}
              className="flex items-start gap-2 text-sm leading-5 text-gray-600"
            >
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#B8A9C9]" />
              {purpose}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />

          <div>
            <h2 className="text-base font-bold text-amber-900">
              {t('privacySensitiveDataTitle')}
            </h2>

            <p className="mt-1 text-sm leading-6 text-amber-800">
              {t('privacySensitiveDataDescription')}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800">
          {t('privacyRightsTitle')}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {t('privacyRightsDescription')}
        </p>

        <button
          type="button"
          onClick={handleDeleteData}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
          {t('privacyDeleteButton')}
        </button>
      </section>

      <section className="rounded-2xl border border-[#E6E6FA] bg-[#F5F0FF] p-4">
        <p className="text-sm font-bold text-gray-700">
          {t('privacyLegalTitle')}
        </p>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          {t('privacyLegalDescription')}
        </p>
      </section>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-xl border-2 border-[#B8A9C9] py-3 text-sm font-bold text-[#8B7BA8] transition-colors hover:bg-[#F5F0FF]"
        >
          {t('back')}
        </button>
      )}
    </div>
  );
}
