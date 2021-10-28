import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config/apiconfig';

export const getMTUserDataAsync = createAsyncThunk(
  'movetech/getMTUserDataAsync',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.API_URL}/api/getallmtusers`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response, '-------response');
      return response.data.users;
    } catch (err) {
      console.log(err, '------------error', err.message);
      if (err && err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const createContractAsync = createAsyncThunk(
  'movetech/createContractAsync',
  async (
    { customerName, quotationDetails, requirements, amount, daysToComplete, token },
    { rejectWithValue }
  ) => {
    console.log('thunk', customerName, quotationDetails, requirements, amount, daysToComplete);

    try {
      const response = await axios({
        method: 'POST',
        url: `${config.API_URL}/api/create-quotation`,
        data: {
          customerName,
          quotationDetails,
          requirements,
          amount,
          daysToComplete
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response, '-------response');
      return response.data;
    } catch (err) {
      console.log(err, '------------error', err.message);
      if (err && err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const editQuotationAsync = createAsyncThunk(
  'movetech/editQuotationAsync',
  async (
    {
      customerName,
      quotationDetails,
      requirements,
      amount,
      daysToComplete,
      advanceAmount,
      deliveryDate,
      settledAmount,
      token,
      id
    },
    { rejectWithValue }
  ) => {
    console.log(
      'thunk',
      customerName,
      quotationDetails,
      requirements,
      amount,
      daysToComplete,
      advanceAmount,
      deliveryDate,
      settledAmount,
      token,
      id
    );

    try {
      const response = await axios({
        method: 'POST',
        url: `${config.API_URL}/api/edit-quotation`,
        data: {
          customerName,
          quotationDetails,
          requirements,
          amount,
          daysToComplete,
          advanceAmount,
          deliveryDate,
          settledAmount,
          quotationId: id
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response, '-------response');
      return response.data;
    } catch (err) {
      console.log(err, '------------error', err.message);
      if (err && err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const approveQuotationAsync = createAsyncThunk(
  'movetech/approveQuotationAsync',
  async (
    { assignedpeople, advanceAmount, deliveryDate, startDate, token, id },
    { rejectWithValue }
  ) => {
    const people = assignedpeople.map((obj) => obj._id);
    console.log('thunk--', assignedpeople, advanceAmount, deliveryDate, startDate, token, id);

    try {
      const response = await axios({
        method: 'POST',
        url: `${config.API_URL}/api/approve-quotation`,
        data: {
          advanceAmount,
          deliveryDate,
          startDate,
          people,
          quotationId: id
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response, '-------response');
      return response.data;
    } catch (err) {
      console.log(err, '------------error', err.message);
      if (err && err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const endQuotationAsync = createAsyncThunk(
  'movetech/endQuotationAsync',
  async ({ endDate, settledAmount, token, id }, { rejectWithValue }) => {
    console.log('thunk--', endDate, settledAmount, token, id);

    try {
      const response = await axios({
        method: 'POST',
        url: `${config.API_URL}/api/end-quotation`,
        data: {
          settledAmount,
          endDate,
          quotationId: id
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response, '-------response');
      return response.data;
    } catch (err) {
      console.log(err, '------------error', err.message);
      if (err && err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const getContractsDataAsync = createAsyncThunk(
  'movetech/getContractsDataAsync',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.API_URL}/api/getallmtquotations`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response, '-------response');
      return response.data.quotations;
    } catch (err) {
      console.log(err, '------------error', err.message);
      if (err && err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const getQuotationsAsync = createAsyncThunk(
  'movetech/getQuotationsAsync',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.API_URL}/api/getmt-quotations`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response, '-------response');
      return response.data.data;
    } catch (err) {
      console.log(err, '------------error', err.message);
      if (err && err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const setQuotationtoAcceptedAsync = createAsyncThunk(
  'movetech/setQuotationtoAcceptedAsync',
  async ({ token, id, state }, { rejectWithValue }) => {
    console.log('thunk--', token, id, state);

    try {
      const response = await axios({
        method: 'POST',
        url: `${config.API_URL}/api/set-quotation`,
        data: {
          arrayElementId: id,
          state
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response, '-------response');
      return response.data;
    } catch (err) {
      console.log(err, '------------error', err.message);
      if (err && err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);
