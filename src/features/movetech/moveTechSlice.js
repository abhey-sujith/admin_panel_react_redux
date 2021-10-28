import { createSlice } from '@reduxjs/toolkit';
import {
  getMTUserDataAsync,
  createContractAsync,
  getContractsDataAsync,
  editQuotationAsync,
  getQuotationsAsync,
  approveQuotationAsync,
  endQuotationAsync,
  setQuotationtoAcceptedAsync
} from './moveTechThunk';

export const movetechInitialState = {
  status: 'idle',
  error: {},
  success: false,
  getuserstatus: 'idle',
  getusererror: '',
  getuserdata: [],
  getcontractstatus: 'idle',
  getcontracterror: '',
  getquotationsdata: [],
  getQuotationsStatus: 'idle',
  getQuotationsError: '',
  getQuotationsData: [],
  setQuotationStatus: 'idle',
  setQuotationError: '',
  setQuotationisSuccess: false
};

export const movetechSlice = createSlice({
  name: 'movetech',
  initialState: movetechInitialState,
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
      })
      .addCase(editQuotationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editQuotationAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.error = action.payload;
      })
      .addCase(editQuotationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.success = true;
        console.log(action.payload, '---------------action.payload');
      })
      .addCase(approveQuotationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(approveQuotationAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.error = action.payload;
      })
      .addCase(approveQuotationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.success = true;
        console.log(action.payload, '---------------action.payload');
      })
      .addCase(endQuotationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(endQuotationAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.error = action.payload;
      })
      .addCase(endQuotationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.success = true;
        console.log(action.payload, '---------------action.payload');
      })
      .addCase(getContractsDataAsync.pending, (state) => {
        state.getcontractstatus = 'loading';
      })
      .addCase(getContractsDataAsync.rejected, (state, action) => {
        state.getcontractstatus = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.getcontracterror = action.payload;
      })
      .addCase(getContractsDataAsync.fulfilled, (state, action) => {
        state.getcontractstatus = 'idle';
        state.getquotationsdata = action.payload;
        console.log(action.payload, '---------------action.payload');
      })
      .addCase(getQuotationsAsync.pending, (state) => {
        state.getContractStatus = 'loading';
      })
      .addCase(getQuotationsAsync.rejected, (state, action) => {
        state.getContractStatus = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.getContractError = action.payload;
      })
      .addCase(getQuotationsAsync.fulfilled, (state, action) => {
        state.getContractStatus = 'idle';
        console.log(action.payload, '---------------action.payload-----');
        state.getQuotationsData = action.payload.quotationDetails;
      })
      .addCase(setQuotationtoAcceptedAsync.pending, (state) => {
        state.setQuotationStatus = 'loading';
      })
      .addCase(setQuotationtoAcceptedAsync.rejected, (state, action) => {
        state.getContractAvailableStatus = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.setQuotationError = action.payload;
      })
      .addCase(setQuotationtoAcceptedAsync.fulfilled, (state, action) => {
        state.getContractAvailableStatus = 'idle';
        console.log(action.payload, '---------------action.payload-----');
        state.setQuotationisSuccess = true;
      });
  }
});

// Action creators are generated for each case reducer function
export const { resetData } = movetechSlice.actions;

export {
  getMTUserDataAsync,
  createContractAsync,
  getContractsDataAsync,
  editQuotationAsync,
  getQuotationsAsync,
  approveQuotationAsync,
  endQuotationAsync,
  setQuotationtoAcceptedAsync
};

export default movetechSlice.reducer;
