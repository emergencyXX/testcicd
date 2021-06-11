import s from './../Dialogs.module.css';
import Route, {NavLink} from "react-router-dom";

const DialogsItem = (props) => {
    return(
        <div className={s.dialogs_item}>
            <NavLink className={s.nav_block} to={"/dialogs/"+ props.id} >
                <img className={s.img_profile} src={props.src} alt="#"/>
                <h5 className={s.name}>{props.name}</h5>
            </NavLink>
        </div>
    );
}


export default DialogsItem;