import { useMemo, useState } from 'react';

import {
  BookOpen,
  Search,
  Play,
  FileText,
  ExternalLink,
  Heart,
  Baby,
  Brain,
  User,
} from 'lucide-react';

import { useStore } from '../store';

const contentItems = [
  {
    id: 1,
    titleKey: 'libraryContent1Title',
    sourceKey: 'librarySourceHealthMinistry',
    type: 'article',
    category: 'breastfeeding',
    descriptionKey: 'libraryContent1Description',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/aleitamento-materno',
  },
  {
    id: 2,
    titleKey: 'libraryContent2Title',
    sourceKey: 'librarySourceHealthMinistry',
    type: 'article',
    category: 'babyCare',
    descriptionKey: 'libraryContent2Description',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca',
  },
  {
    id: 3,
    titleKey: 'libraryContent3Title',
    sourceKey: 'librarySourceFiocruzYouTube',
    type: 'video',
    category: 'breastfeeding',
    descriptionKey: 'libraryContent3Description',
    url: 'https://www.youtube.com/watch?v=53A4OsCryqQ',
  },
  {
    id: 4,
    titleKey: 'libraryContent4Title',
    sourceKey: 'librarySourceHealthMinistry',
    type: 'article',
    category: 'motherCare',
    descriptionKey: 'libraryContent4Description',
    url: 'https://www.gov.br/saude/pt-br/composicao/saps/publicacoes/cadernetas-e-cartoes',
  },
  {
    id: 5,
    titleKey: 'libraryContent5Title',
    sourceKey: 'librarySourceCvv',
    type: 'article',
    category: 'mentalHealth',
    descriptionKey: 'libraryContent5Description',
    url: 'https://cvv.org.br',
  },
  {
    id: 6,
    titleKey: 'libraryContent6Title',
    sourceKey: 'librarySourcePediatricsYouTube',
    type: 'video',
    category: 'babyCare',
    descriptionKey: 'libraryContent6Description',
    url: 'https://www.youtube.com/watch?v=dt4pmkGD5U8',
  },
  {
    id: 7,
    titleKey: 'libraryContent7Title',
    sourceKey: 'librarySourcePahoWho',
    type: 'article',
    category: 'breastfeeding',
    descriptionKey: 'libraryContent7Description',
    url: 'https://www.paho.org/pt/noticias/1-8-2018-aleitamento-materno-nos-primeiros-anos-vida-salvaria-mais-820-mil-criancas',
  },
  {
    id: 8,
    titleKey: 'libraryContent8Title',
    sourceKey: 'librarySourceBrazilianPediatrics',
    type: 'article',
    category: 'babyCare',
    descriptionKey: 'libraryContent8Description',
    url: 'https://www.sbp.com.br/especiais/pediatria-para-familias/',
  },
  {
    id: 9,
    titleKey: 'libraryContent9Title',
    sourceKey: 'librarySourceHealthMinistry',
    type: 'article',
    category: 'mentalHealth',
    descriptionKey: 'libraryContent9Description',
    url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental',
  },
  {
    id: 10,
    titleKey: 'libraryContent10Title',
    sourceKey: 'librarySourceWhoUnicefYouTube',
    type: 'video',
    category: 'breastfeeding',
    descriptionKey: 'libraryContent10Description',
    url: 'https://www.youtube.com/watch?v=gjIb1kA0jos',
  },
  {
    id: 11,
    titleKey: 'libraryContent11Title',
    sourceKey: 'librarySourceFiocruz',
    type: 'article',
    category: 'breastfeeding',
    descriptionKey: 'libraryContent11Description',
    url: 'https://rblh.fiocruz.br',
  },
  {
    id: 12,
    titleKey: 'libraryContent12Title',
    sourceKey: 'librarySourceGovBr',
    type: 'article',
    category: 'motherCare',
    descriptionKey: 'libraryContent12Description',
    url: 'https://www.gov.br/inss/pt-br/direitos-e-deveres/salario-maternidade/salario-maternidade',
  },
  {
    id: 13,
    titleKey: 'libraryContent13Title',
    sourceKey: 'librarySourceGovBr',
    type: 'article',
    category: 'motherCare',
    descriptionKey: 'libraryContent13Description',
    url: 'https://www.gov.br/mulheres/pt-br/central-de-conteudos/noticias/2026/agosto-defeso-eleitoral/gravidez-e-trabalho-saiba-quais-direitos-protegem-as-trabalhadoras',
  },
  {
    id: 14,
    titleKey: 'libraryContent14Title',
    sourceKey: 'librarySourceSpecialistYouTube',
    type: 'video',
    category: 'breastfeeding',
    descriptionKey: 'libraryContent14Description',
    url: 'https://www.youtube.com/watch?v=NuQytE2fhO0',
  },
];

