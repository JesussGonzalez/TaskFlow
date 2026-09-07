import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    serverTimestamp,
    updateDoc,
    where,
    type Unsubscribe,
} from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';
import type { NewTask, Task } from '../types';

export async function createTaskInFirestore(userId: string, task: NewTask) {
    const taskReference = await addDoc(collection(db, 'tasks'), {
        ...task,
        completed: false,
        userId,
        createdAt: serverTimestamp(),
    });

    return taskReference.id;
}

export async function updateTaskStatusInFirestore(
    taskId: string,
    completed: boolean,
) {
    await updateDoc(doc(db, 'tasks', taskId), {
        completed,
    });
}

export async function deleteTaskFromFirestore(taskId: string) {
    await deleteDoc(doc(db, 'tasks', taskId));
}

export function subscribeToUserTasks(
    userId: string,
    onTasks: (tasks: Task[]) => void,
    onError: (error: unknown) => void,
): Unsubscribe {
    const tasksQuery = query(
        collection(db, 'tasks'),
        where('userId', '==', userId),
    );

    return onSnapshot(
        tasksQuery,
        (snapshot) => {
            const tasks: Task[] = snapshot.docs.map((taskDocument) => {
                const data = taskDocument.data();

                return {
                    id: taskDocument.id,
                    title: String(data.title ?? ''),
                    description: String(data.description ?? ''),
                    date: String(data.date ?? ''),
                    category: String(data.category ?? 'General'),
                    completed: Boolean(data.completed),
                    userId: String(data.userId ?? ''),
                };
            });

            onTasks(tasks);
        },
        onError,
    );
}

export function getFirestoreErrorMessage(error: unknown) {
    const code =
        typeof error === 'object' && error !== null && 'code' in error
            ? String((error as { code?: unknown }).code)
            : '';

    switch (code) {
        case 'permission-denied':
        case 'firestore/permission-denied':
            return 'No tenés permiso para realizar esta operación.';
        case 'unavailable':
        case 'firestore/unavailable':
            return 'Firestore no está disponible. Revisá tu conexión.';
        case 'not-found':
        case 'firestore/not-found':
            return 'La tarea ya no existe.';
        default:
            return 'No se pudo sincronizar con Firestore.';
    }
}
