import React, { useState } from 'react';
import { Header } from './components/layout/Header.jsx';
import { Content } from './components/layout/Content.jsx';
import { TasksProvider } from './context/TasksContext.jsx';

export const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <TasksProvider>
      <main className={darkMode ? 'darkmode' : undefined}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Content />
      </main>
    </TasksProvider>
  );
};
