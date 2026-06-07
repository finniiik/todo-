import React from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Tasks } from '../Tasks.jsx';

export const Content = () => (
  <section className="content">
    <Sidebar />
    <Tasks />
  </section>
);
