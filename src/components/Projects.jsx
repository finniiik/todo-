import React, { useState } from 'react';
import { IndividualProject } from './IndividualProject.jsx';
import { defaultProjects } from '../constants';

export const Projects = () => {
  const [active, setActive] = useState(null);

  return defaultProjects.map((project) => (
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
