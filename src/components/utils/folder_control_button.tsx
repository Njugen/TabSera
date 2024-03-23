import styles from "./../../styles/global_utils.module.scss";
import { iFolderIconButton } from "../../interfaces/folder_icon_button";
import OpenBrowserIcon from "../../images/icons/open_browser_icon";
import SettingsIcon from "../../images/icons/settings_icon";
import TrashIcon from "../../images/icons/trash_icon";
import CollapseIcon from "../../images/icons/collapse_icon";
import RotationEffect from "../effects/rotation_effect";

/*
    A button used for various options for a folder. Each button may have different icons using the props.icon variable. Used only in the
    in the folder's action bar.

    To make use of a new icon, insert a new if-statement returning the requested button and
    check for the icon's prop name.

    E.g.
    ... 
    else if(icon === "myNewIcon"){
        return <MyNewIconComponent ... />
    } 
    ...
*/

const FolderControlButton = (props: iFolderIconButton): JSX.Element => {
    const { icon, active, onClick } = props;
    const { opacity_hover_effect } = styles;
    
    const renderIcon = (): JSX.Element => {
        if(icon === "trash"){
            return <TrashIcon size={17} fill={active === false ? "#000" : "#000"} />;
        } else if(icon === "settings"){
            return <SettingsIcon size={17} fill={active === false ? "#000" : "#000"} />;
        } else if(icon === "open_browser"){
            return <OpenBrowserIcon size={17} fill={active === false ? "#000" : "#000"} />;
        } else if(icon === "collapse_expand"){
            return (
                <RotationEffect rotated={active}>
                    <CollapseIcon size={28} fill={"#000"} />
                </RotationEffect>
            )
        } 
        return <></>;
    }

    const buttonTestId = (): String => {
        if(icon === "collapse_expand"){
            // If this button's icon is a collapse or expand, use this id
            return `folder-control-button-${active === true ? "collapse" : "expand"}`;
        } else {
            return `folder-control-button-${icon ? icon : "none"}`;
        }
        
    } 
    
    return (
        <button 
            data-testid={buttonTestId()} 
            className={`${icon !== "collapse_expand" && "mx-2"} ${opacity_hover_effect}`} 
            onClick={onClick}
        >
            {renderIcon()}
        </button>
    ); 
}

export default FolderControlButton;