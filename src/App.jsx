import { useEffect, useState } from 'react';

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  ClipboardList,
  Droplets,
  Globe,
  Heart,
  Home,
  LayoutGrid,
  Lightbulb,
  LogOut,
  MapPin,
  Scale,
  User,
} from 'lucide-react';

import { useStore } from './store';
import { supabase } from './supabaseClient';

import Biblioteca from './components/Biblioteca';
import CuidadosInteligentes from './components/CuidadosInteligentes';
import Dashboard from './components/Dashboard';
import Direitos from './components/Direitos';
import Emergencias from './components/Emergencias';
import Login from './components/Login';
import MapaLocais from './components/MapaLocais';
import Onboarding from './components/Onboarding';
import Ordenha from './components/Ordenha';
import Perfil from './components/Perfil';
import Privacidade from './components/Privacidade';
import RetornoTrabalho from './components/RetornoTrabalho';
import Tarefas from './components/Tarefas';

function Suggestions({ profile, onContinue, onNavigate, language }) {
  const routine = profile?.routine || {};
  const isEnglish = language === 'en';

  const text = isEnglish
    ? {
        routine: 'PERSONALIZED ROUTINE',
        title: 'Suggestions for you',
        introduction:
          'Based on your routine, we selected a few paths to help you start using AMARternar+.',
        pumpingTitle: 'Start with the Pumping Diary',
        pumpingDescription:
          'Record times, duration, and quantity to follow your routine in a practical way.',
        tasksTitle: 'Organize your tasks',
        tasksDescription:
          'Use the tasks area to create reminders and keep track of important daily activities.',
        workTitle: 'Prepare your return to work',
        workDescription:
          'Check the checklist, guidance, and information that can help you organize this phase.',
        scheduleTitle: 'Plan your routine for different schedules',
        scheduleDescription:
          'Organize tasks and pumping records according to the times that work best for you.',
        daycareTitle: 'Organize the routine with daycare',
        daycareDescription:
          'Use tasks to remember items, schedules, and important information for the person caring for the baby.',
        focusWorkTitle: 'Your focus is returning to work',
        focusWorkDescription:
          'Start with the return-to-work guide and adapt the checklist to your reality.',
        rightsTitle: 'Learn about your rights as a nursing mother',
        rightsDescription:
          'Access guidance about work rights, benefits, and priority service.',
        mapTitle: 'Find support near you',
        mapDescription:
          'Use the map to locate hospitals, health centers, milk banks, and other support services.',
        careTitle: 'Take a moment for your care',
        careDescription:
          'See checklists and organization suggestions to support you and your baby.',
        panelButton: 'Go to my dashboard',
        footer:
          'You can change your routine and update these suggestions whenever you want in your profile.',
      }
    : {
        routine: 'ROTINA PERSONALIZADA',
        title: 'Sugestões para você',
        introduction:
          'Com base nas informações da sua rotina, separamos alguns caminhos para você começar a usar o AMARternar+.',
        pumpingTitle: 'Comece pelo Diário de Ordenha',
        pumpingDescription:
          'Registre horários, duração e quantidade para acompanhar sua rotina de forma prática.',
        tasksTitle: 'Organize suas tarefas',
        tasksDescription:
          'Use a área de tarefas para criar lembretes e acompanhar as atividades importantes do dia.',
        workTitle: 'Prepare seu retorno ao trabalho',
        workDescription:
          'Confira o checklist, orientações e informações que podem ajudar na organização dessa fase.',
        scheduleTitle: 'Planeje sua rotina para horários diferentes',
        scheduleDescription:
          'Organize tarefas e registros de ordenha de acordo com os horários que funcionam melhor para você.',
        daycareTitle: 'Organize a rotina com a creche',
        daycareDescription:
          'Use as tarefas para lembrar itens, horários e informações importantes para quem cuida do bebê.',
        focusWorkTitle: 'Seu foco é o retorno ao trabalho',
        focusWorkDescription:
          'Comece pelo guia de retorno ao trabalho e adapte o checklist à sua realidade.',
        rightsTitle: 'Conheça seus direitos como lactante',
        rightsDescription:
          'Acesse orientações sobre direitos trabalhistas, benefícios e atendimento prioritário.',
        mapTitle: 'Encontre apoio perto de você',
        mapDescription:
          'Use o mapa para localizar hospitais, UBS, bancos de leite e outros serviços de apoio.',
        careTitle: 'Reserve um momento para seus cuidados',
        careDescription:
          'Veja checklists e sugestões de organização para apoiar você e o bebê.',
        panelButton: 'Ir para meu painel',
        footer:
          'Você poderá alterar sua rotina e atualizar estas sugestões quando quiser no seu perfil.',
      };

  const suggestions = [
    {
      id: 'diario',
      icon: Droplets,
      title: text.pumpingTitle,
      description: text.pumpingDescription,
      tab: 'ordenha',
      color: 'bg-[#E8F6FF] text-[#62A6C8]',
    },
    {
      id: 'tarefas',
      icon: ClipboardList,
      title: text.tasksTitle,
      description: text.tasksDescription,
      tab: 'tarefas',
      color: 'bg-[#FFF3E8] text-[#EAA76A]',
    },
  ];

  if (routine.workType === 'clt') {
    suggestions.unshift({
      id: 'retorno',
      icon: Briefcase,
      title: text.workTitle,
      description: text.workDescription,
      tab: 'retorno',
      color: 'bg-[#F0ECFF] text-[#8D7AB8]',
    });
  }

  if (routine.schedule === 'noite' || routine.schedule === '12x36') {
    suggestions.push({
      id: 'turno',
      icon: Calendar,
      title: text.scheduleTitle,
      description: text.scheduleDescription,
      tab: 'tarefas',
      color: 'bg-[#FCEEF5] text-[#C8789E]',
    });
  }

  if (routine.babyCare === 'creche') {
    suggestions.push({
      id: 'creche',
      icon: Calendar,
      title: text.daycareTitle,
      description: text.daycareDescription,
      tab: 'tarefas',
      color: 'bg-[#EEF8EF] text-[#6B9E73]',
    });
  }

  if (routine.priority === 'retorno') {
    suggestions.unshift({
      id: 'prioridade-retorno',
      icon: Briefcase,
      title: text.focusWorkTitle,
      description: text.focusWorkDescription,
      tab: 'retorno',
      color: 'bg-[#F0ECFF] text-[#8D7AB8]',
    });
  }

  if (routine.priority === 'direitos') {
    suggestions.unshift({
      id: 'prioridade-direitos',
      icon: Scale,
      title: text.rightsTitle,
      description: text.rightsDescription,
      tab: 'direitos',
      color: 'bg-[#FFF6DB] text-[#B79036]',
    });
  }

  if (routine.priority === 'mapa') {
    suggestions.unshift({
      id: 'prioridade-mapa',
      icon: MapPin,
      title: text.mapTitle,
      description: text.mapDescription,
      tab: 'mapa',
      color: 'bg-[#EEF8EF] text-[#6B9E73]',
    });
  }

  if (routine.priority === 'cuidados') {
    suggestions.unshift({
      id: 'prioridade-cuidados',
      icon: Heart,
      title: text.careTitle,
      description: text.careDescription,
      tab: 'cuidados',
      color: 'bg-[#FCEEF5] text-[#C8789E]',
    });
  }

  function handleSuggestionClick(tab) {
    onNavigate(tab);
    onContinue(tab);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FFF5EE] to-[#F5F0FF] px-4 py-8">
      <section className="mx-auto max-w-md">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1E8]">
            <Lightbulb className="h-7 w-7 text-[#EAA76A]" />
          </div>

          <p className="text-sm font-semibold text-[#B8A9C9]">
            {text.routine}
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-800">
            {`${text.title}${
              profile?.displayName ? `, ${profile.displayName}` : ''
            }`}
          </h1>

          <p className="mt-3 leading-6 text-slate-600">
            {text.introduction}
          </p>

          <div className="mt-6 space-y-3">
            {suggestions.map((suggestion) => {
              const Icon = suggestion.icon;

              return (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion.tab)}
                  className="flex w-full items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-[#E6E6FA] hover:bg-[#FCFBFF]"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${suggestion.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="flex-1">
                    <span className="block font-semibold text-slate-800">
                      {suggestion.title}
                    </span>

                    <span className="mt-1 block text-sm leading-5 text-slate-500">
                      {suggestion.description}
                    </span>
                  </span>

                  <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-[#B8A9C9]" />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onContinue('home')}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#B8A9C9] px-4 py-4 font-semibold text-white transition hover:bg-[#A194B4]"
          >
            {text.panelButton}
            <ArrowRight className="h-5 w-5" />
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            {text.footer}
          </p>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const {
    user,
    isLoggedIn,
    logout,
    language,
    toggleLanguage,
    t,
    saveRoutine,
    finishSuggestions,
  } = useStore();

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

  const showSuggestions = Boolean(user?.onboarding?.showSuggestions);

  useEffect(() => {
    if (showSuggestions) {
      setShowOnboarding(false);
    }
  }, [showSuggestions]);

  function handleProfileSave(updatedProfile) {
    const profileToSave = {
      ...profile,
      ...updatedProfile,

      profile: {
        ...profile?.profile,
        ...updatedProfile?.profile,
      },

      routine: {
        ...profile?.routine,
        ...updatedProfile?.routine,
      },

      onboarding: {
        ...profile?.onboarding,
        ...updatedProfile?.onboarding,
      },

      privacyConsent: {
        ...profile?.privacyConsent,
        ...updatedProfile?.privacyConsent,
      },
    };

    try {
      localStorage.setItem(
        'amarternar_profile',
        JSON.stringify(profileToSave)
      );
    } catch (error) {
      // Mantém os dados no estado mesmo se o navegador bloquear o localStorage.
    }

    setProfile(profileToSave);
  }

  function openProfile() {
    setActiveTab('perfil');
  }

  async function signOutFromSupabase() {
    try {
      if (supabase) await supabase.auth.signOut();
    } catch (error) {
      // Continua a limpeza local mesmo se houver falha de conexão.
    }
  }

  async function handleLogout() {
    await signOutFromSupabase();

    logout();

    localStorage.removeItem('amarternar_profile');
    localStorage.removeItem('amarternar-storage');

    setProfile(null);
    setShowOnboarding(true);
    setActiveTab('home');

    window.location.reload();
  }

  function openRoutineEditor() {
    setShowOnboarding(true);
  }

  function handleOnboardingComplete(onboardingData) {
    const updatedProfile = {
      ...profile,
      ...onboardingData,

      routine: {
        ...profile?.routine,
        ...onboardingData?.routine,
      },

      onboarding: {
        ...profile?.onboarding,
        ...onboardingData?.onboarding,
      },

      privacyConsent: {
        ...profile?.privacyConsent,
        ...onboardingData?.privacyConsent,
      },
    };

    handleProfileSave(updatedProfile);
    saveRoutine(updatedProfile.routine);
    setShowOnboarding(false);
    setActiveTab('home');
  }

  function handleFinishSuggestions(tab = 'home') {
    finishSuggestions();
    setActiveTab(tab);
  }

  function handleSuggestionsNavigate(tab) {
    setActiveTab(tab);
  }

  async function handleDeleteAllData() {
    await signOutFromSupabase();

    localStorage.removeItem('amarternar-storage');
    localStorage.removeItem('amarternar_profile');

    window.location.reload();
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  if (showOnboarding) {
    return (
      <Onboarding
        profile={profile}
        onComplete={handleOnboardingComplete}
        onCancel={() => setShowOnboarding(false)}
      />
    );
  }

  if (showSuggestions) {
    return (
      <Suggestions
        profile={profile}
        onContinue={handleFinishSuggestions}
        onNavigate={handleSuggestionsNavigate}
        language={language}
      />
    );
  }

  const tabs = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'mapa', icon: MapPin, label: t('map') },
    { id: 'tarefas', icon: LayoutGrid, label: t('tasks') },
    { id: 'biblioteca', icon: BookOpen, label: t('library') },
    { id: 'direitos', icon: Scale, label: t('rights') },
    { id: 'ordenha', icon: Droplets, label: t('diary') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Dashboard
            profile={profile}
            onNavigate={setActiveTab}
            onEmergencia={() => setShowEmergencias(true)}
            onEditProfile={openRoutineEditor}
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

      case 'perfil':
        return (
          <Perfil
            profile={profile}
            onSave={handleProfileSave}
            onEditRoutine={openRoutineEditor}
            onNavigate={setActiveTab}
          />
        );

      case 'privacidade':
        return (
          <Privacidade
            profile={profile}
            onBack={() => setActiveTab('perfil')}
            onDeleteData={handleDeleteAllData}
          />
        );

      default:
        return (
          <Dashboard
            profile={profile}
            onNavigate={setActiveTab}
            onEmergencia={() => setShowEmergencias(true)}
            onEditProfile={openRoutineEditor}
          />
        );
    }
  };

  const displayName = profile?.displayName || user?.name || t('guest');

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#FFF5EE] to-[#F5F0FF]">
      <header className="sticky top-0 z-40 flex items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Heart className="h-8 w-8 fill-[#FFCBA4] text-[#FFCBA4]" />
            <Droplets className="absolute -bottom-1 -right-1 h-4 w-4 text-[#DCD0FF]" />
          </div>

          <span className="bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] bg-clip-text text-xl font-bold text-transparent">
            AMARternar+
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full p-2 transition-colors hover:bg-[#E6E6FA]/50"
            title={language === 'pt' ? 'English' : 'Português'}
            aria-label={
              language === 'pt'
                ? 'Alterar idioma para inglês'
                : 'Alterar idioma para português'
            }
          >
            <Globe className="h-5 w-5 text-[#B8A9C9]" />
          </button>

          <button
            type="button"
            onClick={openProfile}
            className="flex max-w-[150px] items-center gap-2 rounded-full bg-[#E6E6FA]/30 px-3 py-1.5 transition-colors hover:bg-[#E6E6FA]/60"
            aria-label="Abrir meu perfil"
            title="Abrir meu perfil"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              {profile?.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : profile?.avatar ? (
                <span className="text-sm" aria-hidden="true">
                  {profile.avatar}
                </span>
              ) : (
                <User className="h-4 w-4 text-[#B8A9C9]" />
              )}
            </span>

            <span className="truncate text-sm font-medium text-gray-700">
              {displayName}
            </span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full p-2 transition-colors hover:bg-red-50"
            title={t('logout')}
            aria-label={t('logout')}
          >
            <LogOut className="h-5 w-5 text-red-400" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto pb-20">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-around">
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
                className={`flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all duration-200 ${
                  isActive
                    ? 'scale-105 bg-gradient-to-br from-[#FFDAB9]/40 to-[#E6E6FA]/40 text-[#B8A9C9]'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowEmergencias(false)}
          role="presentation"
        >
          <div
            className="max-h-[80vh] w-full max-w-md overflow-auto rounded-2xl bg-white"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t('emergencyNumbers')}
          >
            <Emergencias onClose={() => setShowEmergencias(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
