import styles from "./../../styles/global_utils.module.scss";

import OpenBrowserIcon from "../../images/icons/open_browser_icon";
import SettingsIcon from "../../images/icons/settings_icon";
import TrashIcon from "../../images/icons/trash_icon";
import ExpandIcon from "../../images/icons/expand_icon";
import CollapseIcon from "../../images/icons/collapse_icon";
import CloseIcon from "@/app/images/icons/close_icon.";

function GenericIconButton(props: iGenericIconButton): JSX.Element {
    const { icon, fill, size, onClick } = props;
    
    function renderIcon(): any {
        if(icon === "trash"){
            return <TrashIcon size={size} fill={fill} />;
        } else if(icon === "settings"){
            return <SettingsIcon size={size} fill={fill} />;
        } else if(icon === "open_browser"){
            return <OpenBrowserIcon size={size} fill={fill} />;
        } else if(icon === "collapse"){
            return <CollapseIcon size={size} fill={fill} />;   
        } else if(icon === "expand") {
            return <ExpandIcon size={size} fill={fill} />;
        } else if(icon === "close"){
            return <CloseIcon size={size} fill={fill} />;
        }
    }

    return (
        <button className={`${icon !== "collapse_expand" && "mx-3"} ${icon === "collapse_expand" && "ml-5"} ${styles.opacity_hover_effect}`} onClick={onClick}>
            {renderIcon()}
        </button>
    ); 
}

export default GenericIconButton;