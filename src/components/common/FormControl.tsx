import React from "react";
import s from "./FormControl.module.css";

interface InputPropsTypes {
  input: string;
  meta: { [key: string]: any };
  [key: string]: any;
}

export const Textarea = ({ input, meta, ...props }: InputPropsTypes) => {
  const hasError = meta.error && meta.touched;
  return (
    <div>
      <textarea
        className={s.message + " " + (hasError ? s.error_textarea : "")}
        {...input}
        {...props}
      ></textarea>
      {hasError && <p className={s.message_error}>{meta.error}</p>}
    </div>
  );
};

export const InputLogin = ({ input, meta, ...props }: InputPropsTypes) => {
  const hasError = meta.error && meta.touched;
  return (
    <div>
      {hasError ? (
        <p className={s.message_error}>{meta.error}</p>
      ) : (
        <p className={s.messaege_null}>Error message</p>
      )}
      <input
        className={s.input + " " + (hasError ? s.error_textarea : "")}
        {...input}
        {...props}
      ></input>
    </div>
  );
};

interface CustomInputPropTypes {
  name?: string;
  setFormState?: (e: { [key: string]: any }) => void;
  formState?: { [key: string]: any };
  type?: string;
  locRequired?: boolean;
  locMinLength?: number;
  required?: boolean;
  placeholder?: string;
  setRequired?: (required: { email: any; password: any }) => void;
  setMinLength?: (minLength: { password: null | number }) => void;
  checked?: boolean;
  minLength?: number;
  className?: string;
}

export const CustomInput = (props: CustomInputPropTypes) => {
  const {
    name,
    setFormState,
    formState,
    type,
    locRequired = null,
    locMinLength = null,
  } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    type === "checkbox"
      ? setFormState({ ...formState, [name]: e.currentTarget.checked })
      : setFormState({
          ...formState,
          [name]: e.target.value,
        });
  };

  return (
    <>
      <input onChange={onChange} value={formState[name]} {...props} />
      {locRequired && <p>{locRequired}</p>}
      {locMinLength && <p>{locMinLength}</p>}
    </>
  );
};

export const ProfileInput = (props: CustomInputPropTypes) => {
  const { name, setFormState, formState, type } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    type === "checkbox"
      ? setFormState({ ...formState, [name]: e.currentTarget.checked })
      : setFormState({
          ...formState,
          [name]: e.target.value,
        });
  };

  return (
    <>
      <input onChange={onChange} value={formState[name]} {...props} />
    </>
  );
};

export const ProfileContactsInput = (props: CustomInputPropTypes) => {
  const { name, setFormState, formState } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      contacts: {
        ...formState.contacts,
        [name]: e.target.value,
      },
    });
  };

  return (
    <>
      <input onChange={onChange} value={formState.contacts[name]} {...props} />
    </>
  );
};
