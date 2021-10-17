import { createSlice } from '@reduxjs/toolkit';
import { getMTUserDataAsync, createContractAsync } from './dataThunk';

export const dataInitialState = {
  status: 'idle',
  error: {},
  success: false,
  getuserstatus: 'idle',
  getusererror: '',
  getuserdata: ''
};

export const dataSlice = createSlice({
  name: 'data',
  initialState: dataInitialState,
  reducers: {
    resetData: (state, action) => {
      console.log(action.payload, '-------------resetData');
      state.error = {};
      state.getusererror = '';
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMTUserDataAsync.pending, (state) => {
        state.getuserstatus = 'loading';
      })
      .addCase(getMTUserDataAsync.rejected, (state, action) => {
        state.getuserstatus = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.getusererror = action.payload;
      })
      .addCase(getMTUserDataAsync.fulfilled, (state, action) => {
        state.getuserstatus = 'idle';
        state.getuserdata = action.payload;
        console.log(action.payload, '---------------action.payload');
      })
      .addCase(createContractAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createContractAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.error = action.payload;
      })
      .addCase(createContractAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.success = true;
        console.log(action.payload, '---------------action.payload');
      });
  }
});

// Action creators are generated for each case reducer function
export const { resetData } = dataSlice.actions;

export { getMTUserDataAsync, createContractAsync };

export default dataSlice.reducer;
