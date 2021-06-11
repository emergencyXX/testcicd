import s from './MyPosts.module.css';
import Posts from "./Posts/Posts";
import React, {useContext} from 'react';
import AddPostForm from "./AddPostForm";
import {GlobalContext} from "../../../context/globalContext";


const MyPosts = () => {
    const { store, constants } = useContext(GlobalContext);
    let postsElements = store.state.posts.map(posts => <Posts key={posts.id} message={posts.message} likeCount={posts.likeCount}/>)


    return (
        <div className={s.posts}>
            <h3 className={s.title}>My Posts</h3>
            <AddPostForm/>
            <div className={s.posts_list}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;