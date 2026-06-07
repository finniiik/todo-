import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        role="button"
        tabIndex={0}
        onClick={() => setShowConfirm(!showConfirm)}
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button type="button">Delete</button>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(false);
                }}
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};
