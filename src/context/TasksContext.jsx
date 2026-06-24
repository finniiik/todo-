import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  writeBatch,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase.js';
import { defaultProjects } from '../constants';

const TasksContext = createContext(null);

const STORAGE_KEY = 'todoist_tasks_v1';
const PROJECTS_KEY = 'todoist_projects_v1';

const loadLocal = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveLocal = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return;
  }
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState(() =>
    loadLocal(PROJECTS_KEY, defaultProjects),
  );
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setTasks(loadLocal(STORAGE_KEY));
      setLoading(false);
      return;
    }
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setTasks(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured) saveLocal(STORAGE_KEY, tasks);
  }, [tasks]);

  useEffect(() => {
    saveLocal(PROJECTS_KEY, projects);
  }, [projects]);

  const addTask = async (text, dueDate) => {
    const value = text.trim();
    if (!value) return;
    const payload = {
      text: value,
      completed: false,
      dueDate: dueDate || null,
      createdAt: Date.now(),
    };
    if (isFirebaseConfigured && db) {
      await addDoc(collection(db, 'tasks'), payload);
    } else {
      setTasks((prev) => [...prev, { id: Date.now().toString(), ...payload }]);
    }
  };

  const updateTask = async (id, patch) => {
    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, 'tasks', id), patch);
    } else {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      );
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    await updateTask(id, { completed: !task.completed });
  };

  const deleteTask = async (id) => {
    if (isFirebaseConfigured && db) {
      await deleteDoc(doc(db, 'tasks', id));
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const clearCompleted = async () => {
    const completed = tasks.filter((t) => t.completed);
    if (isFirebaseConfigured && db) {
      const batch = writeBatch(db);
      completed.forEach((t) => batch.delete(doc(db, 'tasks', t.id)));
      await batch.commit();
    } else {
      setTasks((prev) => prev.filter((t) => !t.completed));
    }
  };

  const addProject = (name) => {
    const value = (name || '').trim();
    if (!value) return;
    setProjects((prev) => [
      ...prev,
      { projectId: Date.now().toString(), name: value },
    ]);
  };

  const deleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.projectId !== projectId));
  };

  const visibleTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
      })
      .filter((t) =>
        search.trim()
          ? t.text.toLowerCase().includes(search.trim().toLowerCase())
          : true,
      );
  }, [tasks, filter, search]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      remaining: tasks.filter((t) => !t.completed).length,
    }),
    [tasks],
  );

  const value = {
    tasks,
    visibleTasks,
    stats,
    filter,
    setFilter,
    search,
    setSearch,
    loading,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    projects,
    addProject,
    deleteProject,
    isFirebaseConfigured,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
