import React, { useState } from 'react';
import { useTasks } from '../context/TasksContext.jsx';
import { projectColors } from '../constants';

export const AddProject = () => {
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [color, setColor] = useState(projectColors[0].value);
  const { addProject } = useTasks();

  const handleAdd = () => {
    if (!projectName.trim()) return;
    addProject(projectName, color);
    setProjectName('');
    setColor(projectColors[0].value);
    setShow(false);
  };

  return (
    <div className="add-project">
      {show && (
        <div className="add-project__input">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="add-project__name"
            type="text"
            placeholder="Название проекта"
          />
          <div className="add-project__colors">
            {projectColors.map((c) => (
              <span
                key={c.value}
                title={c.name}
                onClick={() => setColor(c.value)}
                className={
                  'add-project__color' +
                  (color === c.value ? ' add-project__color--active' : '')
                }
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
          <button
            className="add-project__submit"
            type="button"
            onClick={handleAdd}
          >
            Добавить
          </button>
          <span
            className="add-project__cancel"
            role="button"
            tabIndex={0}
            onClick={() => {
              setShow(false);
              setProjectName('');
            }}
          >
            Отмена
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        className="add-project__text"
        role="button"
        tabIndex={0}
        onClick={() => setShow(!show)}
      >
        Добавить проект
      </span>
    </div>
  );
};
