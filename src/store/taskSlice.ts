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

export const addTask = createAsyncThunk<
    void,
    { task: NewTask; userId: string },
    { rejectValue: string }
>('tasks/addTask', async ({ task, userId }, { rejectWithValue }) => {
    try {
        await createTaskInFirestore(userId, task);
    } catch (error) {
        return rejectWithValue(getFirestoreErrorMessage(error));
    }
});

export const toggleTaskStatus = createAsyncThunk<
    void,
    { taskId: string; completed: boolean },
    { rejectValue: string }
>('tasks/toggleTaskStatus', async ({ taskId, completed }, { rejectWithValue }) => {
    try {
        await updateTaskStatusInFirestore(taskId, completed);
    } catch (error) {
        return rejectWithValue(getFirestoreErrorMessage(error));
    }
});

export const deleteTask = createAsyncThunk<
    void,
    string,
    { rejectValue: string }
>('tasks/deleteTask', async (taskId, { rejectWithValue }) => {
    try {
        await deleteTaskFromFirestore(taskId);
    } catch (error) {
        return rejectWithValue(getFirestoreErrorMessage(error));
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(state, action: PayloadAction<Task[]>) {
            state.items = action.payload;
            state.error = null;
        },
        setFilter(state, action: PayloadAction<TaskFilter>) {
            state.filter = action.payload;
        },
        setTasksLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setTasksError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        clearTasks(state) {
            state.items = [];
            state.error = null;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.error = null;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.error = action.payload ?? 'No se pudo agregar la tarea.';
            })
            .addCase(toggleTaskStatus.rejected, (state, action) => {
                state.error = action.payload ?? 'No se pudo actualizar la tarea.';
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload ?? 'No se pudo eliminar la tarea.';
            });
    },
});

export const {
    setTasks,
    setFilter,
    setTasksLoading,
    setTasksError,
    clearTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
