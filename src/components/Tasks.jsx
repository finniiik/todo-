import React from 'react';
import { Checkbox } from './Checkbox.jsx';
import { AddTask } from './AddTask.jsx';
import { useTasks } from '../context/TasksContext.jsx';

export const Tasks = () => {
  const { tasks, deleteTask } = useTasks();

  return (
    <div className="tasks">
      <h2>Inbox</h2>

      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={task.id}>
            <Checkbox id={task.id} completed={task.completed} />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.6 : 1,
                flex: 1,
              }}
            >
              {task.text}
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={() => deleteTask(task.id)}
              style={{ cursor: 'pointer', marginLeft: 8, color: '#cc5050' }}
            >
              ✕
            </span>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
};
