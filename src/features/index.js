import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice, authInitialState } from './auth/authSlice';
import { movetechSlice, movetechInitialState } from './movetech/moveTechSlice';

const authPersistConfig = {
  key: 'auth',
  storage
  // stateReconciler: hardSet,
  // blacklist: [],
};

export const combinedReducers = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  movetech: movetechSlice.reducer
});

export const initialState = {
  auth: authInitialState,
  movetech: movetechInitialState
};
