import axios from 'axios';
import { config } from '../config/apiconfig';

export const getUsersData = async (token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${config.API_URL}/api/superuser-getallusers`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response, '-------response');
    return response.data.users;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const deleteUser = async (id, token) => {
  try {
    console.log(id);
    const response = await axios({
      method: 'DELETE',
      url: `${config.API_URL}/api/superuser-deleteuser`,
      data: {
        userId: id
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response, '-------response');
    return response?.data?.response?.deletedCount === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteQuotation = async (id, token) => {
  try {
    console.log(id);
    const response = await axios({
      method: 'DELETE',
      url: `${config.API_URL}/api/deletemtquotation`,
      data: {
        quotationId: id
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response, '-------response');
    return response?.data?.response?.deletedCount === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getgeoData = async (lat, lon) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response, '-------response');
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
