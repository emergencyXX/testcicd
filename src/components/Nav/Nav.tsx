import s from './Nav.module.css';
import {NavLink} from "react-router-dom";
import React from "react";
function Nav() {
    return(
        <nav className={s.nav}>
            <ul className={s.list}>
                <li className={s.item}>
                    <NavLink activeClassName={s.active} className={s.link} to={'/main' }>Profile</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink activeClassName={s.active} className={s.link} to="/dialogs">Message</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink activeClassName={s.active} className={s.link} to="/News">News</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink activeClassName={s.active} className={s.link} to="/Music">Music</NavLink>
                </li>
                <li className={s.item}>
                    <NavLink activeClassName={s.active} className={s.link} to="/FindUsers">Find Users</NavLink>
                </li>
                <li className={s.item_settings}>
                    <NavLink activeClassName={s.active} className={s.link} to="/Settings">Settings</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;