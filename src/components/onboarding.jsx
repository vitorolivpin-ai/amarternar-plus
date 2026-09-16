import { useState } from 'react';

import {
  Check,
  ChevronLeft,
  Heart,
} from 'lucide-react';

const questions = [
  {
    id: 'workType',
    title: 'Como está sua rotina de trabalho hoje?',
    subtitle: 'Escolha a opção que mais combina com você.',
    options: [
      {
        value: 'clt',
        label: 'Trabalho com carteira assinada',
      },
      {
        value: 'autonoma',
        label: 'Trabalho por conta própria',
      },
      {
        value: 'informal',
        label: 'Trabalho sem horário fixo',
      },
      {
        value: 'estudante',
        label: 'Estou estudando',
      },
      {
        value: 'sem_trabalho',
        label: 'Não estou trabalhando no momento',
      },
      {
        value: 'nao_informar',
        label: 'Prefiro não informar',
      },
    ],
  },
  {
    id: 'schedule',
    title: 'Como costuma ser seu horário?',
    subtitle: 'Isso ajuda a organizar sugestões para sua rotina.',
    showWhen: (answers) =>
      !['sem_trabalho', 'nao_informar'].includes(answers.workType),
    options: [
      {
        value: 'fixo_dia',
        label: 'Horário fixo durante o dia',
      },
      {
        value: 'manha',
        label: 'Turno da manhã',
      },
      {
        value: 'tarde',
        label: 'Turno da tarde',
      },
      {
        value: 'noite',
        label: 'Turno da noite',
      },
      {
        value: '12x36',
        label: 'Escala 12x36',
      },
      {
        value: 'variavel',
        label: 'Horários variáveis',
      },
      {
        value: 'casa',
        label: 'Trabalho ou estudo em casa',
      },
      {
        value: 'outro',
        label: 'Outro ou não sei',
      },
    ],
  },
  {
    id: 'babyCare',
    title: 'Enquanto você trabalha ou estuda, quem cuida do bebê?',
    subtitle: 'Você poderá mudar essa informação depois.',
    showWhen: (answers) =>
      !['sem_trabalho', 'nao_informar'].includes(answers.workType),
    options: [
      {
        value: 'creche',
        label: 'O bebê vai para a creche',
      },
      {
        value: 'familiar',
        label: 'O bebê fica com familiar',
      },
      {
        value: 'cuidador',
        label: 'O bebê fica com cuidador(a)',
      },
      {
        value: 'comigo',
        label: 'O bebê fica comigo',
      },
      {
        value: 'organizando',
        label: 'Ainda estou organizando',
      },
      {
        value: 'nao_informar',
        label: 'Prefiro não informar',
      },
    ],
  },
  {
    id: 'priority',
    title: 'O que você mais precisa organizar agora?',
    subtitle: 'Vamos destacar os recursos mais úteis para você.',
    options: [
      {
        value: 'retorno',
        label: 'Retorno ao trabalho ou estudo',
      },
      {
        value: 'ordenha',
        label: 'Ordenha e armazenamento',
      },
      {
        value: 'direitos',
        label: 'Meus direitos como lactante',
      },
      {
        value: 'tarefas',
        label: 'Minha rotina e tarefas da semana',
      },
      {
        value: 'mapa',
        label: 'Encontrar apoio perto de mim',
      },
      {
        value: 'cuidados',
        label: 'Cuidados comigo e com o bebê',
      },
    ],
  },
  {
    id: 'wantsTutorial',
    title: 'Quer receber dicas de como usar o aplicativo?',
    subtitle: 'Você poderá ativar ou desativar isso depois.',
    options: [
      {
        value: true,
        label: 'Sim, quero explicações simples',
      },
      {
        value: false,
        label: 'Não, consigo usar por conta própria',
      },
    ],
  },
];

export default function Onboarding({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [stepIndex, setStepIndex] = useState(0);

  const visibleQuestions = questions.filter((question) => {
    if (!question.showWhen) {
      return true;
    }

    return question.showWhen(answers);
  });

  const currentQuestion = visibleQuestions[stepIndex];
  const totalSteps = visibleQuestions.length;

  const progress = Math.round(
    ((stepIndex + 1) / totalSteps) * 100
  );

  function selectOption(value) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  }

  function finishOnboarding() {
    const profile = {
      ...answers,
      onboardingCompleted: true,
    };

    localStorage.setItem(
      'amarternar_profile',
      JSON.stringify(profile)
    );

    onComplete(profile);
  }

  function goNext() {
    if (stepIndex < visibleQuestions.length - 1) {
      setStepIndex((previous) => previous + 1);
      return;
    }

    finishOnboarding();
  }

  function goBack() {
    if (stepIndex > 0) {
      setStepIndex((previous) => previous - 1);
    }
  }

  function skipOnboarding() {
    const profile = {
      onboardingCompleted: true,
      priority: 'cuidados',
      wantsTutorial: true,
    };

    localStorage.setItem(
      'amarternar_profile',
      JSON.stringify(profile)
    );

    onComplete(profile);
  }

  const hasSelectedOption =
    answers[currentQuestion?.id] !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5EE] to-[#F5F0FF] flex items-center justify-center p-4">
      <main className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        <header className="bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Heart className="w-6 h-6 fill-white" />
            </div>

            <div>
              <p className="text-sm text-white/80">
                AMARternar+
              </p>

              <h1 className="text-xl font-bold">
                Vamos organizar sua rotina?
              </h1>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-white/90">
            Responda algumas perguntas rápidas para deixar o aplicativo mais
            útil para você. Todas as áreas continuarão disponíveis.
          </p>

          <div className="mt-5">
            <div className="flex justify-between text-xs text-white/80 mb-2">
              <span>
                Etapa {stepIndex + 1} de {totalSteps}
              </span>

              <span>{progress}%</span>
            </div>

            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <section className="p-6">
          <h2 className="text-xl font-bold text-gray-800">
            {currentQuestion.title}
          </h2>

          <p className="mt-2 text-sm leading-5 text-gray-500">
            {currentQuestion.subtitle}
          </p>

          <div className="mt-5 space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected =
                answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => selectOption(option.value)}
                  className={`w-full flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                    isSelected
                      ? 'border-[#B8A9C9] bg-[#F5F0FF]'
                      : 'border-[#F1EEFA] bg-white hover:bg-[#FFF5EE]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-[#B8A9C9] bg-[#B8A9C9] text-white'
                        : 'border-gray-300 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </span>

                  <span className="text-sm font-medium text-gray-700">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex items-center gap-3">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="w-12 h-12 rounded-xl border border-[#E6E6FA] flex items-center justify-center text-[#8B7BA8] hover:bg-[#F5F0FF] transition-colors"
                aria-label="Voltar"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <button
              type="button"
              onClick={goNext}
              disabled={!hasSelectedOption}
              className={`flex-1 rounded-xl py-3.5 font-bold transition-colors ${
                hasSelectedOption
                  ? 'bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {stepIndex === visibleQuestions.length - 1
                ? 'Ver meu aplicativo'
                : 'Continuar'}
            </button>
          </div>

          <button
            type="button"
            onClick={skipOnboarding}
            className="mt-4 w-full text-sm text-[#8B7BA8] hover:underline"
          >
            Pular por enquanto
          </button>
        </section>
      </main>
    </div>
  );
}
