import React, { useState } from 'react';

export const AddProject = () => {
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState('');

  return (
    <div className="add-project">
      {show && (
        <div className="add-project__input">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            type="text"
            placeholder="Name your project"
          />
          <button className="add-project__submit" type="button">
            Add Project
          </button>
          <span
            className="add-project__cancel"
            role="button"
            tabIndex={0}
            onClick={() => setShow(false)}
          >
            Cancel
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
        Add Project
      </span>
    </div>
  );
};
