# Архитектура

Клиент-серверное SPA-приложение. Frontend на React (Vite) общается напрямую с Firebase (BaaS): аутентификация через Firebase Auth, данные хранятся в Cloud Firestore. Собственного backend-сервера нет — его роль выполняет Firebase.

## Общая схема (frontend — backend — db)

```
┌──────────────────────┐      HTTPS / WebSocket       ┌────────────────────────┐
│   Браузер (React)    │  ─────────────────────────▶  │   Firebase (BaaS)      │
│                      │                              │                        │
│  - Vite + React 18   │  ◀── realtime подписки ───   │  - Firebase Auth       │
│  - Context API       │                              │  - Cloud Firestore     │
│  - SCSS / Sass       │                              │  - Security Rules      │
│  - localStorage      │                              │                        │
└──────────────────────┘                              └────────────────────────┘
         │                                                       │
         │  кэш проектов / темы                                  │  коллекция tasks
         ▼                                                       ▼
   localStorage                                            Firestore DB
```

## Слои клиента

- `src/components/` — презентационные компоненты (Header, Sidebar, Tasks, AddTask, Projects, ...)
- `src/context/TasksContext.jsx` — глобальное состояние (задачи, проекты, выбранный проект)
- `src/firebase.js` — инициализация Firebase SDK
- `src/helpers/` — утилиты для работы с датами и коллекциями
- `src/constants/index.js` — справочники (списки фильтров, дефолтные проекты)
- `src/styles/App.scss` — стили приложения, включая темную тему

## Поток данных

1. Пользователь логинится через Firebase Auth.
2. `TasksContext` подписывается на коллекцию `tasks` в Firestore (onSnapshot).
3. Любое изменение (добавить/удалить/завершить задачу) уходит в Firestore, оттуда realtime прилетает обратно во все открытые вкладки.
4. Проекты и выбранная тема дополнительно кэшируются в `localStorage`, чтобы UI работал даже без сети.
