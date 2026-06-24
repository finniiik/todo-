import React, { useState } from 'react';
import { IndividualProject } from './IndividualProject.jsx';
import { useTasks } from '../context/TasksContext.jsx';

export const Projects = () => {
  const [active, setActive] = useState(null);
  const { projects } = useTasks();

  return projects.map((project) => (
    <li
      key={project.projectId}
      className={
        active === project.projectId
          ? 'active sidebar__project'
          : 'sidebar__project'
      }
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => setActive(project.projectId)}
      >
        <IndividualProject project={project} />
      </div>
    </li>
  ));
};
