import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../types';

export type TaskFilter = 'all' | 'completed' | 'pending';
export type NewTask = Omit<Task, 'id' | 'completed'>;

type TasksState = {
    items: Task[];
    filter: TaskFilter;
};

const initialState: TasksState = {
    items: [
        {
            id: '1',
            title: 'Revisar entrega de TaskFlow',
            description: 'Comprobar que la navegación y las tareas funcionen correctamente.',
            date: '03/09/2026',
            category: 'Estudio',
            completed: false,
        },
        {
            id: '2',
            title: 'Organizar apuntes',
            description: 'Ordenar el material visto durante la clase.',
            date: '04/09/2026',
            category: 'Personal',
            completed: true,
        },
    ],
    filter: 'all',
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: {
            reducer(state: TasksState, action: PayloadAction<Task>) {
                state.items.unshift(action.payload);
            },
            prepare(task: NewTask) {
                return {
                    payload: {
                        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                        ...task,
                        completed: false,
                    },
                };
            },
        },
        toggleTaskStatus(state: TasksState, action: PayloadAction<string>) {
            const task = state.items.find((item: Task) => item.id === action.payload);

            if (task) {
                task.completed = !task.completed;
            }
        },
        deleteTask(state: TasksState, action: PayloadAction<string>) {
            state.items = state.items.filter((item: Task) => item.id !== action.payload);
        },
        setFilter(state: TasksState, action: PayloadAction<TaskFilter>) {
            state.filter = action.payload;
        },
    },
});

export const { addTask, toggleTaskStatus, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
