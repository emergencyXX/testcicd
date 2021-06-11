import s from './../Dialogs.module.css';




const MessageItem = (props) => {
    return(
        <div className={s.message_item}>
            <img className={s.img_dialog} src={props.src} alt="#"/>
            <p className={s.entity}>{props.message}</p>
        </div>
    );
}


export default MessageItem;