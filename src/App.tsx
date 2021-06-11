import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import FindUsersContainer from "./components/FindUsers/FindUsersContainer";
import MainContainer from "./components/Main/MainContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Preloader from "./components/common/Preloader";
import Nav from "./components/Nav/Nav";
import { useContext, useEffect } from "react";
import { GlobalContext, GlobalProvider } from "./context/globalContext";
import { headerAuthAPI } from "./api/api";

const App = () => {
  const { store, constants } = useContext(GlobalContext);

  const getAuthUserDataThunkCreator = async () => {
    store.dispatch({ type: constants.LOADING_ACTION, loading: true });
    let response = await headerAuthAPI.getAuthUserData();
    if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data;
      localStorage.setItem("userId", id);
      //  dispatch(setAuthUserData(id, email, login, true));
      store.dispatch({
        type: constants.SET_USER_DATA,
        data: { userId: id, email, login, isAuth: true },
      });
    }
    store.dispatch({ type: constants.LOADING_ACTION, loading: false });
  };

  useEffect(() => {
    getAuthUserDataThunkCreator();
  }, []);

  if (store.state.loading) {
    return <Preloader />;
  }
  return (
    <>
      <HeaderContainer />
      <div className="container">
        <div className="wrapp">
          <div className="sidebar">
            <Nav />
          </div>
          <div className="wrapp-content">
            <Switch>
              <Route path="/main/:userId?" component={MainContainer} />
              {/*<Route path="/dialogs" render={() => <DialogsContainer />} />*/}
              <Route path="/news" component={News} />
              <Route path="/music" component={Music} />
              <Route path="/findUsers" component={FindUsersContainer} />
              <Route path="/settings" component={Settings} />
              <Route path="/login" component={Login} />
              <Route path="*" render={() => <div>404 not found</div>} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

const AppMain = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default AppMain;
