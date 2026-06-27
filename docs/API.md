# API

Собственного REST/GraphQL API в проекте нет. Все операции с данными выполняются через Firebase Web SDK напрямую из браузера. Ниже перечислены вызовы SDK, которые фактически используются.

## Аутентификация (Firebase Auth)

| Действие         | Метод SDK                                      |
|------------------|------------------------------------------------|
| Регистрация      | `createUserWithEmailAndPassword(auth, email, password)` |
| Вход             | `signInWithEmailAndPassword(auth, email, password)`     |
| Выход            | `signOut(auth)`                                |
| Отслеж. сессии   | `onAuthStateChanged(auth, callback)`           |

## Работа с задачами (Cloud Firestore, коллекция `tasks`)

| Действие              | Метод SDK                                                              |
|-----------------------|------------------------------------------------------------------------|
| Подписка на список    | `onSnapshot(query(collection(db, 'tasks'), where('userId', '==', uid)))` |
| Добавить задачу       | `addDoc(collection(db, 'tasks'), { task, date, projectId, userId, archived: false })` |
| Завершить задачу      | `updateDoc(doc(db, 'tasks', id), { archived: true })`                  |
| Удалить задачу        | `deleteDoc(doc(db, 'tasks', id))`                                      |

## Пример: добавление задачи

```js
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';

await addDoc(collection(db, 'tasks'), {
  task: 'Купить хлеб',
  date: '24/06/2026',
  projectId: 'INBOX',
  userId: currentUser.uid,
  archived: false,
});
```

## Security Rules (упрощённо)

```
match /tasks/{taskId} {
  allow read, write: if request.auth != null
                     && request.auth.uid == resource.data.userId;
}
```
