import { useMemo, useState } from 'react';

import {
  Briefcase,
  Check,
  ChevronDown,
  ChevronUp,
  Droplets,
  Heart,
  Scale,
  Users,
} from 'lucide-react';

import { useStore } from '../store';

const steps = [
  {
    id: 'direitos',
    titleKey: 'returnStepRightsTitle',
    descriptionKey: 'returnStepRightsDescription',
    icon: Scale,
    iconColor: 'text-indigo-500',
    bgColor: 'from-[#EDE9FE] to-[#DDD6FE]',
    tipKeys: [
      'returnStepRightsTip1',
      'returnStepRightsTip2',
      'returnStepRightsTip3',
    ],
    actionLabelKey: 'returnStepRightsAction',
    navigateTo: 'direitos',
  },
  {
    id: 'ordenha',
    titleKey: 'returnStepPumpingTitle',
    descriptionKey: 'returnStepPumpingDescription',
    icon: Droplets,
    iconColor: 'text-pink-500',
    bgColor: 'from-[#FFF0F5] to-[#FFD6E7]',
    tipKeys: [
      'returnStepPumpingTip1',
      'returnStepPumpingTip2',
      'returnStepPumpingTip3',
    ],
    actionLabelKey: 'returnStepPumpingAction',
    navigateTo: 'ordenha',
  },
  {
    id: 'rotina',
    titleKey: 'returnStepRoutineTitle',
    descriptionKey: 'returnStepRoutineDescription',
    icon: Users,
    iconColor: 'text-emerald-500',
    bgColor: 'from-[#E4F8F1] to-[#C8EFE4]',
    tipKeys: [
      'returnStepRoutineTip1',
      'returnStepRoutineTip2',
      'returnStepRoutineTip3',
    ],
    actionLabelKey: 'returnStepRoutineAction',
    navigateTo: 'cuidados',
  },
  {
    id: 'plano',
    titleKey: 'returnStepPlanTitle',
    descriptionKey: 'returnStepPlanDescription',
    icon: Check,
    iconColor: 'text-amber-500',
    bgColor: 'from-[#FFF4D8] to-[#FFE4B5]',
    tipKeys: [
      'returnStepPlanTip1',
      'returnStepPlanTip2',
      'returnStepPlanTip3',
    ],
    actionLabelKey: 'returnStepPlanAction',
    navigateTo: 'tarefas',
  },
];

const preparationTaskKeys = [
  'returnTask1',
  'returnTask2',
  'returnTask3',
  'returnTask4',
  'returnTask5',
  'returnTask6',
];

export default function RetornoTrabalho({ onNavigate }) {
  const t = useStore((state) => state.t);

  const [completed, setCompleted] = useState([]);
  const [openStep, setOpenStep] = useState('direitos');

  const progress = useMemo(() => {
    return Math.round(
      (completed.length / preparationTaskKeys.length) * 100
    );
  }, [completed]);

  function toggleTask(index) {
    setCompleted((previous) => {
      if (previous.includes(index)) {
        return previous.filter(
          (taskIndex) => taskIndex !== index
        );
      }

      return [...previous, index];
    });
  }

  function toggleStep(id) {
    setOpenStep((previous) => (
      previous === id ? null : id
    ));
  }

  function navigate(destination) {
    if (typeof onNavigate === 'function') {
      onNavigate(destination);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 p-4 pb-28">
      <section className="rounded-3xl bg-gradient-to-br from-[#B8A9C9] to-[#DCD0FF] p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Briefcase className="h-7 w-7" />
          </div>

          <div>
            <p className="text-sm text-white/80">
              {t('returnHeaderEyebrow')}
            </p>

            <h1 className="text-2xl font-bold">
              {t('returnToWork')}
            </h1>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-white/90">
          {t('returnHeaderDescription')}
        </p>
      </section>

      <section className="rounded-2xl border border-[#E6E6FA]/50 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#B8A9C9]" />

              <h2 className="font-bold text-gray-800">
                {t('myPreparation')}
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {completed.length} {t('of')}{' '}
              {preparationTaskKeys.length}{' '}
              {t('returnStepsCompleted')}
            </p>
          </div>

          <span className="text-xl font-bold text-[#B8A9C9]">
            {progress}%
          </span>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#F1EEFA]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FFCBA4] to-[#B8A9C9] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-5 space-y-3">
          {preparationTaskKeys.map((taskKey, index) => {
            const isCompleted = completed.includes(index);

            return (
              <button
                key={taskKey}
                type="button"
                onClick={() => toggleTask(index)}
                className="flex w-full items-center gap-3 rounded-xl border border-[#F1EEFA] bg-[#FFFDFB] p-3 text-left transition-colors hover:bg-[#FFF5EE]"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
                    isCompleted
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-gray-300 bg-white text-transparent'
                  }`}
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>

                <span
                  className={`text-sm leading-5 ${
                    isCompleted
                      ? 'text-gray-400 line-through'
                      : 'text-gray-700'
                  }`}
                >
                  {t(taskKey)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 font-bold text-gray-800">
          <Heart className="h-5 w-5 text-[#FFCBA4]" />
          {t('returnImportantSteps')}
        </h2>

        <div className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isOpen = openStep === step.id;
            const stepTitle = t(step.titleKey);

            return (
              <article
                key={step.id}
                className={`overflow-hidden rounded-2xl bg-gradient-to-br ${step.bgColor} shadow-sm`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/80">
                      <Icon className={`h-6 w-6 ${step.iconColor}`} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-800">
                        {stepTitle}
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-gray-600">
                        {t(step.descriptionKey)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleStep(step.id)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70 text-gray-600 transition-colors hover:bg-white"
                      aria-label={
                        isOpen
                          ? `${t('hideGuidance')} ${stepTitle}`
                          : `${t('viewGuidance')} ${stepTitle}`
                      }
                      aria-expanded={isOpen}
                    >
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mt-4 rounded-xl bg-white/70 p-4">
                      <ul className="space-y-3">
                        {step.tipKeys.map((tipKey) => (
                          <li
                            key={tipKey}
                            className="flex items-start gap-2 text-sm leading-5 text-gray-700"
                          >
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#B8A9C9]" />

                            <span>{t(tipKey)}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={() => navigate(step.navigateTo)}
                        className="mt-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-[#FFF5EE]"
                      >
                        {t(step.actionLabelKey)}
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="font-bold text-amber-900">
          {t('returnReminderTitle')}
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          {t('returnReminderDescription')}
        </p>
      </section>
    </div>
  );
}
