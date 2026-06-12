import React from 'react';
import { useTasks } from '../context/TasksContext.jsx';

export const Checkbox = ({ id, completed }) => {
  const { toggleTask } = useTasks();

  return (
    <div className="checkbox-holder" onClick={() => toggleTask(id)}>
      <span
        className="checkbox"
        role="button"
        tabIndex={0}
        style={completed ? { backgroundColor: '#ccc' } : undefined}
      />
    </div>
  );
};
