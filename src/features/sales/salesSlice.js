import { createSlice } from '@reduxjs/toolkit';
import { addAttendanceAsync, getAttendanceAsync, getSalesAsync, addSalesAsync } from './salesThunk';

export const salesInitialState = {
  status: 'idle',
  error: {},
  success: false,
  getattendancestatus: 'idle',
  getattendanceerror: '',
  getattendancedata: null,
  getsalesstatus: 'idle',
  getsaleserror: '',
  getsalesdata: null,
  setaddSalesStatus: 'idle',
  setaddSalesError: '',
  setaddSalesisSuccess: false
};

export const salesSlice = createSlice({
  name: 'sales',
  initialState: salesInitialState,
  reducers: {
    resetData: (state, action) => {
      console.log(action.payload, '-------------resetData');
      state.error = {};
      state.getattendanceerror = '';
      state.getsaleserror = '';
      state.success = false;
      state.setaddSalesisSuccess = false;
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
      })
      .addCase(addSalesAsync.pending, (state) => {
        state.setaddSalesStatus = 'loading';
      })
      .addCase(addSalesAsync.rejected, (state, action) => {
        state.setaddSalesStatus = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.setaddSalesError = action.payload;
      })
      .addCase(addSalesAsync.fulfilled, (state, action) => {
        state.setaddSalesStatus = 'idle';
        state.setaddSalesisSuccess = true;
        console.log(action.payload, '---------------action.payload');
      })
      .addCase(getSalesAsync.pending, (state) => {
        state.getsalesstatus = 'loading';
      })
      .addCase(getSalesAsync.rejected, (state, action) => {
        state.getsalesstatus = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.getsaleserror = action.payload;
      })
      .addCase(getSalesAsync.fulfilled, (state, action) => {
        state.getsalesstatus = 'idle';
        state.getsalesdata = action.payload;
        console.log(action.payload, '---------------action.payload');
      });
  }
});

// Action creators are generated for each case reducer function
export const { resetData } = salesSlice.actions;

export { addAttendanceAsync, getAttendanceAsync, getSalesAsync, addSalesAsync };

export default salesSlice.reducer;
