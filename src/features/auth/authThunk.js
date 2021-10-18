import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config/apiconfig';

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ email, password }, { rejectWithValue }) => {
    console.log('thunk', email, password);
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/api/login`,
        data: {
          email,
          password
        },
        headers: {
          'Content-Type': 'application/json'
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

export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPasswordAsync',
  async ({ password }, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    console.log('thunk password', password);
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/api/reset-password`,
        data: {
          password
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

export const createUserAsync = createAsyncThunk(
  'auth/createUserAsync',
  async ({ email, username, role, token }, { rejectWithValue }) => {
    console.log('thunk', email, username, role);
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/api/superuser-createuser`,
        data: {
          email,
          username,
          role
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

export const editUserAsync = createAsyncThunk(
  'auth/editUserAsync',
  async ({ email, username, role, token }, { rejectWithValue }) => {
    console.log('thunk', email, username, role);
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/api/superuser-edituser`,
        data: {
          email,
          username,
          role
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
