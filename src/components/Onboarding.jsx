import { useEffect, useMemo, useState } from 'react';

import {
  Check,
  ChevronLeft,
  Heart,
} from 'lucide-react';

import { useStore } from '../store';

const questionDefinitions = [
  {
    id: 'workType',
    titleKey: 'onboardingWorkTitle',
    subtitleKey: 'onboardingWorkSubtitle',
    options: [
      {
        value: 'clt',
        labelKey: 'workClt',
      },
      {
        value: 'autonoma',
        labelKey: 'workAutonomous',
      },
      {
        value: 'informal',
        labelKey: 'workInformal',
      },
      {
        value: 'estudante',
        labelKey: 'workStudent',
      },
      {
        value: 'sem_trabalho',
        labelKey: 'workNotWorking',
      },
      {
        value: 'nao_informar',
        labelKey: 'preferNotToSay',
      },
    ],
  },
  {
    id: 'schedule',
    titleKey: 'onboardingScheduleTitle',
    subtitleKey: 'onboardingScheduleSubtitle',
    showWhen: (answers) =>
      !['sem_trabalho', 'nao_informar'].includes(answers.workType),
    options: [
      {
        value: 'fixo_dia',
        labelKey: 'scheduleFixedDay',
      },
      {
        value: 'manha',
        labelKey: 'scheduleMorning',
      },
      {
        value: 'tarde',
        labelKey: 'scheduleAfternoon',
      },
      {
        value: 'noite',
        labelKey: 'scheduleNight',
      },
      {
        value: '12x36',
        labelKey: 'scheduleTwelveByThirtySix',
      },
      {
        value: 'variavel',
        labelKey: 'scheduleVariable',
      },
      {
        value: 'casa',
        labelKey: 'scheduleHome',
      },
      {
        value: 'outro',
        labelKey: 'scheduleOther',
      },
    ],
  },
  {
    id: 'babyCare',
    titleKey: 'onboardingBabyCareTitle',
    subtitleKey: 'onboardingBabyCareSubtitle',
    showWhen: (answers) =>
      !['sem_trabalho', 'nao_informar'].includes(answers.workType),
    options: [
      {
        value: 'creche',
        labelKey: 'babyCareDaycare',
      },
      {
        value: 'familiar',
        labelKey: 'babyCareFamily',
      },
      {
        value: 'cuidador',
        labelKey: 'babyCareCaregiver',
      },
      {
        value: 'comigo',
        labelKey: 'babyCareWithMe',
      },
      {
        value: 'organizando',
        labelKey: 'babyCareOrganizing',
      },
      {
        value: 'nao_informar',
        labelKey: 'preferNotToSay',
      },
    ],
  },
  {
    id: 'priority',
    titleKey: 'onboardingPriorityTitle',
    subtitleKey: 'onboardingPrioritySubtitle',
    options: [
      {
        value: 'retorno',
        labelKey: 'priorityReturnToWork',
      },
      {
        value: 'ordenha',
        labelKey: 'priorityPumping',
      },
      {
        value: 'direitos',
        labelKey: 'priorityRights',
      },
      {
        value: 'tarefas',
        labelKey: 'priorityTasks',
      },
      {
        value: 'mapa',
        labelKey: 'priorityMap',
      },
      {
        value: 'cuidados',
        labelKey: 'priorityCare',
      },
    ],
  },
  {
    id: 'wantsTutorial',
    titleKey: 'onboardingTutorialTitle',
    subtitleKey: 'onboardingTutorialSubtitle',
    options: [
      {
        value: true,
        labelKey: 'tutorialYes',
      },
      {
        value: false,
        labelKey: 'tutorialNo',
      },
    ],
  },
];

