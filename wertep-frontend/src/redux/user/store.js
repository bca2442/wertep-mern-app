import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage by default

// Combine all reducers (currently just one: user)
const rootReducer = combineReducers({ user: userReducer });

// Configuration for Redux Persist
const persistConfig = {
    key: 'root', // Key under which the state will be stored
    storage,
    version: 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    // Middleware setup to prevent common Redux errors with non-serializable values (required for Redux Persist)
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Create a persistor object (required to wrap the application)
export const persistor = persistStore(store);