import { Phone, X, Heart, AlertTriangle, Info, Shield } from 'lucide-react';
import { useStore } from '../store';

const emergencyNumbers = [
  { id: 1, name: 'SAMU', number: '192', description: 'Serviço de Atendimento Móvel de Urgência', color: 'bg-red-500', icon: AlertTriangle },
  { id: 2, name: 'CVV', number: '188', description: 'Apoio emocional e prevenção do suicídio', color: 'bg-[#B8A9C9]', icon: Heart },
  { id: 3, name: 'Disque Saúde', number: '136', description: 'Informações de saúde e ouvidoria do SUS', color: 'bg-[#FFCBA4]', icon: Info },
  { id: 4, name: 'Polícia', number: '190', description: 'Polícia Militar - Emergências', color: 'bg-blue-500', icon: Shield },
  { id: 5, name: 'Bombeiros', number: '193', description: 'Corpo de Bombeiros - Resgate', color: 'bg-orange-500', icon: AlertTriangle }
];

export default function Emergencias({ onClose }) {
  const { t } = useStore();
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2"><div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center"><Phone className="w-5 h-5 text-red-500" /></div><h2 className="text-xl font-bold text-gray-800">{t('emergencyNumbers')}</h2></div>
        {onClose && <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500" /></button>}
      </div>
      <div className="space-y-3">
        {emergencyNumbers.map(item => {
          const Icon = item.icon;
          return (
            <button key={item.id} className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left flex items-center gap-4 group">
              <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}><Icon className="w-7 h-7 text-white" /></div>
              <div className="flex-1"><div className="flex items-center justify-between"><h3 className="font-bold text-gray-800 text-lg">{item.name}</h3><span className="text-2xl font-bold text-gray-800">{item.number}</span></div><p className="text-base text-gray-500 mt-1">{item.description}</p></div>
            </button>
          );
        })}
      </div>
      <p className="text-center text-sm text-gray-400 mt-4">Toque em um número para ligar</p>
    </div>
  );
}
