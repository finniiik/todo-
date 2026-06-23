import React, { useState } from 'react';
import { Checkbox } from './Checkbox.jsx';
import { AddTask } from './AddTask.jsx';
import { useTasks } from '../context/TasksContext.jsx';
import { formatDueDate, isOverdue } from '../helpers/date.js';

export const Tasks = () => {
  const {
    visibleTasks,
    deleteTask,
    updateTask,
    stats,
    filter,
    setFilter,
    search,
    setSearch,
    clearCompleted,
    loading,
  } = useTasks();

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const saveEdit = async () => {
    const value = editingText.trim();
    if (editingId && value) {
      await updateTask(editingId, { text: value });
    }
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="tasks">
      <h2>Входящие</h2>

      <div className="tasks__toolbar">
        <input
          type="search"
          className="tasks__search"
          placeholder="Поиск задач"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="tasks__filters">
          <button
            type="button"
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button
            type="button"
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Активные
          </button>
          <button
            type="button"
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Выполненные
          </button>
        </div>
      </div>

      <div className="tasks__stats">
        <span>Всего: {stats.total}</span>
        <span>Выполнено: {stats.completed}</span>
        <span>Осталось: {stats.remaining}</span>
        <button
          type="button"
          className="tasks__clear"
          onClick={clearCompleted}
          disabled={stats.completed === 0}
        >
          Очистить выполненные
        </button>
      </div>

      {loading ? (
        <p className="tasks__empty">Загрузка...</p>
      ) : visibleTasks.length === 0 ? (
        <p className="tasks__empty">Задач пока нет</p>
      ) : (
        <ul className="tasks__list">
          {visibleTasks.map((task) => (
            <li key={task.id}>
              <Checkbox id={task.id} completed={task.completed} />
              <div className="tasks__row">
                {editingId === task.id ? (
                  <input
                    className="tasks__edit"
                    type="text"
                    autoFocus
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={saveEdit}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                  />
                ) : (
                  <span
                    className={
                      task.completed ? 'tasks__text completed' : 'tasks__text'
                    }
                    onDoubleClick={() => startEdit(task)}
                    title="Двойной клик для редактирования"
                  >
                    {task.text}
                  </span>
                )}
                {task.dueDate && (
                  <span
                    className={
                      isOverdue(task.dueDate) && !task.completed
                        ? 'tasks__date overdue'
                        : 'tasks__date'
                    }
                  >
                    {formatDueDate(task.dueDate)}
                  </span>
                )}
              </div>
              <span
                className="tasks__delete"
                role="button"
                tabIndex={0}
                onClick={() => deleteTask(task.id)}
              >
                ✕
              </span>
            </li>
          ))}
        </ul>
      )}

      <AddTask />
    </div>
  );
};
