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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
    } catch (e) {}
    // Apply theme to <html> and <body> so the browser chrome (incl. mobile)
    // and the area outside the app container are also dark.
    const root = document.documentElement;
    const body = document.body;
    if (darkMode) {
      root.classList.add('darkmode');
      body.classList.add('darkmode');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('darkmode');
      body.classList.remove('darkmode');
      root.style.colorScheme = 'light';
    }
  }, [darkMode]);

  return (
    <TasksProvider>
      <main className={darkMode ? 'darkmode' : undefined}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Content sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </main>
    </TasksProvider>
  );
};
