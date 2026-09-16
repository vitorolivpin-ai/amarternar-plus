import { useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Heart,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

const careSteps = [
  {
    id: 1,
    title: 'Separe o necessário',
    subtitle: 'Deixe perto o que você pode precisar.',
    icon: '👜',
    color: 'bg-amber-50 border-amber-200',
    tips: [
      'Tenha água por perto para se hidratar.',
      'Separe fralda, pano limpo e itens do bebê.',
      'Deixe o celular carregado, se precisar de orientação.',
    ],
  },
  {
    id: 2,
    title: 'Deixe tudo ao alcance',
    subtitle: 'Evite se levantar durante a mamada.',
    icon: '🪑',
    color: 'bg-blue-50 border-blue-200',
    tips: [
      'Escolha uma cadeira, sofá ou cama confortável.',
      'Apoie suas costas e, se possível, seus pés.',
      'Posicione os itens importantes perto de você.',
    ],
  },
  {
    id: 3,
    title: 'Cuide da higiene',
    subtitle: 'Pequenos cuidados ajudam na rotina.',
    icon: '🧼',
    color: 'bg-cyan-50 border-cyan-200',
    tips: [
      'Lave as mãos antes de cuidar do bebê.',
      'Use panos limpos quando necessário.',
      'Mantenha o espaço organizado e agradável.',
    ],
  },
  {
    id: 4,
    title: 'Monte sua rotina',
    subtitle: 'Cada dia pode ficar um pouco mais leve.',
    icon: '🗓️',
    color: 'bg-purple-50 border-purple-200',
    tips: [
      'Observe os horários em que o bebê costuma mamar.',
      'Faça pausas para descansar quando puder.',
      'Peça ajuda para alguém de confiança.',
    ],
  },
  {
    id: 5,
    title: 'Mantenha o que funciona',
    subtitle: 'Repita os cuidados que ajudam você e o bebê.',
    icon: '💛',
    color: 'bg-rose-50 border-rose-200',
    tips: [
      'Use esta lista sempre que precisar.',
      'Ajuste a rotina conforme suas necessidades.',
      'Procure apoio profissional se tiver dor ou dificuldade.',
    ],
  },
];

export default function CuidadosInteligentes() {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [openStep, setOpenStep] = useState(1);

  const progress = useMemo(() => {
    return Math.round((completedSteps.length / careSteps.length) * 100);
  }, [completedSteps]);

  function toggleCompleted(id) {
    setCompletedSteps((previous) => {
      if (previous.includes(id)) {
        return previous.filter((stepId) => stepId !== id);
      }

      return [...previous, id];
    });
  }

  function toggleOpen(id) {
    setOpenStep((previous) => (previous === id ? null : id));
  }

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-6 pb-28">
      <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 p-6 text-white shadow-lg">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Sparkles size={26} />
          </div>

          <div>
            <p className="text-sm font-medium text-pink-100">
              Organização simples para o dia a dia
            </p>

            <h1 className="text-2xl font-bold">
              Cuidados Inteligentes
            </h1>
          </div>
        </div>

        <p className="text-sm leading-6 text-pink-50">
          Pequenos passos para deixar sua rotina de amamentação mais confortável,
          organizada e tranquila.
        </p>

        <div className="mt-5 rounded-2xl bg-white/15 p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>Seu progresso</span>
            <span className="font-bold">{progress}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full rounded-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-pink-100">
            {completedSteps.length} de {careSteps.length} cuidados concluídos
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {careSteps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isOpen = openStep === step.id;

          return (
            <article
              key={step.id}
              className={`overflow-hidden rounded-2xl border p-4 shadow-sm transition-all ${step.color} ${
                isCompleted ? 'ring-2 ring-emerald-400' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  {step.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-500">
                        Cuidado {step.id}
                      </p>

                      <h2 className="text-base font-bold text-gray-800">
                        {step.title}
                      </h2>

                      <p className="mt-1 text-sm leading-5 text-gray-600">
                        {step.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCompleted(step.id)}
                      aria-label={
                        isCompleted
                          ? `Desmarcar ${step.title}`
                          : `Marcar ${step.title} como concluído`
                      }
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        isCompleted
                          ? 'border-emerald-500 bg-emerald-500 text-white'
                          : 'border-gray-300 bg-white text-gray-400'
                      }`}
                    >
                      <Check size={22} strokeWidth={3} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleOpen(step.id)}
                    aria-expanded={isOpen}
                    className="mt-4 flex w-full items-center justify-between rounded-xl bg-white/80 px-4 py-3 text-left text-sm font-semibold text-gray-700 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <span>
                      {isOpen ? 'Ocultar dicas' : 'Ver dicas simples'}
                    </span>

                    {isOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-3 rounded-xl bg-white/70 p-4">
                      <ul className="space-y-3">
                        {step.tips.map((tip) => (
                          <li
                            key={tip}
                            className="flex items-start gap-3 text-sm leading-5 text-gray-700"
                          >
                            <Heart
                              size={18}
                              className="mt-0.5 shrink-0 text-rose-500"
                              fill="currentColor"
                            />

                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-bold text-amber-900">
          Atenção aos sinais do seu corpo
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          Dor forte, febre, vermelhidão intensa na mama ou dificuldade para o
          bebê mamar são sinais para procurar uma unidade de saúde ou um
          profissional de confiança.
        </p>
      </div>
    </section>
  );
}
