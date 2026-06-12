import React, { createContext, useContext, useState } from 'react';

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    const value = text.trim();
    if (!value) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: value, completed: false },
    ]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
