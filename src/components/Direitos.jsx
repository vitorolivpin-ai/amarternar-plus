import { useState } from 'react';
import { Scale, Briefcase, Users, Building, Heart, HelpCircle, ChevronDown, ChevronUp, Shield, ExternalLink, CheckCircle } from 'lucide-react';
import { useStore } from '../store';

const direitosData = [
  {
    id: 'trabalho', icon: Briefcase, title: 'Direitos Trabalhistas (CLT)', color: 'bg-[#FFCBA4]',
    items: [
      { title: 'Licença-Maternidade', description: '120 dias garantidos pela Constituição Federal. Empresas do Programa Empresa Cidadã: 180 dias.', fonte: 'CF Art. 7º, XVIII | Lei 11.770/2008' },
      { title: 'Intervalos para Amamentação', description: 'Dois descansos especiais de 30 minutos cada durante a jornada, até o bebê completar 6 meses.', fonte: 'Art. 396 CLT' },
      { title: 'Estabilidade no Emprego', description: 'Proibida demissão sem justa causa desde a confirmação da gravidez até 5 meses após o parto.', fonte: 'ADCT Art. 10, II, b' },
      { title: 'Sala de Amamentação', description: 'Empresas com mais de 30 funcionárias maiores de 16 anos devem ter local apropriado.', fonte: 'Art. 389, §1º CLT' },
      { title: 'Afastamento de Insalubridade', description: 'Gestantes e lactantes devem ser afastadas de atividades insalubres sem redução salarial.', fonte: 'Art. 394-A CLT' }
    ]
  },
  {
    id: 'prioridade', icon: Users, title: 'Atendimento Prioritário', color: 'bg-[#DCD0FF]',
    items: [
      { title: 'Fila Preferencial', description: 'Gestantes e lactantes têm direito a atendimento prioritário em bancos, supermercados, hospitais e repartições públicas.', fonte: 'Lei 10.048/2000' },
      { title: 'Assentos Preferenciais', description: 'Reserva obrigatória de assentos em transporte público coletivo.', fonte: 'Lei 10.048/2000' },
      { title: 'Penalidades', description: 'Estabelecimentos que descumprirem estão sujeitos a multas e penalidades administrativas.', fonte: 'Lei 10.048/2000, Art. 6º' }
    ]
  },
  {
    id: 'inss', icon: Building, title: 'Benefícios INSS', color: 'bg-[#B8A9C9]',
    items: [
      { title: 'Salário-Maternidade', description: 'Benefício pago durante o período de licença. Valor corresponde à última remuneração.', fonte: 'Lei 8.213/91' },
      { title: 'Quem tem direito', description: 'Trabalhadoras CLT, domésticas, contribuintes individuais, MEI, seguradas especiais e desempregadas em período de graça.', fonte: 'Lei 8.213/91, Art. 71' },
      { title: 'Como solicitar', description: 'Pelo aplicativo ou site Meu INSS, ou ligando para 135.', fonte: 'Portal Meu INSS' }
    ]
  },
  {
    id: 'publico', icon: Heart, title: 'Amamentação em Público', color: 'bg-pink-400',
    items: [
      { title: 'Direito Garantido', description: 'A amamentação é direito da mãe e do bebê e pode ser realizada em qualquer local público ou privado.', fonte: 'Estatuto da Criança e do Adolescente' },
      { title: 'Proteção Legal', description: 'É proibido constranger, impedir ou criar obstáculos à amamentação em locais públicos ou privados.', fonte: 'Leis Estaduais e Municipais' },
      { title: 'Denúncia', description: 'Caso sofra constrangimento, denuncie ao Procon ou procure orientação jurídica.', fonte: 'Código de Defesa do Consumidor' }
    ]
  },
  {
    id: 'outros', icon: Shield, title: 'Outros Direitos', color: 'bg-teal-400',
    items: [
      { title: 'Acompanhante no Parto', description: 'Direito a um acompanhante de livre escolha durante o trabalho de parto, parto e pós-parto imediato.', fonte: 'Lei 11.108/2005' },
      { title: 'Alojamento Conjunto', description: 'Mãe e bebê devem permanecer juntos 24h após o nascimento, salvo indicação médica contrária.', fonte: 'Portaria MS 2.068/2016' },
      { title: 'Consultas e Exames', description: 'Gestantes têm direito a dispensas do trabalho para consultas e exames durante a gravidez.', fonte: 'Art. 392, §4º CLT' }
    ]
  },
  {
    id: 'faq', icon: HelpCircle, title: 'Perguntas Frequentes', color: 'bg-amber-400',
    items: [
      { title: 'Posso ser demitida amamentando?', description: 'NÃO. Você tem estabilidade da gravidez até 5 meses após o parto. Demissão sem justa causa neste período é ilegal.', fonte: 'ADCT Art. 10, II, b' },
      { title: 'Quantas pausas tenho no trabalho?', description: 'Duas pausas de 30 minutos cada, durante a jornada de trabalho, até o bebê completar 6 meses.', fonte: 'Art. 396 CLT' },
      { title: 'Posso amamentar em público?', description: 'SIM! É um direito garantido. Ninguém pode impedir ou constranger você por amamentar em qualquer lugar.', fonte: 'ECA e Leis Locais' },
      { title: 'Tenho direito à licença mesmo desempregada?', description: 'Sim, se estiver no período de graça do INSS (até 12 meses após último emprego), pode receber salário-maternidade.', fonte: 'Lei 8.213/91' }
    ]
  }
];

