import s from "./Login.module.css";
import LoginReduxForm from "./LoginForm";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const Login = () => {
  const { store, constants } = useContext(GlobalContext);

  if (store.state.isAuth) {
    return <Redirect to={"/main"} />;
  }
  return (
    <div>
      <h1 className={s.title}>Login</h1>
      <LoginReduxForm captchaUrl={store.state.captchaUrl} />
    </div>
  );
};


export default Login;
