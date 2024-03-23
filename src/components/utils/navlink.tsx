import styles from "./../../styles/global_utils.module.scss";
import { iNavlink } from "../../interfaces/nav_link";
import { Link } from 'react-router-dom';
import MultipleFoldersIcon from "../../images/icons/multiple_folders_icon";
import ConfigIcon from "../../images/icons/config_icon";

/*
  Navigation link, intended to be used in the sidebar

  Each link has its own icon based on path/url. The path/url should point
  to a path defined by router-dom (defined in ./app.tsx)

  To add a new icon based on path, change the if-statement within renderIcon()
  E.g.

  ...
    else if(url === "/my-path"){
      <MyIcon ... />
    }
  ...
*/

const Navlink = (props: iNavlink): JSX.Element => {
    const { label, url, isActive, iconSize, onClick } = props;
    const { opacity_hover_effect } = styles

    const activeLinkStyle: String = "font-semibold text-tbfColor-lightpurple";
    const inActiveLinkStyle: String = "font-normal text-tbfColor-middlegrey3 hover:border-tbfColor-middlegrey3";

    const renderIcon = (): JSX.Element => {
      if(url === "?view=main"){
        return <MultipleFoldersIcon size={iconSize} fill={isActive === true ? "rgb(109 0 194)" : "#525252"} />
      } else if(url === "?view=settings"){
        return <ConfigIcon size={iconSize} fill={isActive === true ? "rgb(109 0 194)" : "#525252"} />
      } else {
        return <></>
      }
    }
    
    const stateCSS: String = isActive ? activeLinkStyle : inActiveLinkStyle;

    return (
        <Link to={url} className={`text-left xl:p-2 2xl:p-3 flex items-center text-lg ${stateCSS} ${opacity_hover_effect} ${label && "py-2"} border-color border-tbfColor-lgrey block`} onClick={onClick}>
          {renderIcon()} 
          {label && <span className="ml-3">{label}</span>}
        </Link>
    ); 
}

export default Navlink;