import { useEffect, useRef, useState } from 'react';

import {
  Heart,
  Droplets,
  Mail,
  Lock,
  User,
  Baby,
  Sparkles,
  MailCheck,
  ArrowLeft,
  KeyRound,
} from 'lucide-react';

import { useStore } from '../store';
import { supabase, isPasswordRecovery, isExpiredAuthLink } from '../supabaseClient';

const SITE_URL = 'https://amarternar-plus.vercel.app';

const EXAMPLE_EMAIL_PT = 'nome' + '@' + 'exemplo.com';
const EXAMPLE_EMAIL_EN = 'name' + '@' + 'example.com';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function Login() {
  const { login, t, language } = useStore();
  const isEnglish = language === 'en';

  const text = isEnglish
    ? {
        invalidEmail: `Enter a valid email, like ${EXAMPLE_EMAIL_EN}.`,
        shortPassword: 'Your password must have at least 6 characters.',
        samePassword: 'The new password must be different from the previous one.',
        passwordsDontMatch: 'The passwords do not match.',
        wrongCredentials: 'Incorrect email or password.',
        notConfirmed: 'Confirm your email before signing in.',
        alreadyRegistered: 'This email already has an account. Sign in instead.',
        rateLimit: 'Too many attempts. Please wait a few minutes and try again.',
        genericError: 'Something went wrong. Please try again.',
        unavailable: 'Sign-in is temporarily unavailable. You can enter as a guest.',
        expiredLink: 'This link has expired or was already used. Request a new one.',
        loading: 'Please wait...',
        confirmTitle: 'Confirm your email',
        confirmText:
          'We sent a confirmation link to your email. Open the message and click the link to activate your account.',
        spamHint: "Can't find it? Check your spam or junk folder.",
        resend: 'Resend confirmation email',
        resent: 'Email sent again. Check your inbox.',
        back: 'Back to sign in',
        forgotLink: 'Forgot my password',
        forgotTitle: 'Reset your password',
        forgotText: 'Enter your account email. We will send you a link to create a new password.',
        forgotButton: 'Send reset link',
        forgotSent:
          'If there is an account with this email, you will receive a link in a few minutes. Check your spam folder too.',
        resetTitle: 'Create a new password',
        resetText: 'Choose a new password with at least 6 characters.',
        newPassword: 'New password',
        confirmPassword: 'Confirm new password',
        resetButton: 'Save new password',
        resetDone: 'Password updated. Signing you in...',
      }
    : {
        invalidEmail: `Digite um e-mail válido, como ${EXAMPLE_EMAIL_PT}.`,
        shortPassword: 'A senha precisa ter pelo menos 6 caracteres.',
        samePassword: 'A nova senha precisa ser diferente da anterior.',
        passwordsDontMatch: 'As senhas não são iguais.',
        wrongCredentials: 'E-mail ou senha incorretos.',
        notConfirmed: 'Confirme seu e-mail antes de entrar.',
        alreadyRegistered: 'Este e-mail já tem uma conta. Faça login.',
        rateLimit: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
        genericError: 'Algo deu errado. Tente novamente.',
        unavailable: 'O login está indisponível no momento. Você pode entrar como visitante.',
        expiredLink: 'Este link expirou ou já foi usado. Solicite um novo.',
        loading: 'Aguarde...',
        confirmTitle: 'Confirme seu e-mail',
        confirmText:
          'Enviamos um link de confirmação para seu e-mail. Abra a mensagem e clique no link para ativar sua conta.',
        spamHint: 'Se não encontrar, confira a caixa de spam ou lixo eletrônico.',
        resend: 'Reenviar e-mail de confirmação',
        resent: 'E-mail reenviado. Confira sua caixa de entrada.',
        back: 'Voltar para o login',
        forgotLink: 'Esqueci minha senha',
        forgotTitle: 'Redefinir senha',
        forgotText: 'Informe o e-mail da sua conta. Enviaremos um link para você criar uma nova senha.',
        forgotButton: 'Enviar link de redefinição',
        forgotSent:
          'Se houver uma conta com este e-mail, você receberá um link em alguns minutos. Confira também o spam.',
        resetTitle: 'Crie uma nova senha',
        resetText: 'Escolha uma nova senha com pelo menos 6 caracteres.',
        newPassword: 'Nova senha',
        confirmPassword: 'Confirme a nova senha',
        resetButton: 'Salvar nova senha',
        resetDone: 'Senha alterada. Entrando...',
      };

  // Telas possíveis: 'login', 'signup', 'confirm', 'forgot', 'reset'
  const [mode, setMode] = useState(isPasswordRecovery ? 'reset' : 'login');
  const recoveryRef = useRef(isPasswordRecovery);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(isExpiredAuthLink ? text.expiredLink : '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function goTo(nextMode) {
    setMode(nextMode);
    setError('');
    setMessage('');
  }

  // Entra no app quando existe uma sessão com e-mail confirmado.
  function enterWithSupabaseUser(supabaseUser) {
    if (recoveryRef.current) return;
    if (!supabaseUser?.email_confirmed_at) return;

    login({
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.name || supabaseUser.email.split('@')[0],
      email: supabaseUser.email,
      emailVerified: true,
    });
  }

  useEffect(() => {
    if (!supabase) return undefined;

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) enterWithSupabaseUser(data.session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        recoveryRef.current = true;
        setMode('reset');
        return;
      }

      if (session?.user) enterWithSupabaseUser(session.user);
    });

    return () => listener.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function translateError(supabaseError) {
    const msg = supabaseError?.message?.toLowerCase() || '';

    if (msg.includes('invalid login credentials')) return text.wrongCredentials;
    if (msg.includes('email not confirmed')) return text.notConfirmed;
    if (msg.includes('already registered')) return text.alreadyRegistered;
    if (msg.includes('rate limit') || msg.includes('too many')) return text.rateLimit;
    if (msg.includes('different')) return text.samePassword;
    if (msg.includes('expired') || msg.includes('session')) return text.expiredLink;
    if (msg.includes('password')) return text.shortPassword;

    return text.genericError;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    const isSignup = mode === 'signup';

    if (isSignup && !formData.name.trim()) {
      setError(t('enterYourName'));
      return;
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      setError(t('fillAllFields'));
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError(text.invalidEmail);
      return;
    }

    if (formData.password.length < 6) {
      setError(text.shortPassword);
      return;
    }

    if (!supabase) {
      setError(text.unavailable);
      return;
    }

    setLoading(true);

    try {
      const email = formData.email.trim().toLowerCase();

      if (isSignup) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password: formData.password,
          options: {
            emailRedirectTo: SITE_URL,
            data: { name: formData.name.trim() },
          },
        });

        if (signUpError) {
          setError(translateError(signUpError));
          return;
        }

        if (data.user && data.user.identities?.length === 0) {
          setError(text.alreadyRegistered);
          return;
        }

        setMode('confirm');
        return;
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: formData.password,
      });

      if (signInError) {
        if (signInError.message?.toLowerCase().includes('email not confirmed')) {
          setMode('confirm');
        }
        setError(translateError(signInError));
        return;
      }

      enterWithSupabaseUser(data.user);
    } catch (unexpectedError) {
      setError(text.genericError);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError('');
    setMessage('');

    if (!supabase) return;

    setLoading(true);

    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: formData.email.trim().toLowerCase(),
      options: { emailRedirectTo: SITE_URL },
    });

    setLoading(false);

    if (resendError) {
      setError(translateError(resendError));
      return;
    }

    setMessage(text.resent);
  }

  async function handleForgotPassword(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!isValidEmail(formData.email)) {
      setError(text.invalidEmail);
      return;
    }

    if (!supabase) {
      setError(text.unavailable);
      return;
    }

    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      formData.email.trim().toLowerCase(),
      { redirectTo: SITE_URL }
    );

    setLoading(false);

    if (resetError) {
      setError(translateError(resetError));
      return;
    }

    // Mesma mensagem existindo ou não a conta, para não revelar quais e-mails estão cadastrados.
    setMessage(text.forgotSent);
  }

  async function handleResetPassword(event) {
    event.preventDefault();
    setError('');
    setMessage('');

    if (formData.password.length < 6) {
      setError(text.shortPassword);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(text.passwordsDontMatch);
      return;
    }

    if (!supabase) {
      setError(text.unavailable);
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (updateError) {
      setLoading(false);
      setError(translateError(updateError));
      return;
    }

    setMessage(text.resetDone);

    // Recarrega sem o link de recuperação; a sessão já está ativa e o app entra sozinho.
    setTimeout(() => {
      window.location.replace(SITE_URL);
    }, 1500);
  }

  function handleGuest() {
    login({
      name: t('guest'),
      email: '',
    });
  }

  const inputClass =
    'w-full rounded-xl border border-[#E6E6FA] bg-[#F5F0FF]/50 py-3 pl-11 pr-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]';

  const primaryButtonClass =
    'w-full rounded-xl bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg disabled:opacity-60';

  const backButton = (
    <button
      type="button"
      onClick={() => goTo('login')}
      className="mt-3 flex w-full items-center justify-center gap-2 py-2 text-sm font-semibold text-[#B8A9C9] hover:underline"
    >
      <ArrowLeft className="h-4 w-4" />
      {text.back}
    </button>
  );

  const feedback = (
    <>
      {error && (
        <p className="text-center text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className="text-center text-sm text-green-600" role="status">
          {message}
        </p>
      )}
    </>
  );

  function renderCard() {
    if (mode === 'confirm') {
      return (
        <div className="text-center" aria-live="polite">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0ECFF]">
            <MailCheck className="h-7 w-7 text-[#8D7AB8]" />
          </div>

          <h2 className="text-xl font-semibold text-gray-700">{text.confirmTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">{text.confirmText}</p>
          <p className="mt-2 text-sm font-medium text-gray-700">{formData.email}</p>
          <p className="mt-3 text-xs leading-5 text-gray-500">{text.spamHint}</p>

          <div className="mt-4 space-y-2">{feedback}</div>

          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className={`mt-6 ${primaryButtonClass}`}
          >
            {loading ? text.loading : text.resend}
          </button>

          {backButton}
        </div>
      );
    }

    if (mode === 'forgot') {
      return (
        <div>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0ECFF]">
            <KeyRound className="h-7 w-7 text-[#8D7AB8]" />
          </div>

          <h2 className="text-center text-xl font-semibold text-gray-700">{text.forgotTitle}</h2>
          <p className="mb-6 mt-3 text-center text-sm leading-6 text-gray-600">{text.forgotText}</p>

          <form onSubmit={handleForgotPassword} className="space-y-4" noValidate>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8A9C9]" />
              <input
                type="email"
                autoComplete="email"
                aria-label={t('email')}
                placeholder={t('email')}
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className={inputClass}
              />
            </div>

            {feedback}

            <button type="submit" disabled={loading} className={primaryButtonClass}>
              {loading ? text.loading : text.forgotButton}
            </button>
          </form>

          {backButton}
        </div>
      );
    }

    if (mode === 'reset') {
      return (
        <div>
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0ECFF]">
            <KeyRound className="h-7 w-7 text-[#8D7AB8]" />
          </div>

          <h2 className="text-center text-xl font-semibold text-gray-700">{text.resetTitle}</h2>
          <p className="mb-6 mt-3 text-center text-sm leading-6 text-gray-600">{text.resetText}</p>

          <form onSubmit={handleResetPassword} className="space-y-4" noValidate>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8A9C9]" />
              <input
                type="password"
                autoComplete="new-password"
                aria-label={text.newPassword}
                placeholder={text.newPassword}
                value={formData.password}
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8A9C9]" />
              <input
                type="password"
                autoComplete="new-password"
                aria-label={text.confirmPassword}
                placeholder={text.confirmPassword}
                value={formData.confirmPassword}
                onChange={(event) =>
                  setFormData({ ...formData, confirmPassword: event.target.value })
                }
                className={inputClass}
              />
            </div>

            {feedback}

            <button type="submit" disabled={loading} className={primaryButtonClass}>
              {loading ? text.loading : text.resetButton}
            </button>
          </form>
        </div>
      );
    }

    const isSignup = mode === 'signup';

    return (
      <>
        <h2 className="mb-6 text-center text-xl font-semibold text-gray-700">
          {isSignup ? t('signup') : t('login')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8A9C9]" />
              <input
                type="text"
                autoComplete="name"
                aria-label={t('name')}
                placeholder={t('name')}
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className={inputClass}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8A9C9]" />
            <input
              type="email"
              autoComplete="email"
              aria-label={t('email')}
              placeholder={t('email')}
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              className={inputClass}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#B8A9C9]" />
            <input
              type="password"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              aria-label={t('password')}
              placeholder={t('password')}
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
              className={inputClass}
            />
          </div>

          {!isSignup && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => goTo('forgot')}
                className="text-sm font-medium text-[#8D7AB8] hover:underline"
              >
                {text.forgotLink}
              </button>
            </div>
          )}

          {feedback}

          <button
            type="submit"
            disabled={loading}
            className={`${primaryButtonClass} hover:scale-[1.02]`}
          >
            {loading ? text.loading : isSignup ? t('createAccount') : t('login')}
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
          {isSignup ? t('alreadyHaveAccount') : t('dontHaveAccount')}{' '}
          <button
            type="button"
            onClick={() => goTo(isSignup ? 'login' : 'signup')}
            className="font-semibold text-[#B8A9C9] hover:underline"
          >
            {isSignup ? t('login') : t('signup')}
          </button>
        </p>
      </>
    );
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

        <p className="mt-2 text-sm text-gray-500">{t('breastfeedingSupport')}</p>
      </div>

      <div className="w-full max-w-sm rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
        {renderCard()}
      </div>
    </div>
  );
}
