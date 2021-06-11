import React, { useContext, useState } from "react";
import s from "./ProfileInfo.module.css";
import common from "../../common/Common.module.css";
import { mainUserAPI } from "../../../api/api";
import { GlobalContext } from "../../../context/globalContext";
import { ProfileContactsInput, ProfileInput } from "../../common/FormControl";
import { iMain } from "../../../interfaces";

interface ProfileDataFormProps {
  main: iMain;
  setEditMode: (editMode: boolean) => void;
  error?: string;
}

const ProfileDataForm = (props: ProfileDataFormProps) => {
  const { store, constants } = useContext(GlobalContext);
  const [formState, setFormState] = useState(null);

  const getUsersMainThunkCreator = async (userId: string) => {
    let data = await mainUserAPI.getUserMain(userId);
    store.dispatch({ type: constants.SET_USER_MAIN, main: data });
  };

  const profileDataSaveThunkCreator = async (
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string,
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
  ) => {
    const userId = store.state.userId;

    let response = await mainUserAPI.profileDataSave(
      fullName,
      lookingForAJob,
      lookingForAJobDescription,
      aboutMe,
      github,
      vk,
      facebook,
      instagram,
      twitter,
      website,
      youtube,
      mainLink
    );
    if (response.data.resultCode === 0) {
      getUsersMainThunkCreator(userId);
      setFormState({
        ...formState,
        contacts: {
          github,
          vk,
          facebook,
          instagram,
          twitter,
          website,
          youtube,
          mainLink,
        },
      });
      //store.dispatch({type: constants.SET_USER_MAIN, main : formState})
      props.setEditMode(false);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        profileDataSaveThunkCreator(
          formState.fullName,
          formState.lookingForAJob,
          formState.lookingForAJobDescription,
          formState.aboutMe,
          formState.contacts.github,
          formState.contacts.vk,
          formState.contacts.facebook,
          formState.contacts.instagram,
          formState.contacts.twitter,
          formState.contacts.website,
          formState.contacts.youtube,
          formState.contacts.mainLink
        );
      }}
      className={s.form}
    >
      <ul className={s.list}>
        <li className={s.list_item}>
          Full name :{" "}
          <ProfileInput
            formState={formState}
            setFormState={setFormState}
            className={s.input_form}
            name="fullName"
            type="text"
            placeholder="Full Name"
          />
        </li>
        <li className={s.list_item}>
          Looking for a job:{" "}
          <ProfileInput
            formState={formState}
            setFormState={setFormState}
            className={s.input_form}
            name="lookingForAJob"
            type="checkbox"
          />
        </li>
        <li className={s.list_item}>
          Description:{" "}
          <ProfileInput
            formState={formState}
            setFormState={setFormState}
            className={s.input_form}
            name="lookingForAJobDescription"
            type="text"
            placeholder="My professional skills"
          />
        </li>
        <li className={s.list_item}>
          About me :{" "}
          <ProfileInput
            formState={formState}
            setFormState={setFormState}
            className={s.input_form}
            name="aboutMe"
            type="text"
            placeholder="About me"
          />
        </li>
      </ul>
      <div className={s.summory_error}>{props.error}</div>
      <div className={s.wrap_contact}>
        <div>
          {" "}
          {Object.keys(props.main.contacts).map((key) => {
            return (
              <div key={key}>
                <div className={s.wrap_input}>
                  <div className={s.contact_title}>{key}:</div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {" "}
          {Object.keys(props.main.contacts).map((key) => {
            return (
              <div key={key}>
                <div className={s.wrap_input}>
                  <ProfileContactsInput
                    formState={formState}
                    setFormState={setFormState}
                    className={s.input_form}
                    name={key}
                    type="text"
                    placeholder={key}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button className={common.button} type="submit">
        Save
      </button>
    </form>
  );
};

export default ProfileDataForm;
