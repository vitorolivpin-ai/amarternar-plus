import { useState } from 'react';

import {
  Camera,
  Heart,
  Image,
  Pencil,
  Trash2,
  User,
} from 'lucide-react';

const avatarOptions = ['👩', '💛', '🌸', '🍼', '✨', '🌷'];

const labels = {
  clt: 'Trabalho com carteira assinada',
  autonoma: 'Trabalho por conta própria',
  informal: 'Trabalho sem horário fixo',
  estudante: 'Estou estudando',
  sem_trabalho: 'Não estou trabalhando no momento',
  nao_informar: 'Prefiro não informar',

  fixo_dia: 'Horário fixo durante o dia',
  manha: 'Turno da manhã',
  tarde: 'Turno da tarde',
  noite: 'Turno da noite',
  '12x36': 'Escala 12x36',
  variavel: 'Horários variáveis',
  casa: 'Trabalho ou estudo em casa',
  outro: 'Outro ou não sei',

  creche: 'O bebê vai para a creche',
  familiar: 'O bebê fica com familiar',
  cuidador: 'O bebê fica com cuidador(a)',
  comigo: 'O bebê fica comigo',
  organizando: 'Ainda estou organizando',

  retorno: 'Retorno ao trabalho ou estudo',
  ordenha: 'Ordenha e armazenamento',
  direitos: 'Meus direitos como lactante',
  tarefas: 'Minha rotina e tarefas da semana',
  mapa: 'Encontrar apoio perto de mim',
  cuidados: 'Cuidados comigo e com o bebê',
};

export default function Perfil({
  profile,
  onSave,
  onEditRoutine,
}) {
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
      setPhotoError(
        'Escolha uma imagem no formato JPG, PNG ou WEBP.'
      );
      return;
    }

    if (file.size > 1024 * 1024) {
      setPhotoError(
        'Escolha uma foto de até 1 MB.'
      );
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
        'Usuária',
      avatar,
      profilePhoto,
      onboardingCompleted: true,
    };

    try {
      localStorage.setItem(
        'amarternar_profile',
        JSON.stringify(updatedProfile)
      );

      onSave(updatedProfile);

      setSuccessMessage(
        'Perfil atualizado com sucesso!'
      );

      setPhotoError('');
    } catch (error) {
      setPhotoError(
        'Não foi possível salvar a foto. Tente escolher uma imagem menor.'
      );
      setSuccessMessage('');
    }
  }

  const profileItems = [
    {
      label: 'Trabalho ou estudo',
      value: labels[profile?.workType],
    },
    {
      label: 'Horário ou escala',
      value: labels[profile?.schedule],
    },
    {
      label: 'Cuidados com o bebê',
      value: labels[profile?.babyCare],
    },
    {
      label: 'Prioridade atual',
      value: labels[profile?.priority],
    },
  ].filter((item) => item.value);

  return (
    <div className="p-4 pb-28 max-w-2xl mx-auto space-y-5">
      <section className="bg-gradient-to-r from-[#FFDAB9] to-[#E6E6FA] rounded-3xl p-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-white/80 flex items-center justify-center border-4 border-white shadow-md">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="text-4xl"
              aria-label="Avatar de perfil"
            >
              {avatar}
            </span>
          )}
        </div>

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Meu Perfil
        </h1>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          Ajuste suas informações para deixar o aplicativo mais útil
          para a sua rotina.
        </p>
      </section>

      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-[#B8A9C9]" />

          <h2 className="font-bold text-gray-800">
            Como você prefere ser chamada?
          </h2>
        </div>

        <label
          htmlFor="displayName"
          className="sr-only"
        >
          Nome de preferência
        </label>

        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(event) => {
            setDisplayName(event.target.value);
            setSuccessMessage('');
          }}
          placeholder="Exemplo: Maria"
          maxLength={30}
          className="mt-4 w-full rounded-xl border-2 border-[#E6E6FA] bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#B8A9C9]"
        />

        <p className="mt-2 text-xs text-gray-500">
          Use seu primeiro nome ou um apelido, se preferir.
        </p>
      </section>

      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#FFCBA4] fill-[#FFCBA4]" />

          <h2 className="font-bold text-gray-800">
            Escolha um avatar
          </h2>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Se não quiser usar uma foto, escolha um avatar para aparecer
          no seu perfil.
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
                    ? 'bg-[#E6E6FA] ring-2 ring-[#B8A9C9] scale-105'
                    : 'bg-[#FFF5EE] hover:bg-[#F5F0FF]'
                }`}
                aria-label={`Escolher avatar ${avatarOption}`}
                aria-pressed={isSelected}
              >
                {avatarOption}
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#B8A9C9]" />

          <h2 className="font-bold text-gray-800">
            Foto de perfil
          </h2>
        </div>

        <p className="mt-2 text-sm leading-5 text-gray-500">
          Se preferir, você pode enviar uma foto. Ela ficará salva somente
          neste dispositivo.
        </p>

        <label className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#B8A9C9] px-4 py-3 text-sm font-bold text-[#8B7BA8] cursor-pointer hover:bg-[#F5F0FF] transition-colors">
          <Image className="w-5 h-5" />
          Escolher foto de perfil

          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>

        <p className="mt-2 text-xs text-gray-500">
          Formatos aceitos: JPG, PNG ou WEBP. Tamanho máximo: 1 MB.
        </p>

        {profilePhoto && (
          <button
            type="button"
            onClick={removePhoto}
            className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Remover foto
          </button>
        )}

        {photoError && (
          <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
            {photoError}
          </p>
        )}
      </section>

      <section className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-gray-800">
              Minha rotina
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Estas informações ajudam o AMARternar+ a destacar recursos úteis
              para você.
            </p>
          </div>

          <Heart className="w-6 h-6 text-[#FFCBA4] fill-[#FFCBA4]" />
        </div>

        {profileItems.length > 0 ? (
          <div className="mt-5 space-y-3">
            {profileItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-[#FFFDFB] border border-[#F1EEFA] p-4"
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
            Você ainda não informou detalhes da sua rotina.
          </p>
        )}

        <button
          type="button"
          onClick={onEditRoutine}
          className="mt-5 w-full rounded-xl border-2 border-[#B8A9C9] py-3 font-bold text-[#8B7BA8] hover:bg-[#F5F0FF] transition-colors"
        >
          <span className="inline-flex items-center gap-2">
            <Pencil className="w-4 h-4" />
            Ajustar minha rotina
          </span>
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
        className="w-full rounded-2xl bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] py-4 font-bold text-white shadow-md hover:shadow-lg transition-all"
      >
        Salvar alterações
      </button>

      <section className="rounded-2xl border border-[#E6E6FA] bg-[#F5F0FF] p-4">
        <p className="text-sm font-bold text-gray-700">
          Suas informações ficam neste dispositivo
        </p>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          O aplicativo usa suas respostas apenas para organizar destaques e
          sugestões. Você pode alterar essas informações quando quiser.
        </p>
      </section>
    </div>
  );
}
