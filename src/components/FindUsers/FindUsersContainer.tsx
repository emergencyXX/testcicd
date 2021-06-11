import React, { useContext, useEffect } from "react";
import Users from "./Users";
import Preloader from "../common/Preloader";
import { withAuthRedirect } from "../../hoc/AuthRedirect";
import { GlobalContext } from "../../context/globalContext";
import { usersAPI } from "../../api/api";

const UsersContainer = () => {
  const { store, constants } = useContext(GlobalContext);

  const getUsersThunkCreator = async (currentPage: number) => {
    store.dispatch({ type: constants.TOGGLE_IS_FETCHING, isFetching: true });
    store.dispatch({
      type: constants.SET_CURRENT_PAGE,
      currentPage: currentPage || store.state.currentPage,
    });
    let data = await usersAPI.getUsers(currentPage, store.state.pageSize);

    store.dispatch({ type: constants.TOGGLE_IS_FETCHING, isFetching: false });
    store.dispatch({ type: constants.SET_USERS, users: data.items });
    store.dispatch({
      type: constants.SET_TOTAL_USER_COUNT,
      totalUserCount: data.totalCount,
    });
  };

  useEffect(() => {
    getUsersThunkCreator(store.state.currentPage);
  }, []);

  const onPageChanged = (currentPage: number) => {
    getUsersThunkCreator(currentPage);
  };

  return (
    <>
      {store.state.isFetching ? <Preloader /> : null}
      <Users onPageChanged={onPageChanged} />
    </>
  );
};

export default withAuthRedirect(UsersContainer);
