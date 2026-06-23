# Todoist Clone

Учебный проект клона Todoist, выполненный в рамках практики. Приложение позволяет управлять задачами: создавать, редактировать, отмечать выполненными, удалять, фильтровать и искать. Данные синхронизируются с Firebase Firestore.

## Используемый стек

- React 18
- Vite 5
- React Hooks (useState, useEffect, useContext, useMemo)
- Context API (TasksContext)
- Firebase Firestore
- date-fns
- SCSS (sass)
- react-icons

## React Hooks

В проекте применяются хуки useState, useEffect, useContext и useMemo. Они используются для управления локальным состоянием компонентов, подписки на коллекцию Firestore, доступа к глобальному контексту задач и вычисления производных значений (фильтрация, статистика).

## Context API

Централизованное хранение задач реализовано через TaskContext (src/context/TasksContext.jsx). Провайдер TasksProvider оборачивает приложение в src/App.jsx и предоставляет компонентам единый API: tasks, visibleTasks, stats, filter, search, addTask, updateTask, toggleTask, deleteTask, clearCompleted.

## Firebase Firestore

В файле src/firebase.js находится конфигурация Firebase. Подключение включает:

- загрузку задач при открытии приложения через onSnapshot
- создание задач через addDoc
- редактирование задач через updateDoc
- изменение статуса выполнения через updateDoc
- удаление задач через deleteDoc
- очистку выполненных задач через writeBatch
- синхронизацию в реальном времени

Если Firebase не настроен, приложение продолжает работать с использованием localStorage в качестве резервного хранилища.

### Настройка Firebase

1. Перейти на https://console.firebase.google.com и создать новый проект.
2. В разделе Build выбрать Firestore Database и создать базу в режиме Production или Test.
3. В Project Settings, в блоке Your apps, добавить Web App и получить объект конфигурации.
4. Открыть файл src/firebase.js и заменить значения объекта firebaseConfig на полученные данные (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).
5. В Firestore создать коллекцию tasks (создастся автоматически при первой записи).
6. В правилах безопасности Firestore для разработки можно использовать правило allow read, write: if true. Для продакшена необходимо настроить авторизацию.

## Инструкция запуска

```
npm install
npm run dev
```

Сборка для продакшена:

```
npm run build
npm run preview
```

## Ссылка на деплой

https://example.com/todoist-clone

## Code Climate Badge

[![Maintainability](https://api.codeclimate.com/v1/badges/REPLACE_WITH_TOKEN/maintainability)](https://codeclimate.com/github/USER/REPO/maintainability)

## Что реализовано

- React Hooks (useState, useEffect, useContext, useMemo)
- Context API через TaskContext
- Подключение Firebase Firestore
- Загрузка задач при старте приложения
- Создание, редактирование, удаление задач
- Изменение статуса выполнения
- Поиск задач
- Фильтры: Все, Активные, Выполненные
- Очистка выполненных задач
- Статистика: всего, выполнено, осталось
- Работа с датами выполнения (выбор, отображение, метки Сегодня и Завтра)
- Подсветка просроченных задач
- Полная локализация интерфейса на русский язык
- Замена ошибочной иконки пиццы на иконку луны для тёмной темы

## ERD

```
+--------------------+
|       tasks        |
+--------------------+
| id         string  |
| text       string  |
| completed  boolean |
| dueDate    string  |
| createdAt  number  |
+--------------------+
```

## Use Case

1. Пользователь добавляет новую задачу с датой выполнения. Приложение сохраняет задачу в Firestore и отображает её в списке.
2. Пользователь отмечает задачу выполненной кликом по чекбоксу. Статус синхронизируется с Firestore.
3. Пользователь применяет фильтр Выполненные и нажимает Очистить выполненные. Все выполненные задачи удаляются из Firestore.
4. Пользователь вводит текст в строку поиска. Список задач фильтруется по совпадению подстроки в названии.

## Архитектура проекта

Приложение построено по компонентной архитектуре React. Корневой компонент App оборачивает дерево в TasksProvider, который инкапсулирует всю работу с задачами и Firestore. Слой представления разделён на layout-компоненты (Header, Sidebar, Content) и функциональные компоненты (Tasks, AddTask, Checkbox, Projects). Работа с датами вынесена в helpers/date.js. Конфигурация Firebase изолирована в firebase.js.

## Таблица соответствия

| Файл                                  | Назначение                                  |
|---------------------------------------|---------------------------------------------|
| src/main.jsx                          | Точка входа приложения                      |
| src/App.jsx                           | Корневой компонент, обёртка провайдера      |
| src/firebase.js                       | Конфигурация Firebase Firestore             |
| src/context/TasksContext.jsx          | Context API, работа с задачами и Firestore  |
| src/helpers/date.js                   | Утилиты форматирования дат                  |
| src/components/Tasks.jsx              | Список задач, фильтры, поиск, статистика    |
| src/components/AddTask.jsx            | Форма добавления задачи с выбором даты      |
| src/components/Checkbox.jsx           | Переключение статуса задачи                 |
| src/components/Projects.jsx           | Список проектов                             |
| src/components/AddProject.jsx         | Добавление проекта                          |
| src/components/IndividualProject.jsx  | Отдельный проект в списке                   |
| src/components/layout/Header.jsx      | Шапка приложения                            |
| src/components/layout/Sidebar.jsx     | Боковая панель                              |
| src/components/layout/Content.jsx     | Контейнер контента                          |
| src/constants/index.js                | Константы (проекты, разделы)                |
| src/styles/App.scss                   | Глобальные стили                            |

## Доработки (итерация v0.2.1)

- Тема (тёмная/светлая) теперь сохраняется в `localStorage` и восстанавливается при перезагрузке (`src/App.jsx`).
- Инлайн-редактирование задачи по двойному клику: Enter — сохранить, Esc — отменить, blur — сохранить (`src/components/Tasks.jsx`, метод `updateTask` из `TasksContext`).
- Добавлены стили `.tasks__edit` с поддержкой тёмной темы (`src/styles/App.scss`).