export default function Onboarding({
  profile,
  onComplete,
  onCancel,
}) {
  const t = useStore((state) => state.t);

  const initialAnswers = useMemo(() => {
    const savedRoutine = profile?.routine || {};

    return {
      workType: savedRoutine.workType || '',
      schedule: savedRoutine.schedule || '',
      babyCare: savedRoutine.babyCare || '',
      priority: savedRoutine.priority || '',
      wantsTutorial:
        typeof savedRoutine.wantsTutorial === 'boolean'
          ? savedRoutine.wantsTutorial
          : undefined,
    };
  }, [profile]);

  const [answers, setAnswers] = useState(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    setAnswers(initialAnswers);
    setStepIndex(0);
  }, [initialAnswers]);

  const visibleQuestions = questionDefinitions.filter((question) => {
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

  function buildUpdatedProfile() {
    return {
      ...profile,

      routine: {
        ...profile?.routine,
        workType: answers.workType || '',
        schedule: answers.schedule || '',
        babyCare: answers.babyCare || '',
        priority: answers.priority || 'cuidados',
        wantsTutorial:
          typeof answers.wantsTutorial === 'boolean'
            ? answers.wantsTutorial
            : true,
      },

      onboardingCompleted: true,
    };
  }

  function finishOnboarding() {
    const updatedProfile = buildUpdatedProfile();

    onComplete(updatedProfile);
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
    const updatedProfile = {
      ...profile,

      routine: {
        ...profile?.routine,
        priority: profile?.routine?.priority || 'cuidados',
        wantsTutorial: true,
      },

      onboardingCompleted: true,
    };

    onComplete(updatedProfile);
  }

  const hasSelectedOption =
    currentQuestion &&
    answers[currentQuestion.id] !== undefined &&
    answers[currentQuestion.id] !== '';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#FFF5EE] to-[#F5F0FF] p-4">
      <main className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl">
        <header className="bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Heart className="h-6 w-6 fill-white" />
            </div>

            <div>
              <p className="text-sm text-white/80">AMARternar+</p>

              <h1 className="text-xl font-bold">
                {t('onboardingHeaderTitle')}
              </h1>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-white/90">
            {t('onboardingHeaderDescription')}
          </p>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs text-white/80">
              <span>
                {t('step')} {stepIndex + 1} {t('of')} {totalSteps}
              </span>

              <span>{progress}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <section className="p-6">
          <h2 className="text-xl font-bold text-gray-800">
            {currentQuestion ? t(currentQuestion.titleKey) : ''}
          </h2>

          <p className="mt-2 text-sm leading-5 text-gray-500">
            {currentQuestion ? t(currentQuestion.subtitleKey) : ''}
          </p>

          <div className="mt-5 space-y-3">
            {currentQuestion?.options.map((option) => {
              const isSelected =
                answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => selectOption(option.value)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                    isSelected
                      ? 'border-[#B8A9C9] bg-[#F5F0FF]'
                      : 'border-[#F1EEFA] bg-white hover:bg-[#FFF5EE]'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? 'border-[#B8A9C9] bg-[#B8A9C9] text-white'
                        : 'border-gray-300 text-transparent'
                    }`}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>

                  <span className="text-sm font-medium text-gray-700">
                    {t(option.labelKey)}
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
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E6E6FA] text-[#8B7BA8] transition-colors hover:bg-[#F5F0FF]"
                aria-label={t('back')}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <button
              type="button"
              onClick={goNext}
              disabled={!hasSelectedOption}
              className={`flex-1 rounded-xl py-3.5 font-bold transition-colors ${
                hasSelectedOption
                  ? 'bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] text-white shadow-md hover:shadow-lg'
                  : 'cursor-not-allowed bg-gray-100 text-gray-400'
              }`}
            >
              {stepIndex === visibleQuestions.length - 1
                ? t('viewSuggestions')
                : t('continue')}
            </button>
          </div>

          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="mt-4 w-full text-sm text-[#8B7BA8] hover:underline"
            >
              {t('cancelChange')}
            </button>
          ) : (
            <button
              type="button"
              onClick={skipOnboarding}
              className="mt-4 w-full text-sm text-[#8B7BA8] hover:underline"
            >
              {t('skipForNow')}
            </button>
          )}
        </section>
      </main>
    </div>
  );
}
