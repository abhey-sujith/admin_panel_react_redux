import axios from 'axios';

import { logout } from '../features/auth/logout';
import { store } from '../app/store';

// Setting up axios
const AxiosService = {
  init() {
    this.setInterceptor();
  },

  setInterceptor() {
    // Response interceptor
    axios.interceptors.response.use(
      (response) => response,

      // If there is a error in the response this function is executed
      async (error) => {
        const originalRequest = error.config;

        console.log(' interceptors.response url = ', originalRequest);
        console.log(
          'error.response.status / message--- ',
          error.response?.status,
          error.response?.data?.message
        );

        // if refresh token is rejected the user is logged out
        if (
          error?.response?.status === 401 &&
          (error.response?.data?.message === 'Token is not valid' ||
            error.response?.data?.message === 'Auth token is not supplied')
        ) {
          console.log('logging out-----');
          logout(store.dispatch);
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );
  }
};

export default AxiosService;
