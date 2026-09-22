import { useState } from 'react';

import {
  Heart,
  Droplets,
  Mail,
  Lock,
  User,
  Baby,
  Sparkles,
} from 'lucide-react';

import { useStore } from '../store';

export default function Login() {
  const { login, t } = useStore();

  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (isSignup && !formData.name.trim()) {
      setError(t('enterYourName'));
      return;
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      setError(t('fillAllFields'));
      return;
    }

    login({
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
    });
  }

  function handleGuest() {
    login({
      name: t('guest'),
      email: '',
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FFF5EE] via-[#FFDAB9]/20 to-[#E6E6FA]/30 p-6">
      <div className="mb-8 text-center">
        <div className="relative mb-4 inline-block">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#FFDAB9] to-[#E6E6FA] shadow-lg">
            <Heart className="h-12 w-12 fill-white text-white" />

            <Droplets className="absolute bottom-2 right-2 h-6 w-6 text-[#B8A9C9]" />
          </div>

          <Sparkles className="absolute -right-1 -top-1 h-6 w-6 animate-pulse text-[#FFCBA4]" />
        </div>

        <h1 className="bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] bg-clip-text text-3xl font-bold text-transparent">
          AMARternar+
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {t('breastfeedingSupport')}
        </p>
      </div>

      <div className="w-full max-w-sm rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
        <h2 className="mb-6 text-center text-xl font-semibold text-gray-700">
          {isSignup ? t('signup') : t('login')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8A9C9]" />

              <input
                type="text"
                placeholder={t('name')}
                value={formData.name}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    name: event.target.value,
                  })
                }
                className="w-full rounded-xl border border-[#E6E6FA] bg-[#F5F0FF]/50 py-3 pl-11 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8A9C9]" />

            <input
              type="email"
              placeholder={t('email')}
              value={formData.email}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  email: event.target.value,
                })
              }
              className="w-full rounded-xl border border-[#E6E6FA] bg-[#F5F0FF]/50 py-3 pl-11 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8A9C9]" />

            <input
              type="password"
              placeholder={t('password')}
              value={formData.password}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  password: event.target.value,
                })
              }
              className="w-full rounded-xl border border-[#E6E6FA] bg-[#F5F0FF]/50 py-3 pl-11 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]"
            />
          </div>

          {error && (
            <p className="text-center text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            {isSignup ? t('createAccount') : t('login')}
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGuest}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E6E6FA]/30 py-3 text-base font-medium text-[#B8A9C9] transition-colors hover:bg-[#E6E6FA]/50"
          >
            <Baby className="h-5 w-5" />
            {t('enterAsGuest')}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          {isSignup
            ? t('alreadyHaveAccount')
            : t('dontHaveAccount')}{' '}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="font-semibold text-[#B8A9C9] hover:underline"
          >
            {isSignup ? t('login') : t('signup')}
          </button>
        </p>
      </div>
    </div>
  );
}
