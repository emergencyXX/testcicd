import s from "./ProfileInfo.module.css";
import common from "../../common/Common.module.css";
import Preloader from "../../common/Preloader";
import React, { useContext, useState } from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import { GlobalContext } from "../../../context/globalContext";
import { mainUserAPI } from "../../../api/api";

const ProfileInfo = () => {
  const { store, constants } = useContext(GlobalContext);
  const [editMode, setEditMode] = useState(false);

  const savePhotoThunkCreator = async (file:File) => {
    let response = await mainUserAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
      store.dispatch({
        type: constants.SET_PHOTO,
        photos: response.data.data.photos,
      });
    }
  };

  if (!store.state.main) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e!.target.files.length) {
      savePhotoThunkCreator(e.target.files[0]);
    }
  };

  return (
    <div>
      <img
        className={s.img_top}
        src="https://s3.ap-south-1.amazonaws.com/clecotech/static_images/react-one.jpg"
        alt=""
      />
      <div className={s.profile}>
        <img
          className={s.profile__img}
          src={
            store.state.main.photos.large ||
            "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"
          }
          alt=""
        />
        <div className={s.info}>
          <h4 className={s.name}>{editMode || store.state.main.fullName}</h4>
          {editMode || (
            <ProfileStatusWithHooks />
          )}
          {editMode ? (
            <ProfileDataForm
              main={store.state.main}
              setEditMode={setEditMode}
            />
          ) : (
            <ProfileData
              goToEditMode={() => {
                setEditMode(true);
              }}
              main={store.state.main}
            />
          )}
        </div>
      </div>
      {store.state.userId ? (
        <div className={common.file_input}>
          <div>
            <input
              onChange={onMainPhotoSelected}
              type="file"
              id="file"
              className={common.file}
            ></input>
          </div>
          <label className={common.label} htmlFor="file">
            Select file
          </label>
        </div>
      ) : null}
    </div>
  );
};

export interface ProfileDataProps{
  main: {
    aboutMe: string;
    contacts: {
      [key:string]: string | null;
    }
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: {
      large: string;
      small: string;
    }
  } 
  goToEditMode:()=>void
}

const ProfileData = (props:ProfileDataProps) => {
  return (
    <div>
      <ul className={s.list}>
        <li className={s.list_item}>
          Looking for a job: {props.main.lookingForAJob ? "yes" : "no"}
        </li>
        {props.main.lookingForAJob ? (
          <li className={s.list_item}>
            Looking for a job description:{" "}
            {props.main.lookingForAJobDescription}
          </li>
        ) : null}
        <li className={s.list_item}>About me : {props.main.aboutMe}</li>
      </ul>
      <div>
        {" "}
        {Object.keys(props.main.contacts).map((key) => {
          return (
            <Contacts
              key={key}
              contactTitle={key}
              contactValue={props.main.contacts[key]}
            />
          );
        })}
      </div>
      <button className={common.button} onClick={props.goToEditMode}>
        Edit
      </button>
    </div>
  );
};

interface ContactsProps{
  contactTitle:string
  contactValue:string
}

export const Contacts = ({ contactTitle, contactValue }:ContactsProps) => {
  return (
    <div className={s.contact}>
      <div className={s.contact_row}>
        {contactValue ? (
          <div className={s.contact_title}>{contactTitle} : </div>
        ) : null}
        <a href={contactValue} className={s.contact_value}>
          {contactValue}
        </a>
      </div>
    </div>
  );
};

export default ProfileInfo;
