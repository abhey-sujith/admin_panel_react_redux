import { createAction, createSlice } from '@reduxjs/toolkit';
import { loginAsync, resetPasswordAsync, createUserAsync, editUserAsync } from './authThunk';
// nuke is called to reset the data in redux
const nuke = createAction('NUKE');

export const authInitialState = {
  isLoggedIn: false,
  status: 'idle',
  error: {},
  success: false,
  email: null,
  uid: null,
  role: null,
  username: null,
  resetpassword: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setisLoggedIn: (state, action) => {
      console.log(action.payload, '-------------setisLoggedIn');
      state.isLoggedIn = action.payload;
    },
    setError: (state, action) => {
      console.log(action.payload, '-------------setError');
      state.error = {};
      state.success = false;
    },
    setResetPass: (state, action) => {
      console.log(action.payload, '-------------setError');
      state.resetpassword = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.error = action.payload;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        if (action.payload?.token) {
          state.isLoggedIn = true;
          state.token = action.payload.token;
          state.email = action.payload.email;
          state.uid = action.payload.uid;
          state.role = action.payload.role;
          state.username = action.payload.username;
          state.resetpassword = action.payload.resetpassword;
          console.log(state.email, state.token, 'auth state');
        }
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.error = action.payload;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.resetpassword = action.payload.resetpassword;
        console.log(state.resetpassword, 'auth state.resetpassword ');
      })
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.error = action.payload;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.success = true;
        console.log(action.payload, '---------------action.payload');
      })
      .addCase(editUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.error = action.payload;
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.success = true;
        console.log(action.payload, '---------------action.payload');
      });
  }
});

// Action creators are generated for each case reducer function
export const { setisLoggedIn, setError, setResetPass } = authSlice.actions;

export { nuke, loginAsync, resetPasswordAsync, createUserAsync, editUserAsync };

export default authSlice.reducer;
