import { createAction, createSlice } from '@reduxjs/toolkit';

// nuke is called to reset the data in redux
const nuke = createAction('NUKE');

export const authInitialState = {
  isLoggedIn: false,
  status: 'idle'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setisLoggedIn: (state, action) => {
      console.log(action.payload, '-------------payload');
      state.isLoggedIn = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setisLoggedIn } = authSlice.actions;

export { nuke };

export default authSlice.reducer;
