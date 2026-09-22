import { useEffect, useState } from 'react';

import {
  MapPin,
  Building2,
  Droplets,
  Cross,
  Navigation,
  ExternalLink,
  Loader,
  AlertCircle,
} from 'lucide-react';

import { useStore } from '../store';

const locationTypes = {
  hospital: {
    icon: Building2,
    labelKey: 'hospitalMaternity',
    queryPt: 'hospital maternidade',
    queryEn: 'hospital maternity',
    color: 'bg-[#FFCBA4]',
    textColor: 'text-[#FFCBA4]',
  },
  milkBank: {
    icon: Droplets,
    labelKey: 'milkBank',
    queryPt: 'banco de leite humano',
    queryEn: 'human milk bank',
    color: 'bg-[#DCD0FF]',
    textColor: 'text-[#B8A9C9]',
  },
  ubs: {
    icon: Cross,
    labelKey: 'healthCenter',
    queryPt: 'UBS posto de saude',
    queryEn: 'health center clinic',
    color: 'bg-[#B8A9C9]',
    textColor: 'text-[#B8A9C9]',
  },
};

export default function MapaLocais() {
  const { language, t } = useStore();

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
            lng: position.coords.longitude,
          });

          setLoading(false);
        },
        () => {
          setError(t('locationPermissionError'));
          setLoading(false);
        }
      );

      return;
    }

    setError(t('geolocationNotSupported'));
    setLoading(false);
  }, [t]);

  function getQuery(type) {
    const locationType = locationTypes[type];

    if (!locationType) {
      return language === 'en'
        ? 'hospital maternity human milk bank health center'
        : 'hospital maternidade banco de leite UBS';
    }

    return language === 'en'
      ? locationType.queryEn
      : locationType.queryPt;
  }

  function openGoogleMaps(type) {
    if (!location) {
      return;
    }

    const query = getQuery(type);

    const url = `https://www.google.com/maps/search/${encodeURIComponent(
      query
    )}/@${location.lat},${location.lng},14z`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function openAllLocations() {
    if (!location) {
      return;
    }

    const query =
      language === 'en'
        ? 'hospital maternity human milk bank health center'
        : 'hospital maternidade banco de leite UBS';

    const url = `https://www.google.com/maps/search/${encodeURIComponent(
      query
    )}/@${location.lat},${location.lng},13z`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function openMyLocation() {
    if (!location) {
      return;
    }

    const url = `https://www.google.com/maps/@${location.lat},${location.lng},15z`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const visibleLocationTypes =
    filter === 'all'
      ? Object.entries(locationTypes)
      : [[filter, locationTypes[filter]]].filter(
          ([, config]) => Boolean(config)
        );

  return (
    <div className="space-y-4 p-4">
      <div className="mb-2 flex items-center gap-2">
        <MapPin className="h-6 w-6 text-[#FFCBA4]" />

        <h2 className="text-xl font-bold text-gray-800">
          {t('nearbyPlaces')}
        </h2>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-gradient-to-r from-[#E6E6FA]/40 to-[#FFDAB9]/40 p-6 text-center">
          <Loader className="mx-auto mb-3 h-10 w-10 animate-spin text-[#B8A9C9]" />

          <p className="text-base text-gray-600">
            {t('gettingLocation')}
          </p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />

            <p className="font-medium">
              {t('locationUnavailable')}
            </p>
          </div>

          <p className="text-sm text-red-500">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-3 rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-200"
          >
            {t('tryAgain')}
          </button>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-[#DCD0FF] bg-gradient-to-r from-[#FFDAB9]/30 to-[#E6E6FA]/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Navigation className="h-6 w-6 text-[#FFCBA4]" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    {t('yourLocation')}
                  </p>

                  <p className="font-semibold text-gray-800">
                    {t('locationObtained')}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={openMyLocation}
                className="rounded-xl bg-white p-2 shadow-sm transition-all hover:shadow-md"
                aria-label={t('openMyLocation')}
                title={t('openMyLocation')}
              >
                <ExternalLink className="h-5 w-5 text-[#B8A9C9]" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-base font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white shadow-md'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-[#DCD0FF]'
              }`}
            >
              {t('all')}
            </button>

            {Object.entries(locationTypes).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-base font-medium transition-all ${
                  filter === key
                    ? 'bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white shadow-md'
                    : 'border border-gray-200 bg-white text-gray-600 hover:border-[#DCD0FF]'
                }`}
              >
                {t(config.labelKey)}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={openAllLocations}
            className="w-full rounded-2xl border-2 border-dashed border-[#DCD0FF] bg-gradient-to-br from-[#E6E6FA]/30 to-[#FFDAB9]/30 p-6 text-center transition-all hover:border-[#FFCBA4] hover:from-[#E6E6FA]/50 hover:to-[#FFDAB9]/50"
          >
            <MapPin className="mx-auto mb-2 h-12 w-12 text-[#B8A9C9]" />

            <p className="text-base font-medium text-gray-600">
              {t('openGoogleMaps')}
            </p>

            <p className="text-sm text-gray-400">
              {t('withCurrentLocation')}
            </p>
          </button>

          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-700">
              {t('searchByType')}
            </h3>

            {visibleLocationTypes.map(([key, config]) => {
              const Icon = config.icon;

              return (
                <div
                  key={key}
                  className="rounded-2xl border border-[#E6E6FA]/30 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${config.color}`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-800">
                        {t(config.labelKey)}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {t('findNearestLocation')}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => openGoogleMaps(key)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] py-2 text-base font-medium text-white transition-all hover:shadow-md"
                    >
                      <MapPin className="h-4 w-4" />
                      {t('searchOnMap')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl bg-[#F5F0FF] p-4">
            <p className="text-sm text-gray-600">
              <strong>{t('tip')}:</strong> {t('mapTipDescription')}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
