import React from 'react';
import { FaMoon, FaBars } from 'react-icons/fa';

export const Header = ({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }) => (
  <header className="header">
    <nav>
      <div className="logo">
        <button
          className="header__burger"
          aria-label="Меню"
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>
        <img src="/images/logo.png" alt="Todoist" />
      </div>
      <div className="settings">
        <ul>
          <li className="settings__add">
            <button aria-label="Быстрое добавление задачи" type="button">
              +
            </button>
          </li>
          <li className="settings__darkmode">
            <button
              aria-label="Тёмная тема"
              type="button"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FaMoon />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
