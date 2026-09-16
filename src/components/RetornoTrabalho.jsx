import { useMemo, useState } from 'react';

import {
  Briefcase,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Droplets,
  HeartHandshake,
  Scale,
  Sparkles,
  Users,
} from 'lucide-react';

const steps = [
  {
    id: 'direitos',
    title: 'Conheça seus direitos',
    description:
      'Veja informações importantes para conciliar trabalho e amamentação.',
    icon: Scale,
    iconColor: 'text-indigo-500',
    bgColor: 'from-[#EDE9FE] to-[#DDD6FE]',
    tips: [
      'Em geral, a CLT prevê dois descansos especiais de 30 minutos para amamentar durante a jornada, até o bebê completar 6 meses.',
      'Converse com a empresa sobre horários, pausas e possibilidades de apoio.',
      'Em caso de dúvida, consulte os canais oficiais, RH, sindicato ou orientação jurídica.',
    ],
    actionLabel: 'Ver direitos da lactante',
    navigateTo: 'direitos',
  },
  {
    id: 'ordenha',
    title: 'Prepare a ordenha',
    description:
      'Organize os itens e os horários para a retirada e o armazenamento do leite.',
    icon: Droplets,
    iconColor: 'text-pink-500',
    bgColor: 'from-[#FFF0F5] to-[#FFD6E7]',
    tips: [
      'Comece a se preparar com antecedência para conhecer a rotina que funciona para você.',
      'Separe recipientes adequados, identificados com data e horário da coleta.',
      'Use o Diário de Ordenha para acompanhar horários, duração e quantidade.',
    ],
    actionLabel: 'Abrir Diário de Ordenha',
    navigateTo: 'ordenha',
  },
  {
    id: 'rotina',
    title: 'Organize sua rotina',
    description:
      'Planeje o dia com apoio da família, cuidador ou rede de confiança.',
    icon: Users,
    iconColor: 'text-emerald-500',
    bgColor: 'from-[#E4F8F1] to-[#C8EFE4]',
    tips: [
      'Converse com quem ficará com o bebê sobre horários e formas de oferecer o leite.',
      'Planeje o deslocamento e deixe os itens necessários separados no dia anterior.',
      'Inclua momentos possíveis de descanso, hidratação e apoio emocional.',
    ],
    actionLabel: 'Ver cuidados inteligentes',
    navigateTo: 'cuidados',
  },
  {
    id: 'plano',
    title: 'Monte seu plano semanal',
    description:
      'Acompanhe tarefas simples para se preparar com tranquilidade.',
    icon: ClipboardCheck,
    iconColor: 'text-amber-500',
    bgColor: 'from-[#FFF4D8] to-[#FFE4B5]',
    tips: [
      'Escolha apenas as tarefas que fazem sentido para sua realidade.',
      'Conclua uma etapa por vez: você não precisa fazer tudo no mesmo dia.',
      'Acompanhe o percentual de preparação na tela de Tarefas.',
    ],
    actionLabel: 'Abrir tarefas semanais',
    navigateTo: 'tarefas',
  },
];

const preparationTasks = [
  'Conhecer meus direitos como lactante.',
  'Conversar sobre pausas e apoio no trabalho.',
  'Separar recipientes para armazenar o leite.',
  'Planejar horários possíveis para ordenha.',
  'Conversar com a rede de apoio ou cuidador.',
  'Organizar a bolsa e os itens para o retorno.',
];

export default function RetornoTrabalho({ onNavigate }) {
  const [completed, setCompleted] = useState([]);
  const [openStep, setOpenStep] = useState('direitos');

  const progress = useMemo(() => {
    return Math.round((completed.length / preparationTasks.length) * 100);
  }, [completed]);

  function toggleTask(index) {
    setCompleted((previous) => {
      if (previous.includes(index)) {
        return previous.filter((taskIndex) => taskIndex !== index);
      }

      return [...previous, index];
    });
  }

  function toggleStep(id) {
    setOpenStep((previous) => (previous === id ? null : id));
  }

  return (
    <div className="p-4 pb-28 max-w-3xl mx-auto space-y-5">
      <section className="bg-gradient-to-br from-[#B8A9C9] to-[#DCD0FF] rounded-3xl p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Briefcase className="w-7 h-7" />
          </div>

          <div>
            <p className="text-sm text-white/80">
              Preparação com passos simples
            </p>

            <h1 className="text-2xl font-bold">
              Retorno ao Trabalho
            </h1>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-white/90">
          Organize sua rotina, conheça seus direitos e prepare a continuidade
          da amamentação de acordo com a sua realidade.
        </p>
      </section>

      <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#E6E6FA]/50">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B8A9C9]" />

              <h2 className="font-bold text-gray-800">
                Minha preparação
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {completed.length} de {preparationTasks.length} passos concluídos
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
          {preparationTasks.map((task, index) => {
            const isCompleted = completed.includes(index);

            return (
              <button
                key={task}
                type="button"
                onClick={() => toggleTask(index)}
                className="w-full flex items-center gap-3 rounded-xl bg-[#FFFDFB] border border-[#F1EEFA] p-3 text-left hover:bg-[#FFF5EE] transition-colors"
              >
                <span
                  className={`w-7 h-7 shrink-0 rounded-full border-2 flex items-center justify-center ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white border-gray-300 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4" strokeWidth={3} />
                </span>

                <span
                  className={`text-sm leading-5 ${
                    isCompleted
                      ? 'text-gray-400 line-through'
                      : 'text-gray-700'
                  }`}
                >
                  {task}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-[#FFCBA4]" />
          Passos importantes
        </h2>

        <div className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isOpen = openStep === step.id;

            return (
              <article
                key={step.id}
                className={`rounded-2xl overflow-hidden bg-gradient-to-br ${step.bgColor} shadow-sm`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 shrink-0 bg-white/80 rounded-xl flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${step.iconColor}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800">
                        {step.title}
                      </h3>

                      <p className="mt-1 text-sm leading-5 text-gray-600">
                        {step.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleStep(step.id)}
                      className="w-10 h-10 shrink-0 bg-white/70 rounded-xl flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
                      aria-label={
                        isOpen
                          ? `Ocultar orientações de ${step.title}`
                          : `Ver orientações de ${step.title}`
                      }
                      aria-expanded={isOpen}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mt-4 rounded-xl bg-white/70 p-4">
                      <ul className="space-y-3">
                        {step.tips.map((tip) => (
                          <li
                            key={tip}
                            className="flex items-start gap-2 text-sm leading-5 text-gray-700"
                          >
                            <span className="mt-1.5 w-2 h-2 shrink-0 rounded-full bg-[#B8A9C9]" />

                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={() => onNavigate(step.navigateTo)}
                        className="mt-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-[#FFF5EE] transition-colors"
                      >
                        {step.actionLabel}
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
          Lembrete importante
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          Cada família tem uma rotina diferente. Use estas orientações como
          apoio e procure uma unidade de saúde, banco de leite humano ou
          profissional de confiança se precisar de orientação individual.
        </p>
      </section>
    </div>
  );
}
