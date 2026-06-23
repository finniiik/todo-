import React, { useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useTasks } from '../context/TasksContext.jsx';

export const AddTask = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { addTask } = useTasks();

  const reset = () => {
    setText('');
    setDueDate('');
    setShow(false);
  };

  const handleAdd = () => {
    if (!text.trim()) return;
    addTask(text, dueDate || null);
    reset();
  };

  return (
    <div className="add-task">
      {show && (
        <div className="add-task__main">
          <input
            className="add-task__content"
            type="text"
            placeholder="Введите название задачи"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            autoFocus
          />
          <div className="add-task__date">
            <FaRegCalendarAlt />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button
            className="add-task__submit"
            type="button"
            onClick={handleAdd}
          >
            Добавить задачу
          </button>
          <span
            className="add-task__cancel"
            role="button"
            tabIndex={0}
            onClick={reset}
          >
            Отмена
          </span>
        </div>
      )}
      <span
        className="add-task__shallow"
        role="button"
        tabIndex={0}
        onClick={() => setShow(!show)}
      >
        <span className="add-task__plus">+</span>
        <span className="add-task__text">Добавить задачу</span>
      </span>
    </div>
  );
};
