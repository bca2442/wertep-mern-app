import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // 1. SIGN IN ACTIONS
        signInStart: (state) => { 
            state.loading = true; 
            state.error = null; // Clear previous errors on start
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
        // 2. UPDATE USER ACTIONS
        updateUserStart: (state) => {
            state.loading = true;
            state.error = null; // Clear previous errors on start
        },
        updateUserSuccess: (state, action) => {
            // Overwrite the old user data with the new user data from the API response
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
        // 3. DELETE USER ACTIONS (New functionality added)
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null; // Clear previous errors on start
        },
        deleteUserSuccess: (state) => {
            // Clear user data on successful deletion
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        
        // 4. SIGN OUT ACTION (Clears the user state entirely)
        signOutUser: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUser,
} = userSlice.actions;

export default userSlice.reducer;