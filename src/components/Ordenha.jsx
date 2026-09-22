import { useState } from 'react';

import {
  Droplets,
  Clock,
  Plus,
  FileText,
  TrendingUp,
} from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { useStore } from '../store';

export default function Ordenha() {
  const {
    language,
    t,
    ordenhaRecords,
    addOrdenhaRecord,
    getNextPumpingEstimate,
  } = useStore();

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 16),
    duration: '',
    quantity: '',
    breast: 'both',
    notes: '',
  });

  const locale = language === 'en' ? 'en-US' : 'pt-BR';

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.duration) {
      return;
    }

    addOrdenhaRecord({
      date: new Date(formData.date).toISOString(),
      duration: parseInt(formData.duration, 10),
      quantity: formData.quantity
        ? parseInt(formData.quantity, 10)
        : null,
      breast: formData.breast,
      notes: formData.notes,
    });

    setFormData({
      date: new Date().toISOString().slice(0, 16),
      duration: '',
      quantity: '',
      breast: 'both',
      notes: '',
    });

    setShowForm(false);
  }

  const nextEstimate = getNextPumpingEstimate();

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const breastLabel = {
    left: t('left'),
    right: t('right'),
    both: t('both'),
  };

  const chartData = [];

  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);

    const day = date.toLocaleDateString(locale, {
      weekday: 'short',
    });

    const count = ordenhaRecords.filter(
      (record) =>
        new Date(record.date).toDateString() === date.toDateString()
    ).length;

    chartData.push({
      day,
      count,
    });
  }

  return (
    <div className="space-y-4 p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-[#B8A9C9]" />

          <h2 className="text-xl font-bold text-gray-800">
            {t('pumpingRecord')}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] px-4 py-2 text-base font-medium text-white shadow-md transition-all hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          {t('register')}
        </button>
      </div>

      {nextEstimate && (
        <div className="rounded-2xl border border-dashed border-[#DCD0FF] bg-gradient-to-r from-[#E6E6FA]/40 to-[#FFDAB9]/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
              <Clock className="h-6 w-6 text-[#B8A9C9]" />
            </div>

            <div>
              <p className="text-base text-gray-500">
                {t('nextPumping')}
              </p>

              <p className="text-lg font-bold text-[#B8A9C9]">
                {nextEstimate.toLocaleTimeString(locale, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="rounded-2xl border border-[#E6E6FA]/30 bg-white p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-base font-medium text-gray-600">
                {t('dateTime')}
              </label>

              <input
                type="datetime-local"
                value={formData.date}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    date: event.target.value,
                  })
                }
                className="w-full rounded-xl border border-[#E6E6FA] bg-[#F5F0FF]/50 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-base font-medium text-gray-600">
                  {t('duration')}
                </label>

                <input
                  type="number"
                  value={formData.duration}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      duration: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#E6E6FA] bg-[#F5F0FF]/50 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]"
                  placeholder="15"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-base font-medium text-gray-600">
                  {t('quantity')} ({t('optional')})
                </label>

                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      quantity: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#E6E6FA] bg-[#F5F0FF]/50 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]"
                  placeholder="120"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-base font-medium text-gray-600">
                {t('whichBreast')}
              </label>

              <div className="flex gap-2">
                {['left', 'right', 'both'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        breast: option,
                      })
                    }
                    className={`flex-1 rounded-xl px-3 py-2 text-base font-medium transition-all ${
                      formData.breast === option
                        ? 'bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {breastLabel[option]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-base font-medium text-gray-600">
                {t('notes')} ({t('optional')})
              </label>

              <textarea
                value={formData.notes}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    notes: event.target.value,
                  })
                }
                className="w-full resize-none rounded-xl border border-[#E6E6FA] bg-[#F5F0FF]/50 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]"
                rows={2}
                placeholder={t('notesPlaceholder')}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-xl bg-gray-100 py-3 text-base font-medium text-gray-600 hover:bg-gray-200"
              >
                {t('cancel')}
              </button>

              <button
                type="submit"
                className="flex-1 rounded-xl bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] py-3 text-base font-medium text-white shadow-md hover:shadow-lg"
              >
                {t('save')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-2xl border border-[#E6E6FA]/30 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#FFCBA4]" />

          <h3 className="text-base font-semibold text-gray-700">
            {t('frequency')}
          </h3>
        </div>

        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis hide />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#DCD0FF"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#B8A9C9]" />

          <h3 className="text-base font-semibold text-gray-700">
            {t('history')}
          </h3>
        </div>

        <div className="space-y-2">
          {ordenhaRecords.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center">
              <Droplets className="mx-auto mb-2 h-10 w-10 text-gray-300" />

              <p className="text-base text-gray-400">
                {t('noRecords')}
              </p>
            </div>
          ) : (
            ordenhaRecords.slice(0, 10).map((record) => (
              <div
                key={record.id}
                className="rounded-xl border border-[#E6E6FA]/30 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6E6FA]/30">
                      <Droplets className="h-5 w-5 text-[#B8A9C9]" />
                    </div>

                    <div>
                      <p className="text-base font-medium text-gray-700">
                        {record.duration} {t('minutes')}
                      </p>

                      <p className="text-sm text-gray-400">
                        {formatDate(record.date)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-semibold text-[#FFCBA4]">
                      {record.quantity
                        ? `${record.quantity} ${t('milliliters')}`
                        : '-'}
                    </p>

                    <p className="text-sm text-gray-400">
                      {breastLabel[record.breast]}
                    </p>
                  </div>
                </div>

                {record.notes && (
                  <p className="mt-2 border-t border-gray-100 pt-2 text-base text-gray-500">
                    {record.notes}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
