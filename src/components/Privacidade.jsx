import {
  AlertTriangle,
  ArrowLeft,
  Database,
  FileText,
  ShieldCheck,
  Trash2,
} from 'lucide-react';

import { useStore } from '../store';

export default function Privacidade({
  profile,
  onBack,
  onDeleteData,
}) {
  const t = useStore((state) => state.t);

  const acceptedAt = profile?.privacyConsent?.acceptedAt;

  const acceptedDate = acceptedAt
    ? new Date(acceptedAt).toLocaleDateString(
        t('privacyDateLocale')
      )
    : t('privacyNoConsentDate');

  function handleDelete() {
    const confirmed = window.confirm(
      t('privacyDeleteConfirmation')
    );

    if (!confirmed) {
      return;
    }

    onDeleteData?.();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 pb-28">
      <section className="rounded-3xl bg-gradient-to-r from-[#B8A9C9] to-[#DCD0FF] p-6 text-white">
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
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#8B7BA8]" />

          <h2 className="text-lg font-bold text-gray-800">
            {t('privacyDataCollectedTitle')}
          </h2>
        </div>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {t('privacyDataCollectedDescription')}
        </p>

        <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-600">
          <li>• {t('privacyDataProfile')}</li>
          <li>• {t('privacyDataRoutine')}</li>
          <li>• {t('privacyDataTasks')}</li>
          <li>• {t('privacyDataPumping')}</li>
          <li>• {t('privacyDataPreferences')}</li>
        </ul>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-[#8B7BA8]" />

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

        <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
          <li>• {t('privacyPurpose1')}</li>
          <li>• {t('privacyPurpose2')}</li>
          <li>• {t('privacyPurpose3')}</li>
          <li>• {t('privacyPurpose4')}</li>
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
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#8B7BA8]" />

          <h2 className="text-lg font-bold text-gray-800">
            {t('privacyConsentStatusTitle')}
          </h2>
        </div>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {profile?.privacyConsent?.accepted
            ? t('privacyConsentAccepted')
            : t('privacyConsentNotAccepted')}
        </p>

        <p className="mt-2 text-xs text-gray-500">
          {t('privacyConsentDate')}: {acceptedDate}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {t('privacyPolicyVersion')}:{' '}
          {profile?.privacyConsent?.policyVersion || '1.0'}
        </p>
      </section>

      <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <div className="flex items-start gap-3">
          <Trash2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <h2 className="text-base font-bold text-red-800">
              {t('privacyDeleteTitle')}
            </h2>

            <p className="mt-1 text-sm leading-6 text-red-700">
              {t('privacyDeleteDescription')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700"
        >
          <Trash2 className="h-4 w-4" />
          {t('privacyDeleteButton')}
        </button>
      </section>

      <button
        type="button"
        onClick={onBack}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#B8A9C9] py-3 text-sm font-bold text-[#8B7BA8] transition-colors hover:bg-[#F5F0FF]"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('backToProfile')}
      </button>
    </div>
  );
}
