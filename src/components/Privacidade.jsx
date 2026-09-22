import {
  AlertTriangle,
  ArrowLeft,
  Cloud,
  Globe2,
  Mail,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserCheck,
} from 'lucide-react';

import { useStore } from '../store';

const CONTACT_EMAIL = 'amarternarplus' + '@' + 'gmail.com';
const POLICY_VERSION = '2.0';

export default function Privacidade({ profile, onBack, onDeleteData }) {
  const t = useStore((state) => state.t);
  const language = useStore((state) => state.language);
  const user = useStore((state) => state.user);

  const isEnglish = language === 'en';
  const hasCloudAccount = Boolean(user?.email);

  const text = isEnglish
    ? {
        eyebrow: 'YOUR DATA',
        title: 'Privacy and data',
        headerDescription:
          'Understand what data AMARternar+ uses, where it is stored, and how you can control it.',
        updated: 'Policy version 2.0 · Updated in September 2026',

        accountTitle: 'Account data (cloud)',
        accountDescription:
          'When you create an account, some information is stored by Supabase, the service we use for sign-in:',
        accountItems: [
          'Name you provided at sign-up',
          'Email address',
          'Password, stored encrypted (no one can read it, not even us)',
          'Account creation date and last access',
        ],
        accountYourEmail: 'Account email',
        guestNotice:
          'You are using guest mode. No data about you is stored in the cloud.',

        deviceTitle: 'Data stored only on this device',
        deviceDescription:
          'The information below stays only in this browser. It is not sent to our servers:',

        transferTitle: 'International data transfer',
        transferDescription:
          'Account data is stored by Supabase on servers located in Canada. This transfer is necessary for the sign-in service to work, and Supabase adopts security measures such as encryption and access control.',

        emailTitle: 'How we use your email',
        emailItems: [
          'To confirm that the email belongs to you',
          'To send the password reset link when you request it',
        ],
        emailNoMarketing:
          'We do not send advertising and we do not share your email with third parties.',

        purposeTitle: 'Why we use this data',

        rightsTitle: 'Your rights (LGPD)',
        rightsDescription:
          'You can request access, correction, or deletion of your account data at any time by writing to:',
        rightsResponse: 'We will reply within 15 days.',

        consentTitle: 'Consent status',
        consentDate: 'Consent date',
        acceptedVersion: 'Accepted version',

        deleteTitle: 'Delete data',
        deleteDescription:
          'The button below deletes everything stored on this device (profile, routine, tasks, pumping records, and preferences) and signs you out.',
        deleteCloudNotice:
          'To also delete your cloud account (name and email), send a request to the email above.',
      }
    : {
        eyebrow: 'SEUS DADOS',
        title: 'Privacidade e dados',
        headerDescription:
          'Entenda quais dados o AMARternar+ usa, onde eles ficam guardados e como você pode controlá-los.',
        updated: 'Política versão 2.0 · Atualizada em setembro de 2026',

        accountTitle: 'Dados da conta (nuvem)',
        accountDescription:
          'Ao criar uma conta, algumas informações ficam guardadas no Supabase, o serviço que usamos para o login:',
        accountItems: [
          'Nome informado no cadastro',
          'Endereço de e-mail',
          'Senha, guardada de forma criptografada (ninguém consegue lê-la, nem nós)',
          'Data de criação da conta e do último acesso',
        ],
        accountYourEmail: 'E-mail da conta',
        guestNotice:
          'Você está usando o modo visitante. Nenhum dado seu é guardado na nuvem.',

        deviceTitle: 'Dados guardados só neste aparelho',
        deviceDescription:
          'As informações abaixo ficam apenas neste navegador e não são enviadas para nossos servidores:',

        transferTitle: 'Transferência internacional de dados',
        transferDescription:
          'Os dados da conta são armazenados pelo Supabase em servidores localizados no Canadá. Essa transferência é necessária para o funcionamento do login, e o Supabase adota medidas de segurança como criptografia e controle de acesso.',

        emailTitle: 'Como usamos seu e-mail',
        emailItems: [
          'Para confirmar que o e-mail pertence a você',
          'Para enviar o link de redefinição de senha, quando você pedir',
        ],
        emailNoMarketing:
          'Não enviamos propaganda e não compartilhamos seu e-mail com terceiros.',

        purposeTitle: 'Para que usamos esses dados',

        rightsTitle: 'Seus direitos (LGPD)',
        rightsDescription:
          'Você pode pedir acesso, correção ou exclusão dos dados da sua conta a qualquer momento pelo e-mail:',
        rightsResponse: 'Responderemos em até 15 dias.',

        consentTitle: 'Situação do consentimento',
        consentDate: 'Data do aceite',
        acceptedVersion: 'Versão aceita',

        deleteTitle: 'Apagar dados',
        deleteDescription:
          'O botão abaixo apaga tudo o que está guardado neste aparelho (perfil, rotina, tarefas, ordenhas e preferências) e encerra sua sessão.',
        deleteCloudNotice:
          'Para apagar também sua conta na nuvem (nome e e-mail), envie um pedido para o e-mail acima.',
      };

  const acceptedAt = profile?.privacyConsent?.acceptedAt;

  const acceptedDate = acceptedAt
    ? new Date(acceptedAt).toLocaleDateString(isEnglish ? 'en-US' : 'pt-BR')
    : t('privacyNoConsentDate');

  function handleDelete() {
    const confirmed = window.confirm(t('privacyDeleteConfirmation'));

    if (!confirmed) return;

    onDeleteData?.();
  }

  const cardClass = 'rounded-2xl bg-white p-5 shadow-sm';
  const titleClass = 'text-lg font-bold text-gray-800';
  const bodyClass = 'mt-3 text-sm leading-6 text-gray-600';
  const listClass = 'mt-3 space-y-2 text-sm leading-6 text-gray-600';

  return (
    <div className="mx-auto max-w-2xl space-y-5 p-4 pb-28">
      <section className="rounded-3xl bg-gradient-to-r from-[#B8A9C9] to-[#DCD0FF] p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <div>
            <p className="text-sm text-white/80">{text.eyebrow}</p>
            <h1 className="text-2xl font-bold">{text.title}</h1>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-white/90">{text.headerDescription}</p>
        <p className="mt-2 text-xs text-white/80">{text.updated}</p>
      </section>

      <section className={cardClass}>
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-[#8B7BA8]" />
          <h2 className={titleClass}>{text.accountTitle}</h2>
        </div>

        {hasCloudAccount ? (
          <>
            <p className={bodyClass}>{text.accountDescription}</p>

            <ul className={listClass}>
              {text.accountItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <p className="mt-4 rounded-xl bg-[#F5F0FF] px-4 py-3 text-sm text-gray-700">
              {text.accountYourEmail}: <strong className="break-all">{user.email}</strong>
            </p>
          </>
        ) : (
          <p className={bodyClass}>{text.guestNotice}</p>
        )}
      </section>

      <section className={cardClass}>
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-[#8B7BA8]" />
          <h2 className={titleClass}>{text.deviceTitle}</h2>
        </div>

        <p className={bodyClass}>{text.deviceDescription}</p>

        <ul className={listClass}>
          <li>• {t('privacyDataProfile')}</li>
          <li>• {t('privacyDataRoutine')}</li>
          <li>• {t('privacyDataTasks')}</li>
          <li>• {t('privacyDataPumping')}</li>
          <li>• {t('privacyDataPreferences')}</li>
        </ul>
      </section>

      {hasCloudAccount && (
        <section className={cardClass}>
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-[#8B7BA8]" />
            <h2 className={titleClass}>{text.transferTitle}</h2>
          </div>

          <p className={bodyClass}>{text.transferDescription}</p>
        </section>
      )}

      <section className={cardClass}>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-[#8B7BA8]" />
          <h2 className={titleClass}>{text.emailTitle}</h2>
        </div>

        <ul className={listClass}>
          {text.emailItems.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>

        <p className="mt-3 text-sm font-medium leading-6 text-gray-700">
          {text.emailNoMarketing}
        </p>
      </section>

      <section className={cardClass}>
        <h2 className={titleClass}>{text.purposeTitle}</h2>

        <ul className={listClass}>
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

      <section className={cardClass}>
        <div className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-[#8B7BA8]" />
          <h2 className={titleClass}>{text.rightsTitle}</h2>
        </div>

        <p className={bodyClass}>{text.rightsDescription}</p>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-3 inline-flex items-center gap-2 break-all rounded-xl bg-[#F5F0FF] px-4 py-3 text-sm font-semibold text-[#6F5E94] hover:underline"
        >
          <Mail className="h-4 w-4 shrink-0" />
          {CONTACT_EMAIL}
        </a>

        <p className="mt-3 text-xs text-gray-500">{text.rightsResponse}</p>
      </section>

      <section className={cardClass}>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#8B7BA8]" />
          <h2 className={titleClass}>{text.consentTitle}</h2>
        </div>

        <p className={bodyClass}>
          {profile?.privacyConsent?.accepted
            ? t('privacyConsentAccepted')
            : t('privacyConsentNotAccepted')}
        </p>

        <p className="mt-2 text-xs text-gray-500">
          {text.consentDate}: {acceptedDate}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {text.acceptedVersion}: {profile?.privacyConsent?.policyVersion || '1.0'}
          {' · '}
          {isEnglish ? 'Current' : 'Atual'}: {POLICY_VERSION}
        </p>
      </section>

      <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <div className="flex items-start gap-3">
          <Trash2 className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <h2 className="text-base font-bold text-red-800">{text.deleteTitle}</h2>

            <p className="mt-1 text-sm leading-6 text-red-700">{text.deleteDescription}</p>

            {hasCloudAccount && (
              <p className="mt-2 text-sm leading-6 text-red-700">{text.deleteCloudNotice}</p>
            )}
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
