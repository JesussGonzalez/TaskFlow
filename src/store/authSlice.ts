import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type AuthUser = {
    uid: string;
    email: string | null;
};

type AuthState = {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    isLoading: true,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<AuthUser | null>) {
            state.user = action.payload;
            state.error = null;
        },
        setAuthLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setAuthError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setUser, setAuthLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;
