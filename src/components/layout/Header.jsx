import React from 'react';
import { FaMoon } from 'react-icons/fa';

export const Header = ({ darkMode, setDarkMode }) => (
  <header className="header">
    <nav>
      <div className="logo">
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
