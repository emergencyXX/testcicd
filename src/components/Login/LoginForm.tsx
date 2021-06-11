import React, { useContext, useState } from "react";
import s from "./Login.module.css";
import { CustomInput } from "../common/FormControl";
import { headerAuthAPI, securityAPI } from "../../api/api";
import { GlobalContext } from "../../context/globalContext";

interface iLoginFormProps {
  captchaUrl: string | null;
  error?: string;
}

interface iFormState {
  email?: string;
  password?: string;
  captcha?: string;
  rememberMe?: boolean;
}

interface iRequiredPropTypes {
  email: null | boolean;
  password: null | boolean;
}

const LoginForm = (props: iLoginFormProps) => {
  const [formState, setFormState] = useState<iFormState>({
    email: "",
    password: "",
    captcha: "",
    rememberMe: false,
  });
  const { store, constants } = useContext(GlobalContext);
  const [locRequired, setRequired] = useState<iRequiredPropTypes>({
    email: null,
    password: null,
  });
  const [locMinLength, setMinLength] = useState({ password: null });
  const [checked, setChecked] = useState(false);

  const LoginUserThunkCreator = async (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => {
    store.dispatch({ type: constants.LOADING_ACTION, loading: true });
    let response = await headerAuthAPI.loginUser(
      email,
      password,
      rememberMe,
      captcha
    );
    if (response.data.resultCode === 0) {
      //dispatch(getAuthUserDataThunkCreator());
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
    } else {
      if (response.data.resultCode === 1) {
        //dispatch(getCaptchaUrl());
        const response = await securityAPI.getCaptchaUrl();
        store.dispatch({
          type: constants.SET_CAPTCHA,
          captchaUrl: response.data.url,
        });
      }
      let message = response.data.messages.length
        ? response.data.messages[0]
        : "E-mail or password is wrong";
    }
    store.dispatch({ type: constants.LOADING_ACTION, loading: false });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // !locRequired.email &&
        //   !locRequired.password &&
        //   !locMinLength.password &&
        LoginUserThunkCreator(
          formState.email,
          formState.password,
          formState.rememberMe,
          formState.captcha
        );
      }}
      className={s.form}
    >
      <CustomInput
        formState={formState}
        setFormState={setFormState}
        name="email"
        type="text"
        required={true}
        placeholder="E-mail"
        locRequired={locRequired.email}
        setRequired={setRequired}
        checked={checked}
      />
      <CustomInput
        formState={formState}
        setFormState={setFormState}
        name="password"
        type="password"
        required={true}
        minLength={8}
        placeholder="Password"
        locRequired={locRequired.password}
        locMinLength={locMinLength.password}
        setRequired={setRequired}
        setMinLength={setMinLength}
        checked={checked}
      />
      {props.captchaUrl && <img src={props.captchaUrl} alt="" />}
      {props.captchaUrl && (
        <CustomInput
          formState={formState}
          setFormState={setFormState}
          name="captcha"
          type="text"
          placeholder="Symbols"
        />
      )}
      <div className={s.summory_error}>{props.error}</div>
      <label className={s.label}>
        Remember me
        <CustomInput
          formState={formState}
          setFormState={setFormState}
          type="checkbox"
          name="rememberMe"
        />
      </label>
      <button
        type="submit"
        className={s.button}
        onClick={() => setChecked(true)}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
