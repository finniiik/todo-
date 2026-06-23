import React, { useEffect, useState } from 'react';
import { Header } from './components/layout/Header.jsx';
import { Content } from './components/layout/Content.jsx';
import { TasksProvider } from './context/TasksContext.jsx';

const THEME_KEY = 'todoist_theme_v1';

export const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) === 'dark';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
    } catch (e) {
      return;
    }
  }, [darkMode]);

  return (
    <TasksProvider>
      <main className={darkMode ? 'darkmode' : undefined}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Content />
      </main>
    </TasksProvider>
  );
};
