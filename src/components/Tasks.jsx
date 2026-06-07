import React from 'react';
import { Checkbox } from './Checkbox.jsx';
import { AddTask } from './AddTask.jsx';

export const Tasks = () => (
  <div className="tasks">
    <h2>Inbox</h2>

    <ul className="tasks__list" />

    <AddTask />
  </div>
);
