import { useState } from 'react';
import { MapPin, Building2, Droplets, Cross, Phone, Navigation, ExternalLink } from 'lucide-react';
import { useStore } from '../store';

const locais = [
  { id: 1, name: 'Hospital Maternidade Santa Clara', type: 'hospital', address: 'Rua das Flores, 123 - Centro', phone: '(11) 3333-4444', distance: '1.2 km' },
  { id: 2, name: 'Banco de Leite Humano Central', type: 'milkBank', address: 'Av. Brasil, 500 - Jardim América', phone: '(11) 5555-6666', distance: '2.5 km' },
  { id: 3, name: 'UBS Jardim Esperança', type: 'ubs', address: 'Rua da Paz, 45 - Jardim Esperança', phone: '(11) 7777-8888', distance: '0.8 km' },
  { id: 4, name: 'Hospital e Maternidade São Lucas', type: 'hospital', address: 'Av. Paulista, 1500 - Bela Vista', phone: '(11) 4444-5555', distance: '3.1 km' },
  { id: 5, name: 'Banco de Leite Regional Sul', type: 'milkBank', address: 'Rua dos Pinheiros, 890', phone: '(11) 6666-7777', distance: '4.2 km' },
  { id: 6, name: 'UBS Vila Mariana', type: 'ubs', address: 'Rua Domingos de Moraes, 200', phone: '(11) 8888-9999', distance: '1.5 km' },
];

const typeConfig = {
  hospital: { icon: Building2, label: 'Hospital', color: 'bg-[#FFCBA4]', textColor: 'text-[#FFCBA4]' },
  milkBank: { icon: Droplets, label: 'Banco de Leite', color: 'bg-[#DCD0FF]', textColor: 'text-[#B8A9C9]' },
  ubs: { icon: Cross, label: 'UBS', color: 'bg-[#B8A9C9]', textColor: 'text-[#B8A9C9]' }
};

export default function MapaLocais() {
  const { t } = useStore();
  const [filter, setFilter] = useState('all');
  const filteredLocais = filter === 'all' ? locais : locais.filter(l => l.type === filter);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2"><MapPin className="w-6 h-6 text-[#FFCBA4]" /><h2 className="text-xl font-bold text-gray-800">{t('nearbyPlaces')}</h2></div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[{ id: 'all', label: 'Todos' }, { id: 'hospital', label: t('hospitals') }, { id: 'milkBank', label: t('milkBanks') }, { id: 'ubs', label: t('healthCenters') }].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 py-2 rounded-full text-base font-medium whitespace-nowrap transition-all ${filter === f.id ? 'bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#DCD0FF]'}`}>{f.label}</button>
        ))}
      </div>
      <div className="bg-gradient-to-br from-[#E6E6FA]/30 to-[#FFDAB9]/30 rounded-2xl p-6 text-center border-2 border-dashed border-[#DCD0FF]">
        <MapPin className="w-12 h-12 text-[#B8A9C9] mx-auto mb-2" /><p className="text-gray-500 text-base">Mapa interativo</p><p className="text-sm text-gray-400">(Visualização simulada)</p>
      </div>
      <div className="space-y-3">
        {filteredLocais.map(local => {
          const config = typeConfig[local.type];
          const Icon = config.icon;
          return (
            <div key={local.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E6E6FA]/30">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center flex-shrink-0`}><Icon className="w-6 h-6 text-white" /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 text-base truncate">{local.name}</h3>
                  <p className="text-base text-gray-500 truncate">{local.address}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`text-base font-medium ${config.textColor}`}><Navigation className="w-3 h-3 inline mr-1" />{local.distance}</span>
                    <span className="text-base text-gray-400">{local.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-2 bg-[#E6E6FA]/30 text-[#B8A9C9] rounded-xl text-base font-medium hover:bg-[#E6E6FA]/50 transition-colors flex items-center justify-center gap-1"><Phone className="w-4 h-4" />{t('call')}</button>
                <button className="flex-1 py-2 bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white rounded-xl text-base font-medium hover:shadow-md transition-all flex items-center justify-center gap-1"><ExternalLink className="w-4 h-4" />{t('viewOnMap')}</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
