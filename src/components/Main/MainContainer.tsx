import React, { useContext, useEffect } from "react";
import Main from "./Main";
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { compose } from "redux";
import { GlobalContext } from "../../context/globalContext";
import { mainUserAPI } from "../../api/api";
import { useParams } from "react-router";

interface iParams {
  userId: string;
}

const MainContainer = () => {
  const { store, constants } = useContext(GlobalContext);
  let { userId }: iParams = useParams();

  const getUsersMainThunkCreator = async (userId: string) => {
    let data = await mainUserAPI.getUserMain(userId);

    store.dispatch({ type: constants.SET_USER_MAIN, main: data });
  };

  const getStatusMainThunkCreator = async (userId: string) => {
    let response = await mainUserAPI.getStatusUserMain(userId);
    store.dispatch({ type: constants.SET_STATUS, status: response.data });
  };

  useEffect(() => {
    const userIdData = userId || store.state.userId;
    if (userIdData) {
      getUsersMainThunkCreator(userIdData);
      getStatusMainThunkCreator(userIdData);
    }
  }, []);

  return <Main />;
};

export default compose(withAuthRedirect)(MainContainer);
