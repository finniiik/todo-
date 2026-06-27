import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import { Projects } from '../Projects.jsx';
import { AddProject } from '../AddProject.jsx';

export const Sidebar = ({ open, onClose }) => {
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className={'sidebar' + (open ? ' sidebar--open' : '')}>
      <button
        type="button"
        className="sidebar__close"
        aria-label="Закрыть меню"
        onClick={onClose}
      >
        ×
      </button>

      <ul className="sidebar__generic">
        <li className={active === 'inbox' ? 'active' : undefined}>
          <div role="button" tabIndex={0} onClick={() => setActive('inbox')}>
            <span>
              <FaInbox />
            </span>
            <span>Входящие</span>
          </div>
        </li>
        <li className={active === 'today' ? 'active' : undefined}>
          <div role="button" tabIndex={0} onClick={() => setActive('today')}>
            <span>
              <FaRegCalendar />
            </span>
            <span>Сегодня</span>
          </div>
        </li>
        <li className={active === 'next_7' ? 'active' : undefined}>
          <div role="button" tabIndex={0} onClick={() => setActive('next_7')}>
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Ближайшие 7 дней</span>
          </div>
        </li>
      </ul>

      <div
        className="sidebar__middle"
        role="button"
        tabIndex={0}
        onClick={() => setShowProjects(!showProjects)}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? 'hidden-projects' : undefined}
          />
        </span>
        <h2>Проекты</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      {showProjects && <AddProject />}
    </div>
  );
};
