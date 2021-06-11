import s from "./../FindUsers.module.css";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../../context/globalContext";
import { usersAPI } from "../../../api/api";
import { useContext } from "react";

interface UserItemPropsTypes {
  followed:boolean;
  isFollowing:boolean;
  id:string;
  src:string;
  name:string;
  status:string;
  location:string;
}

const UserItem = (props:UserItemPropsTypes) => {
  const { store, constants } = useContext(GlobalContext);

  const follow = async (userId:string) => {
    if (props.followed) {
      let response = await usersAPI.unfollow(userId);

      if (response.data.resultCode === 0) {
        store.dispatch({ type: constants.UNFOLLOW, userId: userId });
        //setFollowed(false);
      }
    } else {
      let response = await usersAPI.follow(userId);

      if (response.data.resultCode === 0) {
        store.dispatch({ type: constants.FOLLOW, userId: userId });
        //setFollowed(true);
      }
    }
  };

  return (
    <div className={s.user_item}>
      <div className={s.img_block}>
        <NavLink to={"/main/" + props.id}>
          <img
            className={s.img}
            src={
              props.src ||
              "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"
            }
            alt=""
          />
        </NavLink>
        <button
          disabled={props.isFollowing}
          onClick={() => {
            follow(props.id);
          }}
          className={s.button_follow}
        >
          {props.followed ? "Unfollow" : "Follow"}
        </button>
      </div>
      <div className={s.info_block}>
        <div className={s.left_block}>
          <h4 className={s.name}>{props.name}</h4>
          <p className={s.status}>Status: {props.status}</p>
        </div>
        <div className={s.right_block}>
          <p className={s.location}>City: {"props.location.city"}</p>
          <p className={s.location}>Country: {"props.location.country"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
