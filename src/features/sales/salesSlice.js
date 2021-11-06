import { createSlice } from '@reduxjs/toolkit';
import { addAttendanceAsync, getAttendanceAsync } from './salesThunk';

export const salesInitialState = {
  status: 'idle',
  error: {},
  success: false,
  getattendancestatus: 'idle',
  getattendanceerror: '',
  getattendancedata: null
};

export const salesSlice = createSlice({
  name: 'sales',
  initialState: salesInitialState,
  reducers: {
    resetData: (state, action) => {
      console.log(action.payload, '-------------resetData');
      state.error = {};
      state.getattendanceerror = '';
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttendanceAsync.pending, (state) => {
        state.getattendancestatus = 'loading';
      })
      .addCase(getAttendanceAsync.rejected, (state, action) => {
        state.getattendancestatus = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.getattendanceerror = action.payload;
      })
      .addCase(getAttendanceAsync.fulfilled, (state, action) => {
        state.getattendancestatus = 'idle';
        state.getattendancedata = action.payload.data;
        console.log(action.payload.data, '---------------action.payload');
      })
      .addCase(addAttendanceAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAttendanceAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.error = action.payload;
      })
      .addCase(addAttendanceAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.success = true;
        console.log(action.payload, '---------------action.payload');
      });
  }
});

// Action creators are generated for each case reducer function
export const { resetData } = salesSlice.actions;

export { addAttendanceAsync, getAttendanceAsync };

export default salesSlice.reducer;
