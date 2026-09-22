import { useState } from 'react';

import {
  Camera,
  Heart,
  Image,
  Pencil,
  ShieldCheck,
  Trash2,
  User,
} from 'lucide-react';

import { useStore } from '../store';

const avatarOptions = ['👩', '💛', '🌸', '🍼', '✨', '🌷'];

const routineLabelKeys = {
  clt: 'workClt',
  autonoma: 'workAutonomous',
  informal: 'workInformal',
  estudante: 'workStudent',
  sem_trabalho: 'workNotWorking',
  nao_informar: 'preferNotToSay',

  fixo_dia: 'scheduleFixedDay',
  manha: 'scheduleMorning',
  tarde: 'scheduleAfternoon',
  noite: 'scheduleNight',
  '12x36': 'scheduleTwelveByThirtySix',
  variavel: 'scheduleVariable',
  casa: 'scheduleHome',
  outro: 'scheduleOther',

  creche: 'babyCareDaycare',
  familiar: 'babyCareFamily',
  cuidador: 'babyCareCaregiver',
  comigo: 'babyCareWithMe',
  organizando: 'babyCareOrganizing',

  retorno: 'priorityReturnToWork',
  ordenha: 'priorityPumping',
  direitos: 'priorityRights',
  tarefas: 'priorityTasks',
  mapa: 'priorityMap',
  cuidados: 'priorityCare',
};

