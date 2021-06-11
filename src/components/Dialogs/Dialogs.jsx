import s from './Dialogs.module.css';
import DialogsItem from "./DialogsItem/DialogItem";
import MessageItem from "./Message/Message";
import React from "react";
import {Redirect} from "react-router-dom";
import AddMessageFormRedux from "./AddMessageForm";


const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map((dialog,index) => <DialogsItem key={index} src={dialog.src} name={dialog.name}
                                                                         id={dialog.id}/>);

    let messageElements = props.state.messages.map((message,index) => <MessageItem key={index} src={message.src}
                                                                           message={message.message}/>)

    if (props.isAuth == false) return <Redirect to={"/login"}/>

    let addNewMessage = (formData) => {
        props.addMessage(formData.newMessageBody);
    }

    return (
        <div className={s.wrapp}>
            <div className={s.dialogs}>
                <h2 className={s.title}>Dialogs</h2>
                <div className={s.dialogs_list}>
                    {dialogsElements}
                </div>
            </div>
            <div className={s.message}>
                <div className={s.message_list}>
                    {messageElements}
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}

export default Dialogs;