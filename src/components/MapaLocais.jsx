import { useState, useEffect } from 'react';
import { MapPin, Building2, Droplets, Cross, Phone, Navigation, ExternalLink, Loader, AlertCircle } from 'lucide-react';
import { useStore } from '../store';

const tiposLocais = {
  hospital: { icon: Building2, label: 'Hospital/Maternidade', color: 'bg-[#FFCBA4]', textColor: 'text-[#FFCBA4]', query: 'hospital maternidade' },
  milkBank: { icon: Droplets, label: 'Banco de Leite', color: 'bg-[#DCD0FF]', textColor: 'text-[#B8A9C9]', query: 'banco de leite humano' },
  ubs: { icon: Cross, label: 'UBS', color: 'bg-[#B8A9C9]', textColor: 'text-[#B8A9C9]', query: 'UBS posto de saude' }
};

export default function MapaLocais() {
  const { t } = useStore();
  const [filter, setFilter] = useState('all');
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (err) => {
          setError('Não foi possível obter sua localização. Por favor, permita o acesso à localização no navegador.');
          setLoading(false);
        }
      );
    } else {
      setError('Seu navegador não suporta geolocalização.');
      setLoading(false);
    }
  }, []);

  const abrirNoGoogleMaps = (tipo) => {
    if (location) {
      const query = tiposLocais[tipo]?.query || 'hospital maternidade banco de leite';
      const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${location.lat},${location.lng},14z`;
      window.open(url, '_blank');
    }
  };

  const abrirTodosLocais = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/hospital+maternidade+banco+de+leite+UBS/@${location.lat},${location.lng},13z`;
      window.open(url, '_blank');
    }
  };

  const abrirMinhaLocalizacao = () => {
    if (location) {
      const url = `https://www.google.com/maps/@${location.lat},${location.lng},15z`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-6 h-6 text-[#FFCBA4]" />
        <h2 className="text-xl font-bold text-gray-800">{t('nearbyPlaces')}</h2>
      </div>

      {/* Status da Localização */}
      {loading ? (
        <div className="bg-gradient-to-r from-[#E6E6FA]/40 to-[#FFDAB9]/40 rounded-2xl p-6 text-center">
          <Loader className="w-10 h-10 text-[#B8A9C9] mx-auto mb-3 animate-spin" />
          <p className="text-gray-600 text-base">Obtendo sua localização...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">Localização não disponível</p>
          </div>
          <p className="text-red-500 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 px-4 py-2 bg-red-100 text-red-600 rounded-xl text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      ) : (
        <>
          {/* Localização Atual */}
          <div className="bg-gradient-to-r from-[#FFDAB9]/30 to-[#E6E6FA]/30 rounded-2xl p-4 border border-[#DCD0FF]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Navigation className="w-6 h-6 text-[#FFCBA4]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sua localização</p>
                  <p className="font-semibold text-gray-800">Localização obtida com sucesso!</p>
                </div>
              </div>
              <button
                onClick={abrirMinhaLocalizacao}
                className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <ExternalLink className="w-5 h-5 text-[#B8A9C9]" />
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-base font-medium whitespace-nowrap transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#DCD0FF]'
              }`}
            >
              Todos
            </button>
            {Object.entries(tiposLocais).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-base font-medium whitespace-nowrap transition-all ${
                  filter === key
                    ? 'bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#DCD0FF]'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>

          {/* Mapa Preview */}
          <div 
            onClick={abrirTodosLocais}
            className="bg-gradient-to-br from-[#E6E6FA]/30 to-[#FFDAB9]/30 rounded-2xl p-6 text-center border-2 border-dashed border-[#DCD0FF] cursor-pointer hover:border-[#FFCBA4] hover:from-[#E6E6FA]/50 hover:to-[#FFDAB9]/50 transition-all"
          >
            <MapPin className="w-12 h-12 text-[#B8A9C9] mx-auto mb-2" />
            <p className="text-gray-600 text-base font-medium">Toque para abrir o Google Maps</p>
            <p className="text-sm text-gray-400">com sua localização atual</p>
          </div>

          {/* Cards de Busca Rápida */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-base">Buscar por tipo:</h3>
            
            {(filter === 'all' ? Object.entries(tiposLocais) : [[filter, tiposLocais[filter]]]).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E6E6FA]/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-base">{config.label}</h3>
                      <p className="text-sm text-gray-500">Encontre o mais próximo de você</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => abrirNoGoogleMaps(key)}
                      className="flex-1 py-2 bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white rounded-xl text-base font-medium hover:shadow-md transition-all flex items-center justify-center gap-1"
                    >
                      <MapPin className="w-4 h-4" />
                      Buscar no Mapa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dica */}
          <div className="bg-[#F5F0FF] rounded-xl p-4 mt-4">
            <p className="text-sm text-gray-600">
              <strong>Dica:</strong> Ao clicar em "Buscar no Mapa", o Google Maps abrirá com os locais mais próximos de você. Você pode ligar diretamente ou traçar uma rota.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