export default function Direitos() {
  const { t } = useStore();
  const [expandedSection, setExpandedSection] = useState(null);
  const toggleSection = (id) => setExpandedSection(expandedSection === id ? null : id);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2"><Scale className="w-6 h-6 text-[#B8A9C9]" /><h2 className="text-xl font-bold text-gray-800">{t('rightsTitle')}</h2></div>
      <p className="text-base text-gray-500 bg-gradient-to-r from-[#FFDAB9]/20 to-[#E6E6FA]/20 p-4 rounded-xl">Conheça seus direitos como gestante e lactante. Informações baseadas na legislação brasileira vigente.</p>
      <div className="space-y-3">
        {direitosData.map(section => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          return (
            <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-[#E6E6FA]/30 overflow-hidden">
              <button onClick={() => toggleSection(section.id)} className="w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors">
                <div className={`w-12 h-12 ${section.color} rounded-xl flex items-center justify-center flex-shrink-0`}><Icon className="w-6 h-6 text-white" /></div>
                <div className="flex-1"><h3 className="font-semibold text-gray-800 text-base">{section.title}</h3><p className="text-sm text-gray-500">{section.items.length} itens</p></div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-[#F5F0FF]/50 to-[#FFF5EE]/50 rounded-xl p-4 border-l-4 border-[#DCD0FF]">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#B8A9C9] flex-shrink-0 mt-0.5" />
                        <div className="flex-1"><h4 className="font-semibold text-gray-800 text-base">{item.title}</h4><p className="text-base text-gray-600 mt-1">{item.description}</p><p className="text-sm text-gray-400 mt-2 italic">Fonte: {item.fonte}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="bg-gradient-to-r from-[#FFCBA4]/30 to-[#DCD0FF]/30 rounded-2xl p-4 mt-4">
        <div className="flex items-center gap-2 mb-2"><ExternalLink className="w-5 h-5 text-[#B8A9C9]" /><h3 className="font-semibold text-gray-700 text-base">Precisa de ajuda?</h3></div>
        <p className="text-base text-gray-600">Em caso de violação dos seus direitos, procure o sindicato da sua categoria, o Ministério do Trabalho ou a Defensoria Pública.</p>
      </div>
    </div>
  );
}
