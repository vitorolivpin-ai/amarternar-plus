import { useState } from 'react';

import {
  Heart,
  Home,
  MapPin,
  LayoutGrid,
  BookOpen,
  Droplets,
  LogOut,
  User,
  Globe,
  Scale,
} from 'lucide-react';

import { useStore } from './store';

import Dashboard from './components/Dashboard';
import MapaLocais from './components/MapaLocais';
import Tarefas from './components/Tarefas';
import Biblioteca from './components/Biblioteca';
import Ordenha from './components/Ordenha';
import Emergencias from './components/Emergencias';
import Login from './components/Login';
import Direitos from './components/Direitos';
import CuidadosInteligentes from './components/CuidadosInteligentes';
import RetornoTrabalho from './components/RetornoTrabalho';
import Onboarding from './components/Onboarding';

export default function App() {
  const { user, isLoggedIn, logout, language, toggleLanguage, t } = useStore();

  const [activeTab, setActiveTab] = useState('home');
  const [showEmergencias, setShowEmergencias] = useState(false);

  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem('amarternar_profile');

      return savedProfile ? JSON.parse(savedProfile) : null;
    } catch (error) {
      return null;
    }
  });

  const [showOnboarding, setShowOnboarding] = useState(() => {
    try {
      const savedProfile = localStorage.getItem('amarternar_profile');

      return !savedProfile;
    } catch (error) {
      return true;
    }
  });

  if (!isLoggedIn) {
    return <Login />;
  }

  if (showOnboarding) {
    return (
      <Onboarding
        onComplete={(newProfile) => {
          setProfile(newProfile);
          setShowOnboarding(false);
          setActiveTab('home');
        }}
      />
    );
  }

  const tabs = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'mapa', icon: MapPin, label: t('map') },
    { id: 'tarefas', icon: LayoutGrid, label: 'Tarefas' },
    { id: 'biblioteca', icon: BookOpen, label: t('library') },
    { id: 'direitos', icon: Scale, label: t('rights') },
    { id: 'ordenha', icon: Droplets, label: 'Diário' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Dashboard
            profile={profile}
            onNavigate={setActiveTab}
            onEmergencia={() => setShowEmergencias(true)}
            onEditProfile={() => setShowOnboarding(true)}
          />
        );

      case 'mapa':
        return <MapaLocais />;

      case 'tarefas':
        return <Tarefas />;

      case 'biblioteca':
        return <Biblioteca />;

      case 'direitos':
        return <Direitos />;

      case 'ordenha':
        return <Ordenha />;

      case 'cuidados':
        return <CuidadosInteligentes />;

      case 'retorno':
        return <RetornoTrabalho onNavigate={setActiveTab} />;

      default:
        return (
          <Dashboard
            profile={profile}
            onNavigate={setActiveTab}
            onEmergencia={() => setShowEmergencias(true)}
            onEditProfile={() => setShowOnboarding(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5EE] to-[#F5F0FF] flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Heart className="w-8 h-8 text-[#FFCBA4] fill-[#FFCBA4]" />
            <Droplets className="w-4 h-4 text-[#DCD0FF] absolute -bottom-1 -right-1" />
          </div>

          <span className="text-xl font-bold bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] bg-clip-text text-transparent">
            AMARternar+
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-[#E6E6FA]/50 transition-colors"
            title={language === 'pt' ? 'English' : 'Português'}
            aria-label={
              language === 'pt'
                ? 'Alterar idioma para inglês'
                : 'Alterar idioma para português'
            }
          >
            <Globe className="w-5 h-5 text-[#B8A9C9]" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E6E6FA]/30 rounded-full">
            <User className="w-4 h-4 text-[#B8A9C9]" />

            <span className="text-sm text-gray-700 font-medium">
              {user?.name || t('guest')}
            </span>
          </div>

          <button
            type="button"
            onClick={logout}
            className="p-2 rounded-full hover:bg-red-50 transition-colors"
            title={t('logout')}
            aria-label={t('logout')}
          >
            <LogOut className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto pb-20">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-2 z-50">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[56px] ${
                  isActive
                    ? 'bg-gradient-to-br from-[#FFDAB9]/40 to-[#E6E6FA]/40 text-[#B8A9C9] scale-105'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-[#FFCBA4]' : ''
                  }`}
                />

                <span className="text-xs font-medium">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {showEmergencias && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowEmergencias(false)}
          role="presentation"
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-auto"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Emergências"
          >
            <Emergencias onClose={() => setShowEmergencias(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
