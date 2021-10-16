import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice, authInitialState } from './auth/authSlice';

const authPersistConfig = {
  key: 'auth',
  storage
  // stateReconciler: hardSet,
  // blacklist: [],
};

export const combinedReducers = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer)
});

export const initialState = {
  auth: authInitialState
};
