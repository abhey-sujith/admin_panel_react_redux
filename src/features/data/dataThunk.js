import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMTUserDataAsync = createAsyncThunk(
  'data/getMTUserDataAsync',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:4000/api/getallmtusers',
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
  'auth/createContractAsync',
  async ({ contractname, contractdetails, assignedpeople, token }, { rejectWithValue }) => {
    console.log('thunk', contractname, contractdetails, assignedpeople);
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:4000/api/create-contract',
        data: {
          contractname,
          contractdetails,
          contractpeople: JSON.stringify(assignedpeople)
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
