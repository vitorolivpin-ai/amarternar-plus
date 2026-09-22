import { useState } from 'react';

import {
  Plus,
  Baby,
  Heart,
  User,
  Trash2,
  ChevronRight,
  ChevronLeft,
  X,
  Calendar,
} from 'lucide-react';

import { useStore } from '../store';

const categoryConfig = {
  baby: {
    labelKey: 'baby',
    color: 'bg-[#E6E6FA]',
    textColor: 'text-[#B8A9C9]',
    icon: Baby,
  },
  breastfeeding: {
    labelKey: 'breastfeeding',
    color: 'bg-[#FFDAB9]',
    textColor: 'text-[#FFCBA4]',
    icon: Heart,
  },
  mother: {
    labelKey: 'mother',
    color: 'bg-pink-100',
    textColor: 'text-pink-400',
    icon: User,
  },
};

export default function KanbanBoard() {
  const {
    t,
    tasks,
    addTask,
    moveTask,
    deleteTask,
  } = useStore();

  const [showModal, setShowModal] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    category: 'baby',
    date: '',
  });

  const columns = [
    {
      id: 'todo',
      label: t('toDo'),
      color: 'from-gray-100 to-gray-50',
    },
    {
      id: 'inProgress',
      label: t('inProgress'),
      color: 'from-[#E6E6FA]/50 to-[#DCD0FF]/30',
    },
    {
      id: 'done',
      label: t('done'),
      color: 'from-green-50 to-emerald-50',
    },
  ];

  function handleAddTask() {
    if (!newTask.title.trim()) {
      return;
    }

    addTask({
      ...newTask,
      status: 'todo',
    });

    setNewTask({
      title: '',
      category: 'baby',
      date: '',
    });

    setShowModal(false);
  }

  function handleMove(taskId, direction) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    const statusOrder = ['todo', 'inProgress', 'done'];
    const currentIndex = statusOrder.indexOf(task.status);

    const newIndex =
      direction === 'right'
        ? currentIndex + 1
        : currentIndex - 1;

    if (newIndex >= 0 && newIndex < statusOrder.length) {
      moveTask(taskId, statusOrder[newIndex]);
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          {t('kanban')}
        </h2>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] px-4 py-2 text-base font-medium text-white shadow-md transition-all hover:shadow-lg"
        >
          <Plus className="h-4 w-4" />
          {t('addTask')}
        </button>
      </div>

      <div className="space-y-4">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.id
          );

          return (
            <div
              key={column.id}
              className={`rounded-2xl bg-gradient-to-br ${column.color} p-4`}
            >
              <h3 className="mb-3 flex items-center justify-between text-base font-semibold text-gray-700">
                {column.label}

                <span className="rounded-full bg-white/50 px-2 py-0.5 text-sm">
                  {columnTasks.length}
                </span>
              </h3>

              <div className="space-y-2">
                {columnTasks.map((task) => {
                  const config =
                    categoryConfig[task.category] ||
                    categoryConfig.baby;

                  const Icon = config.icon;

                  return (
                    <div
                      key={task.id}
                      className="rounded-xl bg-white p-3 shadow-sm"
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${config.color}`}
                        >
                          <Icon
                            className={`h-4 w-4 ${config.textColor}`}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-base font-medium text-gray-700">
                            {task.title}
                          </p>

                          {task.date && (
                            <p className="mt-1 flex items-center gap-1 text-sm text-gray-400">
                              <Calendar className="h-3 w-3" />
                              {task.date}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
                        <div className="flex gap-1">
                          {column.id !== 'todo' && (
                            <button
                              type="button"
                              onClick={() =>
                                handleMove(task.id, 'left')
                              }
                              className="rounded-lg bg-gray-100 p-1.5 hover:bg-gray-200"
                              aria-label={t('moveTaskBack')}
                              title={t('moveTaskBack')}
                            >
                              <ChevronLeft className="h-4 w-4 text-gray-600" />
                            </button>
                          )}

                          {column.id !== 'done' && (
                            <button
                              type="button"
                              onClick={() =>
                                handleMove(task.id, 'right')
                              }
                              className="rounded-lg bg-[#E6E6FA]/50 p-1.5 hover:bg-[#E6E6FA]"
                              aria-label={t('moveTaskForward')}
                              title={t('moveTaskForward')}
                            >
                              <ChevronRight className="h-4 w-4 text-[#B8A9C9]" />
                            </button>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteTask(task.id)}
                          className="rounded-lg p-1.5 text-red-400 hover:bg-red-50"
                          aria-label={t('deleteTask')}
                          title={t('deleteTask')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {columnTasks.length === 0 && (
                  <p className="py-4 text-center text-base text-gray-400">
                    {t('noTasks')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowModal(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={t('addTask')}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">
                {t('addTask')}
              </h3>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full p-1 hover:bg-gray-100"
                aria-label={t('close')}
                title={t('close')}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-base font-medium text-gray-600">
                  {t('taskTitle')}
                </label>

                <input
                  type="text"
                  value={newTask.title}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      title: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#E6E6FA] bg-[#F5F0FF]/50 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]"
                  placeholder={t('taskTitleExample')}
                />
              </div>

              <div>
                <label className="mb-2 block text-base font-medium text-gray-600">
                  {t('taskCategory')}
                </label>

                <div className="flex gap-2">
                  {Object.entries(categoryConfig).map(
                    ([key, config]) => {
                      const Icon = config.icon;

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() =>
                            setNewTask({
                              ...newTask,
                              category: key,
                            })
                          }
                          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 transition-all ${
                            newTask.category === key
                              ? `${config.color} ${config.textColor} shadow-md`
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          <Icon className="h-4 w-4" />

                          <span className="text-sm font-medium">
                            {t(config.labelKey)}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-base font-medium text-gray-600">
                  {t('taskDate')} ({t('optional')})
                </label>

                <input
                  type="date"
                  value={newTask.date}
                  onChange={(event) =>
                    setNewTask({
                      ...newTask,
                      date: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-[#E6E6FA] bg-[#F5F0FF]/50 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#DCD0FF]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-xl bg-gray-100 py-3 text-base font-medium text-gray-600 hover:bg-gray-200"
                >
                  {t('cancel')}
                </button>

                <button
                  type="button"
                  onClick={handleAddTask}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#FFCBA4] to-[#DCD0FF] py-3 text-base font-medium text-white shadow-md hover:shadow-lg"
                >
                  {t('save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