export default function Perfil({
  profile,
  onSave,
  onEditRoutine,
  onNavigate,
}) {
  const t = useStore((state) => state.t);

  const [displayName, setDisplayName] = useState(
    profile?.displayName || ''
  );

  const [avatar, setAvatar] = useState(
    profile?.avatar || '👩'
  );

  const [profilePhoto, setProfilePhoto] = useState(
    profile?.profilePhoto || ''
  );

  const [photoError, setPhotoError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setPhotoError(t('invalidImageFormat'));
      return;
    }

    if (file.size > 1024 * 1024) {
      setPhotoError(t('imageTooLarge'));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePhoto(reader.result);
      setPhotoError('');
      setSuccessMessage('');
    };

    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setProfilePhoto('');
    setPhotoError('');
    setSuccessMessage('');
  }

  function saveProfile() {
    const updatedProfile = {
      ...profile,
      displayName:
        displayName.trim() ||
        profile?.displayName ||
        t('userFallbackName'),
      avatar,
      profilePhoto,
      privacyConsent: {
        ...profile?.privacyConsent,
      },
      onboardingCompleted: true,
    };

    try {
      localStorage.setItem(
        'amarternar_profile',
        JSON.stringify(updatedProfile)
      );

      onSave(updatedProfile);

      setSuccessMessage(t('profileUpdated'));
      setPhotoError('');
    } catch (error) {
      setPhotoError(t('couldNotSavePhoto'));
      setSuccessMessage('');
    }
  }

  const profileItems = [
    {
      label: t('routineWorkOrStudy'),
      valueKey: routineLabelKeys[profile?.routine?.workType],
    },
    {
      label: t('routineSchedule'),
      valueKey: routineLabelKeys[profile?.routine?.schedule],
    },
    {
      label: t('routineBabyCare'),
      valueKey: routineLabelKeys[profile?.routine?.babyCare],
    },
    {
      label: t('routineCurrentPriority'),
      valueKey: routineLabelKeys[profile?.routine?.priority],
    },
  ]
    .filter((item) => item.valueKey)
    .map((item) => ({
      ...item,
      value: t(item.valueKey),
    }));

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 pb-28">
      <section className="rounded-3xl bg-gradient-to-r from-[#FFDAB9] to-[#E6E6FA] p-6">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white/80 shadow-md">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt={t('profilePhoto')}
              className="h-full w-full object-cover"
            />
          ) : (
            <span
              className="text-4xl"
              aria-label={t('profileAvatar')}
            >
              {avatar}
            </span>
          )}
        </div>

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          {t('myProfile')}
        </h1>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          {t('profileIntro')}
        </p>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-[#B8A9C9]" />

          <h2 className="font-bold text-gray-800">
            {t('preferredNameQuestion')}
          </h2>
        </div>

        <label htmlFor="displayName" className="sr-only">
          {t('preferredName')}
        </label>

        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(event) => {
            setDisplayName(event.target.value);
            setSuccessMessage('');
          }}
          placeholder={t('preferredNameExample')}
          maxLength={30}
          className="mt-4 w-full rounded-xl border-2 border-[#E6E6FA] bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#B8A9C9]"
        />

        <p className="mt-2 text-xs text-gray-500">
          {t('preferredNameHelp')}
        </p>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 fill-[#FFCBA4] text-[#FFCBA4]" />

          <h2 className="font-bold text-gray-800">
            {t('chooseAvatar')}
          </h2>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {t('chooseAvatarHelp')}
        </p>

        <div className="mt-4 grid grid-cols-6 gap-2">
          {avatarOptions.map((avatarOption) => {
            const isSelected = avatar === avatarOption;

            return (
              <button
                key={avatarOption}
                type="button"
                onClick={() => {
                  setAvatar(avatarOption);
                  setProfilePhoto('');
                  setSuccessMessage('');
                }}
                className={`h-12 rounded-xl text-2xl transition-all ${
                  isSelected
                    ? 'scale-105 bg-[#E6E6FA] ring-2 ring-[#B8A9C9]'
                    : 'bg-[#FFF5EE] hover:bg-[#F5F0FF]'
                }`}
                aria-label={`${t('chooseAvatarAction')} ${avatarOption}`}
                aria-pressed={isSelected}
              >
                {avatarOption}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-[#B8A9C9]" />

          <h2 className="font-bold text-gray-800">
            {t('profilePhoto')}
          </h2>
        </div>

        <p className="mt-2 text-sm leading-5 text-gray-500">
          {t('profilePhotoHelp')}
        </p>

        <label className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#B8A9C9] px-4 py-3 text-sm font-bold text-[#8B7BA8] transition-colors hover:bg-[#F5F0FF]">
          <Image className="h-5 w-5" />
          {t('chooseProfilePhoto')}

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>

        <p className="mt-2 text-xs text-gray-500">
          {t('acceptedImageFormats')}
        </p>

        {profilePhoto && (
          <button
            type="button"
            onClick={removePhoto}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-500 transition-colors hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
            {t('removePhoto')}
          </button>
        )}

        {photoError && (
          <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
            {photoError}
          </p>
        )}
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-gray-800">
              {t('myRoutine')}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {t('myRoutineHelp')}
            </p>
          </div>

          <Heart className="h-6 w-6 fill-[#FFCBA4] text-[#FFCBA4]" />
        </div>

        {profileItems.length > 0 ? (
          <div className="mt-5 space-y-3">
            {profileItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#F1EEFA] bg-[#FFFDFB] p-4"
              >
                <p className="text-xs text-gray-500">
                  {item.label}
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-700">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-xl bg-[#FFF5EE] p-4 text-sm text-gray-600">
            {t('noRoutineDetails')}
          </p>
        )}

        <button
          type="button"
          onClick={onEditRoutine}
          className="mt-5 w-full rounded-xl border-2 border-[#B8A9C9] py-3 font-bold text-[#8B7BA8] transition-colors hover:bg-[#F5F0FF]"
        >
          <span className="inline-flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            {t('adjustRoutine')}
          </span>
        </button>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#8B7BA8]" />

          <h2 className="font-bold text-gray-800">
            {t('privacyAndData')}
          </h2>
        </div>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {t('privacyAndDataDescription')}
        </p>

        <button
          type="button"
          onClick={() => onNavigate?.('privacidade')}
          className="mt-4 w-full rounded-xl border-2 border-[#B8A9C9] py-3 font-bold text-[#8B7BA8] transition-colors hover:bg-[#F5F0FF]"
        >
          {t('viewPrivacy')}
        </button>
      </section>

      {successMessage && (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </p>
      )}

      <button
        type="button"
        onClick={saveProfile}
        className="w-full rounded-2xl bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] py-4 font-bold text-white shadow-md transition-all hover:shadow-lg"
      >
        {t('saveChanges')}
      </button>

      <section className="rounded-2xl border border-[#E6E6FA] bg-[#F5F0FF] p-4">
        <p className="text-sm font-bold text-gray-700">
          {t('dataStaysOnDevice')}
        </p>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          {t('dataStaysOnDeviceDescription')}
        </p>
      </section>
    </div>
  );
}
