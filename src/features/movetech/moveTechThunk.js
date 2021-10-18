import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config/apiconfig';

export const getMTUserDataAsync = createAsyncThunk(
  'movetech/getMTUserDataAsync',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API_URL}/api/getallmtusers`,
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
  async ({ contractname, contractdetails, assignedpeople, token }, { rejectWithValue }) => {
    console.log('thunk', contractname, contractdetails, assignedpeople);

    const contractpeopleids = assignedpeople.map((obj) => obj._id);
    console.log(contractpeopleids, '----------------contractpeopleids');
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/api/create-contract`,
        data: {
          contractname,
          contractdetails,
          contractpeople: contractpeopleids
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

export const editContractAsync = createAsyncThunk(
  'movetech/editContractAsync',
  async (
    { contractname, contractdetails, assignedpeople, contractId, token, state },
    { rejectWithValue }
  ) => {
    console.log('thunk', contractname, contractdetails, assignedpeople);

    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/api/edit-contract`,
        data: {
          contractname,
          contractdetails,
          contractpeople: assignedpeople,
          contractId,
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

export const getContractsDataAsync = createAsyncThunk(
  'movetech/getContractsDataAsync',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${API_URL}/api/getallmtcontract`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response, '-------response');
      return response.data.contracts;
    } catch (err) {
      console.log(err, '------------error', err.message);
      if (err && err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);
