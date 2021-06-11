import s from './../Friends.module.css';

function FriendItem(props) {
    return (
        <div className={s.friend_item}>
            <img className={s.img_friends} src={props.src} alt=""/>
            <p className={s.name}>{props.name}</p>
        </div>
    );
}

export default FriendItem;