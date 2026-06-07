import React, { useState } from 'react';
import { Header } from './components/layout/Header.jsx';
import { Content } from './components/layout/Content.jsx';

export const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className={darkMode ? 'darkmode' : undefined}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Content />
    </main>
  );
};
