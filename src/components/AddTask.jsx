import React, { useState } from 'react';

export const AddTask = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="add-task">
      {show && (
        <div className="add-task__main">
          <input
            className="add-task__content"
            type="text"
            placeholder="Start typing your task here"
          />
          <button className="add-task__submit" type="button">
            Add Task
          </button>
          <span
            className="add-task__cancel"
            role="button"
            tabIndex={0}
            onClick={() => setShow(false)}
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
