import s from "./Friends.module.css";
import FriendItem from "./FriendItem/FriendItem";
function Friends(props) {
  let friendsElements = props.state.friend.map((friend) => (
    <FriendItem key={friend.id} src={friend.src} name={friend.name} />
  ));

  return (
    <div className={s.friends}>
      <h4 className={s.title}>Friends</h4>
      <div className={s.wrapp}>{friendsElements}</div>
    </div>
  );
}

export default Friends;
