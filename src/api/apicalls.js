import axios from 'axios';

export const getUsersData = async (token) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:4000/api/superuser-getallusers',
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
      url: 'http://127.0.0.1:4000/api/superuser-deleteuser',
      data: {
        userId: id
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response, '-------response');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
