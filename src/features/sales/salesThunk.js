import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../config/apiconfig';

export const getAttendanceAsync = createAsyncThunk(
  'sales/getAttendanceAsync',
  async ({ token }, { rejectWithValue }) => {
    try {
      console.log(token, '---------token');
      const response = await axios({
        method: 'GET',
        url: `${config.API_URL}/api/getuserattendance`,
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

export const addAttendanceAsync = createAsyncThunk(
  'sales/addAttendanceAsync',
  async ({ currentTimestamp, location, token }, { rejectWithValue }) => {
    console.log('thunk', currentTimestamp, location, token);

    try {
      const response = await axios({
        method: 'POST',
        url: `${config.API_URL}/api/add-attendance`,
        data: {
          currentTimestamp,
          location
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
