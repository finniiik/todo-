import React, { useState } from 'react';
import { useTasks } from '../context/TasksContext.jsx';

export const AddTask = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const { addTask } = useTasks();

  const handleAdd = () => {
    if (!text.trim()) return;
    addTask(text);
    setText('');
    setShow(false);
  };

  return (
    <div className="add-task">
      {show && (
        <div className="add-task__main">
          <input
            className="add-task__content"
            type="text"
            placeholder="Start typing your task here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            autoFocus
          />
          <button className="add-task__submit" type="button" onClick={handleAdd}>
            Add Task
          </button>
          <span
            className="add-task__cancel"
            role="button"
            tabIndex={0}
            onClick={() => {
              setShow(false);
              setText('');
            }}
          >
            Cancel
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
        <span className="add-task__text">Add Task</span>
      </span>
    </div>
  );
};
