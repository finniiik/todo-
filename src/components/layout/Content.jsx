import React from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Tasks } from '../Tasks.jsx';

export const Content = ({ sidebarOpen, setSidebarOpen }) => (
  <section className="content">
    <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    {sidebarOpen && (
      <div
        className="sidebar__backdrop"
        onClick={() => setSidebarOpen(false)}
      />
    )}
    <Tasks />
  </section>
);
