import React, { useState } from 'react';
import { FaTrashAlt, FaPalette } from 'react-icons/fa';
import { useTasks } from '../context/TasksContext.jsx';
import { projectColors } from '../constants';

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const { deleteProject, updateProjectColor } = useTasks();

  return (
    <>
      <span className="sidebar__dot" style={{ color: project.color || '#6accbc' }}>•</span>
      <span className="sidebar__project-name">{project.name}</span>

      <span
        className="sidebar__project-color"
        role="button"
        tabIndex={0}
        title="Изменить цвет"
        onClick={(e) => {
          e.stopPropagation();
          setShowColors((v) => !v);
          setShowConfirm(false);
        }}
      >
        <FaPalette />
        {showColors && (
          <div
            className="project-colors-popover"
            onClick={(e) => e.stopPropagation()}
          >
            {projectColors.map((c) => (
              <span
                key={c.value}
                title={c.name}
                className="project-colors-popover__dot"
                style={{ backgroundColor: c.value }}
                onClick={(e) => {
                  e.stopPropagation();
                  updateProjectColor(project.projectId, c.value);
                  setShowColors(false);
                }}
              />
            ))}
          </div>
        )}
      </span>

      <span
        className="sidebar__project-delete"
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          setShowConfirm((v) => !v);
          setShowColors(false);
        }}
      >
        <FaTrashAlt />
      </span>

      {showConfirm && (
        <div
          className="project-delete-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="project-delete-modal__inner">
            <p>Удалить этот проект?</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteProject(project.projectId);
                setShowConfirm(false);
              }}
            >
              Удалить
            </button>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirm(false);
              }}
            >
              Отмена
            </span>
          </div>
        </div>
      )}
    </>
  );
};
