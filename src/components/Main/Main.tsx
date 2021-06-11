import s from "./Main.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";
import MyPosts from "./MyPosts/MyPosts";

function Main() {
  return (
    <main className={s.main}>
      <ProfileInfo/>
      <MyPosts />
    </main>
  );
}

export default Main;