const categoryConfig = {
  motherCare: {
    labelKey: 'motherCare',
    icon: User,
    color: 'bg-pink-100',
    textColor: 'text-pink-500',
  },
  babyCare: {
    labelKey: 'babyCare',
    icon: Baby,
    color: 'bg-[#E6E6FA]',
    textColor: 'text-[#B8A9C9]',
  },
  breastfeeding: {
    labelKey: 'breastfeeding',
    icon: Heart,
    color: 'bg-[#FFDAB9]',
    textColor: 'text-[#FFCBA4]',
  },
  mentalHealth: {
    labelKey: 'mentalHealth',
    icon: Brain,
    color: 'bg-teal-100',
    textColor: 'text-teal-500',
  },
};

export default function Biblioteca() {
  const t = useStore((state) => state.t);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const localizedContent = useMemo(
    () =>
      contentItems.map((item) => ({
        ...item,
        title: t(item.titleKey),
        source: t(item.sourceKey),
        description: t(item.descriptionKey),
      })),
    [t]
  );

  const filteredContent = localizedContent.filter((content) => {
    const normalizedSearch = search.toLowerCase().trim();

    const matchesSearch =
      content.title.toLowerCase().includes(normalizedSearch) ||
      content.description.toLowerCase().includes(normalizedSearch) ||
      content.source.toLowerCase().includes(normalizedSearch);

    const matchesCategory =
      categoryFilter === 'all' ||
      content.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  function handleOpenLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="space-y-4 p-4">
      <div className="mb-2 flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-[#FFCBA4]" />

        <h2 className="text-xl font-bold text-gray-800">
          {t('library')}
        </h2>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder={t('search')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-xl border border-[#E6E6FA] bg-white py-3 pl-10 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]"
          aria-label={t('search')}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setCategoryFilter('all')}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-base font-medium transition-all ${
            categoryFilter === 'all'
              ? 'bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white shadow-md'
              : 'border border-gray-200 bg-white text-gray-600'
          }`}
        >
          {t('allCategories')}
        </button>

        {Object.entries(categoryConfig).map(([key, config]) => {
          const Icon = config.icon;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setCategoryFilter(key)}
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-base font-medium transition-all ${
                categoryFilter === key
                  ? `${config.color} ${config.textColor} shadow-md`
                  : 'border border-gray-200 bg-white text-gray-600'
              }`}
            >
              <Icon className="h-4 w-4" />
              {t(config.labelKey)}
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filteredContent.map((item) => {
          const config = categoryConfig[item.category];

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-[#E6E6FA]/30 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${config.color}`}
                >
                  {item.type === 'video' ? (
                    <Play className={`h-6 w-6 ${config.textColor}`} />
                  ) : (
                    <FileText className={`h-6 w-6 ${config.textColor}`} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-base text-gray-500">
                    {item.description}
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <span
                      className={`rounded-full px-2 py-1 text-sm ${config.color} ${config.textColor}`}
                    >
                      {item.type === 'video'
                        ? t('video')
                        : t('article')}
                    </span>

                    <span className="text-sm text-gray-400">
                      {item.source}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenLink(item.url)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFDAB9]/30 to-[#E6E6FA]/30 py-2 text-base font-medium text-[#B8A9C9] transition-all hover:from-[#FFDAB9]/50 hover:to-[#E6E6FA]/50"
              >
                <ExternalLink className="h-4 w-4" />
                {t('accessContent')}
              </button>
            </div>
          );
        })}

        {filteredContent.length === 0 && (
          <div className="py-8 text-center">
            <BookOpen className="mx-auto mb-2 h-12 w-12 text-gray-300" />

            <p className="text-base text-gray-400">
              {t('noContentFound')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
