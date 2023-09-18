import styles from "./../../styles/global_utils.module.scss";
import { iNavlink } from "../../interfaces/nav_link";
import { Link } from 'react-router-dom';
import MultipleFoldersIcon from "../../images/icons/multiple_folders_icon";
import ConfigIcon from "../../images/icons/config_icon";

function Navlink(props: iNavlink): JSX.Element {
    const { label, url, isActive, iconSize, onClick } = props;

    const activeLinkStyle: String = "font-semibold text-tbfColor-lightpurple";
    const inActiveLinkStyle: String = "font-semibold text-tbfColor-middlegrey2 hover:border-tbfColor-middlegrey2";

    function renderIcon(): JSX.Element {
      if(url === "/options"){
        return <MultipleFoldersIcon size={iconSize} fill={isActive === true ? "rgb(109 0 194)" : "#525252"} />
      } else if(url === "/settings"){
        return <ConfigIcon size={iconSize} fill={isActive === true ? "rgb(109 0 194)" : "#525252"} />
      }
      return <></>
    }

    return (
        <Link to={url} className={`text-left flex items-center text-xl ${isActive === true ? activeLinkStyle : inActiveLinkStyle} ${styles.opacity_hover_effect} ${label && "py-2"} mx-1 border-color border-tbfColor-lgrey block`} onClick={onClick}>
          {renderIcon()} {label && <span className="ml-3">{label}</span>}
        </Link>
    ); 
}

export default Navlink;