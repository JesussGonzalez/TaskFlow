import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ProfileState = {
    avatarUri: string | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: ProfileState = {
    avatarUri: null,
    isLoading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setAvatarUri(state, action: PayloadAction<string | null>) {
            state.avatarUri = action.payload;
            state.error = null;
        },
        setProfileLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setProfileError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        clearProfile(state) {
            state.avatarUri = null;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { setAvatarUri, setProfileLoading, setProfileError, clearProfile } =
    profileSlice.actions;

export default profileSlice.reducer;
