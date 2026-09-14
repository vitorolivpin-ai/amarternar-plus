import { useState } from 'react';
import { Droplets, Clock, Plus, FileText, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useStore } from '../store';

export default function Ordenha() {
  const { t, ordenhaRecords, addOrdenhaRecord, getNextPumpingEstimate } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ date: new Date().toISOString().slice(0, 16), duration: '', quantity: '', breast: 'both', notes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.duration) return;
    addOrdenhaRecord({ date: new Date(formData.date).toISOString(), duration: parseInt(formData.duration), quantity: formData.quantity ? parseInt(formData.quantity) : null, breast: formData.breast, notes: formData.notes });
    setFormData({ date: new Date().toISOString().slice(0, 16), duration: '', quantity: '', breast: 'both', notes: '' });
    setShowForm(false);
  };

  const nextEstimate = getNextPumpingEstimate();
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const breastLabel = { left: t('left'), right: t('right'), both: t('both') };

  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(); date.setDate(date.getDate() - i);
    const dayStr = date.toLocaleDateString('pt-BR', { weekday: 'short' });
    const count = ordenhaRecords.filter(r => new Date(r.date).toDateString() === date.toDateString()).length;
    chartData.push({ day: dayStr, count });
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><Droplets className="w-6 h-6 text-[#B8A9C9]" /><h2 className="text-xl font-bold text-gray-800">{t('pumpingRecord')}</h2></div>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-base"><Plus className="w-4 h-4" />{t('register')}</button>
      </div>
      {nextEstimate && (
        <div className="bg-gradient-to-r from-[#E6E6FA]/40 to-[#FFDAB9]/40 rounded-2xl p-4 border border-dashed border-[#DCD0FF]">
          <div className="flex items-center gap-3"><div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"><Clock className="w-6 h-6 text-[#B8A9C9]" /></div><div><p className="text-base text-gray-500">{t('nextPumping')}</p><p className="text-lg font-bold text-[#B8A9C9]">{nextEstimate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p></div></div>
        </div>
      )}
      {showForm && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E6E6FA]/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-base font-medium text-gray-600 mb-1">{t('dateTime')}</label><input type="datetime-local" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 bg-[#F5F0FF]/50 border border-[#E6E6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DCD0FF] text-base" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-base font-medium text-gray-600 mb-1">{t('duration')}</label><input type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-3 bg-[#F5F0FF]/50 border border-[#E6E6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DCD0FF] text-base" placeholder="15" required /></div>
              <div><label className="block text-base font-medium text-gray-600 mb-1">{t('quantity')} ({t('optional')})</label><input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="w-full px-4 py-3 bg-[#F5F0FF]/50 border border-[#E6E6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DCD0FF] text-base" placeholder="120" /></div>
            </div>
            <div><label className="block text-base font-medium text-gray-600 mb-2">{t('whichBreast')}</label><div className="flex gap-2">{['left', 'right', 'both'].map(option => (<button key={option} type="button" onClick={() => setFormData({ ...formData, breast: option })} className={`flex-1 py-2 px-3 rounded-xl font-medium transition-all text-base ${formData.breast === option ? 'bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{breastLabel[option]}</button>))}</div></div>
            <div><label className="block text-base font-medium text-gray-600 mb-1">{t('notes')} ({t('optional')})</label><textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full px-4 py-3 bg-[#F5F0FF]/50 border border-[#E6E6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DCD0FF] resize-none text-base" rows={2} placeholder="Observações..." /></div>
            <div className="flex gap-3"><button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 text-base">{t('cancel')}</button><button type="submit" className="flex-1 py-3 bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white rounded-xl font-medium shadow-md hover:shadow-lg text-base">{t('save')}</button></div>
          </form>
        </div>
      )}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E6E6FA]/30">
        <div className="flex items-center gap-2 mb-4"><TrendingUp className="w-5 h-5 text-[#FFCBA4]" /><h3 className="font-semibold text-gray-700 text-base">{t('frequency')}</h3></div>
        <ResponsiveContainer width="100%" height={150}><BarChart data={chartData}><XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip /><Bar dataKey="count" fill="#DCD0FF" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3"><FileText className="w-5 h-5 text-[#B8A9C9]" /><h3 className="font-semibold text-gray-700 text-base">{t('history')}</h3></div>
        <div className="space-y-2">
          {ordenhaRecords.length === 0 ? (<div className="bg-white rounded-xl p-6 text-center"><Droplets className="w-10 h-10 text-gray-300 mx-auto mb-2" /><p className="text-gray-400 text-base">{t('noRecords')}</p></div>) : (
            ordenhaRecords.slice(0, 10).map(record => (
              <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm border border-[#E6E6FA]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 bg-[#E6E6FA]/30 rounded-lg flex items-center justify-center"><Droplets className="w-5 h-5 text-[#B8A9C9]" /></div><div><p className="font-medium text-gray-700 text-base">{record.duration} min</p><p className="text-sm text-gray-400">{formatDate(record.date)}</p></div></div>
                  <div className="text-right"><p className="font-semibold text-[#FFCBA4] text-base">{record.quantity ? `${record.quantity} ml` : '-'}</p><p className="text-sm text-gray-400">{breastLabel[record.breast]}</p></div>
                </div>
                {record.notes && <p className="text-base text-gray-500 mt-2 pt-2 border-t border-gray-100">{record.notes}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
