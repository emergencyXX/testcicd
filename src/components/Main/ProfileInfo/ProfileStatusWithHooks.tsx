import React, { useContext, useState } from "react";
import s from "./ProfileInfo.module.css";
import { GlobalContext } from "../../../context/globalContext";
import { mainUserAPI } from "../../../api/api";


const ProfileStatusWithHooks = () => {
    const { store, constants } = useContext(GlobalContext);
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(store.state.status)

    const updateStatusMainThunkCreator = async (status:string) => {

        let response = await mainUserAPI.updateStatusUserMain(status)
        if (response.data.resultCode === 0) {
            store.dispatch({type: constants.SET_STATUS,status});
        }

    }

    let activateEditMode = () => {
        setEditMode(true)
    }

    let disabledEditMode = () => {
        setEditMode(false)
        updateStatusMainThunkCreator(status)

    }

    let onStatusChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    
    return (
        <div>
            {!editMode &&
            <p className={s.status} onClick={activateEditMode}
            >Status : {store.state.status ? store.state.status : "Status:"}</p>
            }
            {editMode &&
            <input className={s.status_input} autoFocus={true} onBlur={disabledEditMode}
                   value={status} onChange={onStatusChange} type="textarea"/>
            }
        </div>
    );

}

export default ProfileStatusWithHooks;