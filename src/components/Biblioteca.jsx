import { useState } from 'react';
import { BookOpen, Search, Play, FileText, ExternalLink, Heart, Baby, Brain, User } from 'lucide-react';
import { useStore } from '../store';

const conteudos = [
  { id: 1, title: 'Amamentação - Guia Completo', source: 'Ministério da Saúde', type: 'article', category: 'breastfeeding', description: 'Página oficial com todas as informações sobre amamentação.', url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/aleitamento-materno' },
  { id: 2, title: 'Saúde da Criança', source: 'Ministério da Saúde', type: 'article', category: 'babyCare', description: 'Informações sobre cuidados com a saúde do bebê.', url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-crianca' },
  { id: 3, title: 'Como amamentar - Passo a passo', source: 'YouTube - Ministério da Saúde', type: 'video', category: 'breastfeeding', description: 'Vídeo oficial ensinando a técnica correta de amamentação.', url: 'https://www.youtube.com/watch?v=iZ5gPW3bMCE' },
  { id: 4, title: 'Caderneta da Gestante', source: 'Ministério da Saúde', type: 'article', category: 'motherCare', description: 'Guia completo para acompanhamento da gestação e pós-parto.', url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/caderneta-da-gestante' },
  { id: 5, title: 'CVV - Apoio Emocional', source: 'CVV', type: 'article', category: 'mentalHealth', description: 'Centro de Valorização da Vida - Apoio 24h pelo 188.', url: 'https://cvv.org.br' },
  { id: 6, title: 'Cuidados com o Recém-Nascido', source: 'YouTube - SBP', type: 'video', category: 'babyCare', description: 'Orientações da Sociedade Brasileira de Pediatria.', url: 'https://www.youtube.com/watch?v=R2YsQqLBc7E' },
  { id: 7, title: 'Aleitamento Materno - OMS', source: 'OPAS/OMS', type: 'article', category: 'breastfeeding', description: 'Recomendações da Organização Mundial da Saúde.', url: 'https://www.paho.org/pt/topicos/aleitamento-materno' },
  { id: 8, title: 'Pediatria para Famílias', source: 'Sociedade Brasileira de Pediatria', type: 'article', category: 'babyCare', description: 'Portal com orientações para pais sobre saúde infantil.', url: 'https://www.sbp.com.br/especiais/pediatria-para-familias/' },
  { id: 9, title: 'Saúde Mental Materna', source: 'Ministério da Saúde', type: 'article', category: 'mentalHealth', description: 'Informações sobre depressão pós-parto e saúde mental.', url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-mental' },
  { id: 10, title: 'Agosto Dourado - Amamentação', source: 'YouTube - Gov BR', type: 'video', category: 'breastfeeding', description: 'Campanha oficial sobre a importância da amamentação.', url: 'https://www.youtube.com/watch?v=6Jz0u0kP8xE' },
  { id: 11, title: 'Rede Brasileira de Bancos de Leite', source: 'Fiocruz', type: 'article', category: 'breastfeeding', description: 'Encontre bancos de leite humano e saiba como doar.', url: 'https://rfrblh.fiocruz.br' },
  { id: 12, title: 'Direitos da Gestante e Lactante', source: 'Gov.br', type: 'article', category: 'motherCare', description: 'Informações sobre direitos trabalhistas e benefícios.', url: 'https://www.gov.br/pt-br/servicos/obter-salario-maternidade' },
];

const categoryConfig = {
  motherCare: { label: 'Cuidados com a Mãe', icon: User, color: 'bg-pink-100', textColor: 'text-pink-500' },
  babyCare: { label: 'Cuidados com o Bebê', icon: Baby, color: 'bg-[#E6E6FA]', textColor: 'text-[#B8A9C9]' },
  breastfeeding: { label: 'Amamentação', icon: Heart, color: 'bg-[#FFDAB9]', textColor: 'text-[#FFCBA4]' },
  mentalHealth: { label: 'Saúde Mental', icon: Brain, color: 'bg-teal-100', textColor: 'text-teal-500' }
};

export default function Biblioteca() {
  const { t } = useStore();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const filteredContent = conteudos.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2"><BookOpen className="w-6 h-6 text-[#FFCBA4]" /><h2 className="text-xl font-bold text-gray-800">{t('library')}</h2></div>
      <div className="relative"><Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" placeholder={t('search')} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-[#E6E6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DCD0FF] text-base" /></div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button onClick={() => setCategoryFilter('all')} className={`px-4 py-2 rounded-full text-base font-medium whitespace-nowrap transition-all ${categoryFilter === 'all' ? 'bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'}`}>{t('allCategories')}</button>
        {Object.entries(categoryConfig).map(([key, config]) => (<button key={key} onClick={() => setCategoryFilter(key)} className={`px-4 py-2 rounded-full text-base font-medium whitespace-nowrap transition-all flex items-center gap-1 ${categoryFilter === key ? `${config.color} ${config.textColor} shadow-md` : 'bg-white text-gray-600 border border-gray-200'}`}><config.icon className="w-4 h-4" />{config.label}</button>))}
      </div>
      <div className="space-y-3">
        {filteredContent.map(item => {
          const config = categoryConfig[item.category];
          return (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E6E6FA]/30">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center flex-shrink-0`}>{item.type === 'video' ? <Play className={`w-6 h-6 ${config.textColor}`} /> : <FileText className={`w-6 h-6 ${config.textColor}`} />}</div>
                <div className="flex-1 min-w-0"><h3 className="font-semibold text-gray-800 text-base">{item.title}</h3><p className="text-base text-gray-500 mt-1 line-clamp-2">{item.description}</p><div className="flex items-center gap-3 mt-2"><span className={`text-sm px-2 py-1 rounded-full ${config.color} ${config.textColor}`}>{item.type === 'video' ? t('video') : t('article')}</span><span className="text-sm text-gray-400">{item.source}</span></div></div>
              </div>
              <button onClick={() => handleOpenLink(item.url)} className="w-full mt-3 py-2 bg-gradient-to-r from-[#FFDAB9]/30 to-[#E6E6FA]/30 text-[#B8A9C9] rounded-xl text-base font-medium hover:from-[#FFDAB9]/50 hover:to-[#E6E6FA]/50 transition-all flex items-center justify-center gap-2"><ExternalLink className="w-4 h-4" />Acessar conteúdo</button>
            </div>
          );
        })}
        {filteredContent.length === 0 && <div className="text-center py-8"><BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" /><p className="text-gray-400 text-base">Nenhum conteúdo encontrado</p></div>}
      </div>
    </div>
  );
}

