import { createSlice } from '@reduxjs/toolkit';
import {
  getMTUserDataAsync,
  createContractAsync,
  getContractsDataAsync,
  editQuotationAsync,
  getContractsAvailableAsync,
  approveQuotationAsync,
  endQuotationAsync
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
  getContractAvailableStatus: 'idle',
  getContractAvailableError: '',
  getContractAvailableData: [],
  getContractAvailablePeopleData: []
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
      .addCase(getContractsAvailableAsync.pending, (state) => {
        state.getContractAvailableStatus = 'loading';
      })
      .addCase(getContractsAvailableAsync.rejected, (state, action) => {
        state.getContractAvailableStatus = 'idle';
        console.log(action.payload, '---------------action.payload');
        state.getContractAvailableError = action.payload;
      })
      .addCase(getContractsAvailableAsync.fulfilled, (state, action) => {
        state.getContractAvailableStatus = 'idle';
        console.log(action.payload, '---------------action.payload-----');
        if (action.payload.data.length === 1) {
          console.log('innnnnnn');
          state.getContractAvailableData = action.payload.data[0].availablecontracts;
        }
        console.log(action.payload.people, '-----ppp');
        if (action.payload.people.length === 1) {
          console.log('innnnnnn222');
          state.getContractAvailablePeopleData = action.payload.people;
        }

        // state.getContractAvailableData = action.payload.;
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
  getContractsAvailableAsync,
  approveQuotationAsync,
  endQuotationAsync
};

export default movetechSlice.reducer;
