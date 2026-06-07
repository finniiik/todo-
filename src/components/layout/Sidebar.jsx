import React, { useState } from 'react';
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa';
import { Projects } from '../Projects.jsx';
import { AddProject } from '../AddProject.jsx';

export const Sidebar = () => {
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);

  return (
    <div className="sidebar">
      <ul className="sidebar__generic">
        <li className={active === 'inbox' ? 'active' : undefined}>
          <div role="button" tabIndex={0} onClick={() => setActive('inbox')}>
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li className={active === 'today' ? 'active' : undefined}>
          <div role="button" tabIndex={0} onClick={() => setActive('today')}>
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li className={active === 'next_7' ? 'active' : undefined}>
          <div role="button" tabIndex={0} onClick={() => setActive('next_7')}>
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 days</span>
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
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

      {showProjects && <AddProject />}
    </div>
  );
};
