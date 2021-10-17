import { persistor } from '../../app/store';
import { nuke } from './authSlice';

export const logout = (dispatch) => {
  // await ApiService.clearToken();
  // await persistor.purge();
  dispatch(nuke());
  localStorage.setItem('persist:auth', '');
  // localStorage.removeItem('persist:auth');
  // persistor.persist();
  persistor.persist();
};
