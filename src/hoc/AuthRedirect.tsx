import React, {useContext} from 'react';
import {Redirect} from "react-router-dom";
import {GlobalContext} from "../context/globalContext";

export const withAuthRedirect = (Component:React.FC) => {

    const RedirectComponent = (props:any) => {
        const { store } = useContext(GlobalContext);
        const isAuthLocalStorage = localStorage.getItem('userId');
        if (!store.state.isAuth && !isAuthLocalStorage) return <Redirect to={"/login"}/>
        return <Component {...props}/>
    }
    return RedirectComponent;
}