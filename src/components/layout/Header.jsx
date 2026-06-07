import React from 'react';
import { FaPizzaSlice } from 'react-icons/fa';

export const Header = ({ darkMode, setDarkMode }) => (
  <header className="header">
    <nav>
      <div className="logo">
        <img src="/images/logo.png" alt="Todoist" />
      </div>
      <div className="settings">
        <ul>
          <li className="settings__add">
            <button aria-label="Quick add task" type="button">
              +
            </button>
          </li>
          <li className="settings__darkmode">
            <button
              aria-label="Darkmode on/off"
              type="button"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FaPizzaSlice />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
