import { useState } from 'react';
import { Plus, Baby, Heart, User, Trash2, ChevronRight, ChevronLeft, X, Calendar } from 'lucide-react';
import { useStore } from '../store';

const categoryConfig = {
  baby: { label: 'Bebê', color: 'bg-[#E6E6FA]', textColor: 'text-[#B8A9C9]', icon: Baby },
  breastfeeding: { label: 'Amamentação', color: 'bg-[#FFDAB9]', textColor: 'text-[#FFCBA4]', icon: Heart },
  mother: { label: 'Mãe', color: 'bg-pink-100', textColor: 'text-pink-400', icon: User }
};

export default function KanbanBoard() {
  const { t, tasks, addTask, moveTask, deleteTask } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', category: 'baby', date: '' });
  const columns = [
    { id: 'todo', label: t('toDo'), color: 'from-gray-100 to-gray-50' },
    { id: 'inProgress', label: t('inProgress'), color: 'from-[#E6E6FA]/50 to-[#DCD0FF]/30' },
    { id: 'done', label: t('done'), color: 'from-green-50 to-emerald-50' }
  ];

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    addTask({ ...newTask, status: 'todo' });
    setNewTask({ title: '', category: 'baby', date: '' });
    setShowModal(false);
  };

  const handleMove = (taskId, direction) => {
    const task = tasks.find(t => t.id === taskId);
    const statusOrder = ['todo', 'inProgress', 'done'];
    const currentIndex = statusOrder.indexOf(task.status);
    const newIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < statusOrder.length) moveTask(taskId, statusOrder[newIndex]);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Kanban</h2>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-base"><Plus className="w-4 h-4" />{t('addTask')}</button>
      </div>
      <div className="space-y-4">
        {columns.map(column => {
          const columnTasks = tasks.filter(t => t.status === column.id);
          return (
            <div key={column.id} className={`bg-gradient-to-br ${column.color} rounded-2xl p-4`}>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center justify-between text-base">{column.label}<span className="text-sm bg-white/50 px-2 py-0.5 rounded-full">{columnTasks.length}</span></h3>
              <div className="space-y-2">
                {columnTasks.map(task => {
                  const config = categoryConfig[task.category];
                  const Icon = config.icon;
                  return (
                    <div key={task.id} className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="flex items-start gap-2">
                        <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}><Icon className={`w-4 h-4 ${config.textColor}`} /></div>
                        <div className="flex-1 min-w-0"><p className="font-medium text-gray-700 text-base">{task.title}</p>{task.date && <p className="text-sm text-gray-400 flex items-center gap-1 mt-1"><Calendar className="w-3 h-3" />{task.date}</p>}</div>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                        <div className="flex gap-1">
                          {column.id !== 'todo' && <button onClick={() => handleMove(task.id, 'left')} className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>}
                          {column.id !== 'done' && <button onClick={() => handleMove(task.id, 'right')} className="p-1.5 bg-[#E6E6FA]/50 rounded-lg hover:bg-[#E6E6FA]"><ChevronRight className="w-4 h-4 text-[#B8A9C9]" /></button>}
                        </div>
                        <button onClick={() => deleteTask(task.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  );
                })}
                {columnTasks.length === 0 && <p className="text-center text-gray-400 text-base py-4">Nenhuma tarefa</p>}
              </div>
            </div>
          );
        })}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold text-gray-800">{t('addTask')}</h3><button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-full"><X className="w-5 h-5 text-gray-500" /></button></div>
            <div className="space-y-4">
              <div><label className="block text-base font-medium text-gray-600 mb-1">{t('taskTitle')}</label><input type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="w-full px-4 py-3 bg-[#F5F0FF]/50 border border-[#E6E6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DCD0FF] text-base" placeholder="Ex: Consulta pediatra" /></div>
              <div><label className="block text-base font-medium text-gray-600 mb-2">{t('taskCategory')}</label><div className="flex gap-2">{Object.entries(categoryConfig).map(([key, config]) => { const Icon = config.icon; return (<button key={key} onClick={() => setNewTask({ ...newTask, category: key })} className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${newTask.category === key ? `${config.color} ${config.textColor} shadow-md` : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}><Icon className="w-4 h-4" /><span className="text-sm font-medium">{config.label}</span></button>); })}</div></div>
              <div><label className="block text-base font-medium text-gray-600 mb-1">{t('taskDate')} ({t('optional')})</label><input type="date" value={newTask.date} onChange={(e) => setNewTask({ ...newTask, date: e.target.value })} className="w-full px-4 py-3 bg-[#F5F0FF]/50 border border-[#E6E6FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DCD0FF] text-base" /></div>
              <div className="flex gap-3 pt-2"><button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 text-base">{t('cancel')}</button><button onClick={handleAddTask} className="flex-1 py-3 bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] text-white rounded-xl font-medium shadow-md hover:shadow-lg text-base">{t('save')}</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
