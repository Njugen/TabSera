import styles from "./../../styles/global_utils.module.scss";
import { iNavlink } from "../../interfaces/nav_link";
import {Route, Link, Routes, useLocation} from 'react-router-dom';

function Navlink(props: iNavlink): JSX.Element {
    const { label, url, isActive, onClick } = props;

    const activeLinkStyle: String = "font-semibold text-tbfColor-lightpurple border-b-2 border-tbfColor-lightpurple";
    const inActiveLinkStyle: String = "font-semibold bg-tbfColor-lightgrey text-tbfColor-middlegrey2 border-b-2 border-tbfColor-lightgrey hover:border-tbfColor-middlegrey2";

    return (
        <Link to={url} className={`${isActive === true ? activeLinkStyle : inActiveLinkStyle} ${styles.opacity_hover_effect} px-3 py-2 mx-1 border-color border-tbfColor-lgrey`} onClick={onClick}>
          {label}
        </Link>
    ); 
}

export default Navlink;