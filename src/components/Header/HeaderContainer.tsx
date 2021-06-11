import React, { useContext } from "react";
import Header from "./Header";
import { GlobalContext } from "../../context/globalContext";
import {headerAuthAPI} from "../../api/api";

const HeaderContainer = () => {
  const { store, constants } = useContext(GlobalContext);

  const logout = async () => {
    store.dispatch({ type: constants.LOADING_ACTION, loading: true });
    let response = await headerAuthAPI.logoutUser();
    if (response.data.resultCode === 0) {
      localStorage.removeItem("userId");
      store.dispatch({
        type: constants.SET_USER_DATA,
        data: { userId: null, email: null, login: null, isAuth: false },
      });
    }
    store.dispatch({ type: constants.LOADING_ACTION, loading: false });
  };

  return (
    <Header
      isAuth={store.state.isAuth}
      login={store.state.login}
      logout={logout}
    />
  );
};

export default HeaderContainer;
