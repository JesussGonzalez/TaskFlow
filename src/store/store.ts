import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import profileReducer from './profileSlice';
import tasksReducer from './taskSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        tasks: tasksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
