import { persistor } from "../../app/store";

export const logout = async (dispatch) => {
    await localStorage.setItem('persist:auth', '');
    // await ApiService.clearToken();
    // await persistor.purge();
    dispatch(nuke());
    // persistor.persist();
    persistor.persist();
  };