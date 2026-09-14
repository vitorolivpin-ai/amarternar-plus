import { useState } from 'react';
import { Heart, Droplets, Mail, Lock, User, Baby, Sparkles } from 'lucide-react';
import { useStore } from '../store';

export default function Login() {
  const { login, t } = useStore();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isSignup && !formData.name.trim()) {
      setError('Por favor, insira seu nome');
      return;
    }
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    login({ name: formData.name || formData.email.split('@')[0], email: formData.email });
  };

  const handleGuest = () => login({ name: 'Visitante', email: '' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5EE] via-[#FFDAB9]/20 to-[#E6E6FA]/30 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-[#FFDAB9] to-[#E6E6FA] rounded-full flex items-center justify-center shadow-lg">
            <Heart className="w-12 h-12 text-white fill-white" />
            <Droplets className="w-6 h-6 text-[#B8A9C9] absolute bottom-2 right-2" />
          </div>
          <Sparkles className="w-6 h-6 text-[#FFCBA4] absolute -top-1 -right-1 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] bg-clip-text text-transparent">AMARternar+</h1>
        <p className="text-gray-500 mt-2 text-sm">Apoio à amamentação com carinho</p>
      </div>
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">{isSignup ? t('signup') : t('login')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <User className="w-5 h-5 text-[#B8A9C9] absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder={t('name')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-11 pr-4 py-3 bg-[#F5F0FF]/50 border border-[#E6E6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DCD0FF] text-gray-700 placeholder-gray-400 text-base" />
            </div>
          )}
          <div className="relative">
            <Mail className="w-5 h-5 text-[#B8A9C9] absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="email" placeholder={t('email')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-11 pr-4 py-3 bg-[#F5F0FF]/50 border border-[#E6E6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DCD0FF] text-gray-700 placeholder-gray-400 text-base" />
          </div>
          <div className="relative">
            <Lock className="w-5 h-5 text-[#B8A9C9] absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="password" placeholder={t('password')} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-11 pr-4 py-3 bg-[#F5F0FF]/50 border border-[#E6E6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DCD0FF] text-gray-700 placeholder-gray-400 text-base" />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] text-base">{isSignup ? t('createAccount') : t('login')}</button>
        </form>
        <div className="mt-4">
          <button onClick={handleGuest} className="w-full py-3 bg-[#E6E6FA]/30 text-[#B8A9C9] font-medium rounded-xl hover:bg-[#E6E6FA]/50 transition-colors flex items-center justify-center gap-2 text-base"><Baby className="w-5 h-5" />{t('enterAsGuest')}</button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">{isSignup ? t('alreadyHaveAccount') : t('dontHaveAccount')}{' '}<button onClick={() => setIsSignup(!isSignup)} className="text-[#B8A9C9] font-semibold hover:underline">{isSignup ? t('login') : t('signup')}</button></p>
      </div>
    </div>
  );
}
