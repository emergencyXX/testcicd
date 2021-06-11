import common from "../../common/Common.module.css";
import s from "./MyPosts.module.css";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../context/globalContext";


const AddPostForm = () => {
  const { store, constants } = useContext(GlobalContext);
  const [post, setPost] = useState(null);
  const addPost = (post:string) => {
    store.dispatch({ type: constants.ADD_POST, newPostBody: post });
  };

  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>): void  => {
    setPost(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addPost(post);
      }}
    >
      <textarea
        onChange={onChange}
        className={s.textarea_post}
        name={"newPostBody"}
      />
      <button className={common.button}>Send</button>
    </form>
  );
};

export default AddPostForm;
