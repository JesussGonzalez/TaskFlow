import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from '@reduxjs/toolkit';

import {
    createTaskInFirestore,
    deleteTaskFromFirestore,
    getFirestoreErrorMessage,
    updateTaskStatusInFirestore,
} from '../services/taskService';
import type { NewTask, Task } from '../types';

export type TaskFilter = 'all' | 'completed' | 'pending';

type TasksState = {
    items: Task[];
    filter: TaskFilter;
    isLoading: boolean;
    error: string | null;
};

const initialState: TasksState = {
    items: [],
    filter: 'all',
    isLoading: false,
    error: null,
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            const exists = state.items.some((item) => item.id === action.payload.id);

            if (!exists) {
                state.items.unshift(action.payload);
            }
        },
        toggleTaskStatus(state, action: PayloadAction<string>) {
            const task = state.items.find((item) => item.id === action.payload);

            if (task) {
                task.completed = !task.completed;
            }
        },
        setTaskStatus(
            state,
            action: PayloadAction<{ taskId: string; completed: boolean }>,
        ) {
            const task = state.items.find(
                (item) => item.id === action.payload.taskId,
            );

            if (task) {
                task.completed = action.payload.completed;
            }
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        setFilter(state, action: PayloadAction<TaskFilter>) {
            state.filter = action.payload;
        },
        setTasks(state, action: PayloadAction<Task[]>) {
            state.items = action.payload;
            state.error = null;
        },
        setTasksLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setTasksError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        clearTasks(state) {
            state.items = [];
            state.filter = 'all';
            state.error = null;
            state.isLoading = false;
        },
    },
});

export const {
    addTask,
    toggleTaskStatus,
    setTaskStatus,
    deleteTask,
    setFilter,
    setTasks,
    setTasksLoading,
    setTasksError,
    clearTasks,
} = taskSlice.actions;

export const createTask = createAsyncThunk<
    void,
    { task: NewTask; userId: string },
    { rejectValue: string }
>('tasks/createTask', async ({ task, userId }, { dispatch, rejectWithValue }) => {
    try {
        const id = await createTaskInFirestore(userId, task);

        dispatch(
            addTask({
                id,
                ...task,
                completed: false,
                userId,
            }),
        );
    } catch (error) {
        const message = getFirestoreErrorMessage(error);
        dispatch(setTasksError(message));
        return rejectWithValue(message);
    }
});

export const saveTaskStatus = createAsyncThunk<
    void,
    { taskId: string; completed: boolean },
    { rejectValue: string }
>(
    'tasks/saveTaskStatus',
    async ({ taskId, completed }, { dispatch, rejectWithValue }) => {
        try {
            await updateTaskStatusInFirestore(taskId, completed);
            dispatch(setTaskStatus({ taskId, completed }));
        } catch (error) {
            const message = getFirestoreErrorMessage(error);
            dispatch(setTasksError(message));
            return rejectWithValue(message);
        }
    },
);

export const removeTask = createAsyncThunk<
    void,
    string,
    { rejectValue: string }
>('tasks/removeTask', async (taskId, { dispatch, rejectWithValue }) => {
    try {
        await deleteTaskFromFirestore(taskId);
        dispatch(deleteTask(taskId));
    } catch (error) {
        const message = getFirestoreErrorMessage(error);
        dispatch(setTasksError(message));
        return rejectWithValue(message);
    }
});

export default taskSlice.reducer;
