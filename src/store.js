import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const translations = {
  pt: {
    home: 'Início',
    map: 'Mapa',
    library: 'Biblioteca',
    pumping: 'Ordenha',
    rights: 'Direitos',
    guest: 'Visitante',
    logout: 'Sair',
    welcome: 'Olá',
    lastPumping: 'Última ordenha',
    nextPumping: 'Próxima ordenha estimada',
    quickAccess: 'Acesso Rápido',
    emergencyBtn: 'Emergência',
    nearbyPlaces: 'Locais Próximos',
    hospitals: 'Hospitais',
    milkBanks: 'Bancos de Leite',
    healthCenters: 'UBS',
    viewOnMap: 'Ver no Mapa',
    categories: 'Categorias',
    allCategories: 'Todas',
    motherCare: 'Cuidados com a Mãe',
    babyCare: 'Cuidados com o Bebê',
    breastfeeding: 'Amamentação',
    mentalHealth: 'Saúde Mental',
    search: 'Buscar...',
    article: 'Artigo',
    video: 'Vídeo',
    toDo: 'A Fazer',
    inProgress: 'Em Andamento',
    done: 'Concluído',
    addTask: 'Adicionar Tarefa',
    taskTitle: 'Título da tarefa',
    taskCategory: 'Categoria',
    taskDate: 'Data',
    baby: 'Bebê',
    mother: 'Mãe',
    save: 'Salvar',
    cancel: 'Cancelar',
    pumpingRecord: 'Registro de Ordenha',
    dateTime: 'Data e Hora',
    duration: 'Duração (min)',
    quantity: 'Quantidade (ml)',
    whichBreast: 'Qual mama',
    left: 'Esquerda',
    right: 'Direita',
    both: 'Ambas',
    notes: 'Observações',
    register: 'Registrar',
    history: 'Histórico',
    frequency: 'Frequência (últimos 7 dias)',
    emergencyNumbers: 'Números de Emergência',
    call: 'Ligar',
    login: 'Entrar',
    signup: 'Cadastrar',
    email: 'Email',
    password: 'Senha',
    name: 'Nome',
    enterAsGuest: 'Entrar como Visitante',
    createAccount: 'Criar Conta',
    alreadyHaveAccount: 'Já tem conta?',
    dontHaveAccount: 'Não tem conta?',
    ago: 'atrás',
    in: 'em',
    hours: 'h',
    minutes: 'min',
    noRecords: 'Nenhum registro ainda',
    optional: 'opcional',
    rightsTitle: 'Direitos da Lactante',
    workRights: 'Direitos Trabalhistas (CLT)',
    priorityService: 'Atendimento Prioritário',
    inssRights: 'Benefícios INSS',
    publicNursing: 'Amamentação em Público',
    otherRights: 'Outros Direitos',
    faq: 'Perguntas Frequentes',
  },

  en: {
    home: 'Home',
    map: 'Map',
    library: 'Library',
    pumping: 'Pumping',
    rights: 'Rights',
    guest: 'Guest',
    logout: 'Logout',
    welcome: 'Hello',
    lastPumping: 'Last pumping',
    nextPumping: 'Next estimated pumping',
    quickAccess: 'Quick Access',
    emergencyBtn: 'Emergency',
    nearbyPlaces: 'Nearby Places',
    hospitals: 'Hospitals',
    milkBanks: 'Milk Banks',
    healthCenters: 'Health Centers',
    viewOnMap: 'View on Map',
    categories: 'Categories',
    allCategories: 'All',
    motherCare: 'Mother Care',
    babyCare: 'Baby Care',
    breastfeeding: 'Breastfeeding',
    mentalHealth: 'Mental Health',
    search: 'Search...',
    article: 'Article',
    video: 'Video',
    toDo: 'To Do',
    inProgress: 'In Progress',
    done: 'Done',
    addTask: 'Add Task',
    taskTitle: 'Task title',
    taskCategory: 'Category',
    taskDate: 'Date',
    baby: 'Baby',
    mother: 'Mother',
    save: 'Save',
    cancel: 'Cancel',
    pumpingRecord: 'Pumping Record',
    dateTime: 'Date and Time',
    duration: 'Duration (min)',
    quantity: 'Quantity (ml)',
    whichBreast: 'Which breast',
    left: 'Left',
    right: 'Right',
    both: 'Both',
    notes: 'Notes',
    register: 'Register',
    history: 'History',
    frequency: 'Frequency (last 7 days)',
    emergencyNumbers: 'Emergency Numbers',
    call: 'Call',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    enterAsGuest: 'Enter as Guest',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    ago: 'ago',
    in: 'in',
    hours: 'h',
    minutes: 'min',
    noRecords: 'No records yet',
    optional: 'optional',
    rightsTitle: 'Nursing Rights',
    workRights: 'Work Rights (Labor Law)',
    priorityService: 'Priority Service',
    inssRights: 'Social Security Benefits',
    publicNursing: 'Public Nursing',
    otherRights: 'Other Rights',
    faq: 'FAQ',
  },
};

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      language: 'pt',

      ordenhaRecords: [
        {
          id: 1,
          date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
          duration: 15,
          quantity: 120,
          breast: 'both',
          notes: '',
        },
        {
          id: 2,
          date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          duration: 12,
          quantity: 100,
          breast: 'left',
          notes: '',
        },
        {
          id: 3,
          date: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
          duration: 18,
          quantity: 140,
          breast: 'both',
          notes: 'Boa produção',
        },
      ],

      tasks: [
        {
          id: 1,
          title: 'Vacina BCG',
          category: 'baby',
          status: 'todo',
          date: '2024-02-15',
        },
        {
          id: 2,
          title: 'Consulta pediatra',
          category: 'baby',
          status: 'inProgress',
          date: '2024-02-10',
        },
        {
          id: 3,
          title: 'Amamentar 8x ao dia',
          category: 'breastfeeding',
          status: 'inProgress',
          date: '',
        },
        {
          id: 4,
          title: 'Tomar água',
          category: 'mother',
          status: 'todo',
          date: '',
        },
      ],

      login: (userData) =>
        set((state) => ({
          user: {
            ...state.user,
            ...userData,

            profile: {
              ...state.user?.profile,
              ...userData?.profile,
            },

            routine: {
              ...state.user?.routine,
              ...userData?.routine,
            },

            onboarding: {
              ...state.user?.onboarding,
              ...userData?.onboarding,
            },
          },

          isLoggedIn: true,
        })),

      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),

      updateProfile: (profileData) =>
        set((state) => ({
          user: {
            ...state.user,

            profile: {
              ...state.user?.profile,
              ...profileData,
            },
          },
        })),

      startRoutineChange: () =>
        set((state) => ({
          user: {
            ...state.user,

            routine: {
              workType: '',
              shift: '',
              babyInDaycare: '',
              priorities: [],
            },

            onboarding: {
              ...state.user?.onboarding,
              routineCompleted: false,
              showSuggestions: false,
            },
          },
        })),

      saveRoutine: (routineData) =>
        set((state) => ({
          user: {
            ...state.user,

            routine: {
              ...state.user?.routine,
              ...routineData,
            },

            onboarding: {
              ...state.user?.onboarding,
              routineCompleted: true,
              showSuggestions: true,
            },
          },
        })),

      finishSuggestions: () =>
        set((state) => ({
          user: {
            ...state.user,

            onboarding: {
              ...state.user?.onboarding,
              showSuggestions: false,
            },
          },
        })),

      toggleLanguage: () =>
        set((state) => ({
          language: state.language === 'pt' ? 'en' : 'pt',
        })),

      t: (key) => translations[get().language][key] || key,

      addOrdenhaRecord: (record) =>
        set((state) => ({
          ordenhaRecords: [
            {
              ...record,
              id: Date.now(),
            },
            ...state.ordenhaRecords,
          ],
        })),

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Date.now(),
            },
          ],
        })),

      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: newStatus,
                }
              : task
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      getNextPumpingEstimate: () => {
        const records = get().ordenhaRecords;

        if (records.length < 2) {
          return null;
        }

        const intervals = [];

        for (let index = 0; index < Math.min(records.length - 1, 5); index += 1) {
          intervals.push(
            new Date(records[index].date) -
              new Date(records[index + 1].date)
          );
        }

        const averageInterval =
          intervals.reduce((total, interval) => total + interval, 0) /
          intervals.length;

        return new Date(
          new Date(records[0].date).getTime() + averageInterval
        );
      },
    }),

    {
      name: 'amarternar-storage',

      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        language: state.language,
        ordenhaRecords: state.ordenhaRecords,
        tasks: state.tasks,
      }),
    }
  )
);
