import { iTextIconButton } from "../../interfaces/text_icon_button";
import styles from "./../../styles/global_utils.module.scss";

import OpenBrowserIcon from "../../images/icons/open_browser_icon";
import SettingsIcon from "../../images/icons/settings_icon";
import TrashIcon from "../../images/icons/trash_icon";
import ExpandIcon from "../../images/icons/expand_icon";
import CollapseIcon from "../../images/icons/collapse_icon";
import CloseIcon from "../../images/icons/close_icon";
import SearchIcon from "../../images/icons/search_icon";
import ListIcon from "../../images/icons/list_icon";
import GridIcon from "../../images/icons/grid_icon";
import CheckedIcon from "../../images/icons/checked_icon";
import PenIcon from "../../images/icons/pen_icon";
import MultipleFoldersIcon from "../../images/icons/multiple_folders_icon";
import ConfigIcon from "../../images/icons/config_icon";
import FolderDuplicateIcon from "../../images/icons/folder_duplicate_icon";
import MergeIcon from "../../images/icons/merge_icon";
import SelectedCheckboxIcon from "../../images/icons/selected_checkbox_icon";
import DeselectedCheckboxIcon from "../../images/icons/deselected_checkbox_icon";
import SortIcon from "../../images/icons/sort_icon";

function TextIconButton(props: iTextIconButton): JSX.Element {
    const { icon, text, fill, size, onClick } = props;
    
    function renderIcon(): JSX.Element {
        if(icon === "trash"){
            return <TrashIcon size={size.icon} fill={fill} />;
        } else if(icon === "settings"){
            return <SettingsIcon size={size.icon} fill={fill} />;
        } else if(icon === "open_browser"){
            return <OpenBrowserIcon size={size.icon} fill={fill} />;
        } else if(icon === "collapse"){
            return <CollapseIcon size={size.icon} fill={fill} />;   
        } else if(icon === "expand") {
            return <ExpandIcon size={size.icon} fill={fill} />;
        } else if(icon === "close"){
            return <CloseIcon size={size.icon} fill={fill} />;
        } else if(icon === "search"){
            return <SearchIcon size={size.icon} fill={fill} />;
        } else if(icon === "list"){
            return <ListIcon size={size.icon} fill={fill} />;
        } else if(icon === "grid"){
            return <GridIcon size={size.icon} fill={fill} />;
        } else if(icon === "checked"){
            return <CheckedIcon size={size.icon} fill={fill} />;
        } else if(icon === "edit"){
            return <PenIcon size={size.icon} fill={fill} />;
        } else if(icon === "multi_folders"){
            return <MultipleFoldersIcon size={size.icon} fill={fill} />;
        } else if(icon === "config"){
            return <ConfigIcon size={size.icon} fill={fill} />;
        } else if(icon === "folder_duplicate"){
            return <FolderDuplicateIcon size={size.icon} fill={fill} />;
        } else if(icon === "merge"){
            return <MergeIcon size={size.icon} fill={fill} />;
        } else if(icon === "selected_checkbox"){
            return <SelectedCheckboxIcon size={size.icon} fill={fill} />;
        } else if(icon === "deselected_checkbox"){
            return <DeselectedCheckboxIcon size={size.icon} fill={fill} />;
        } else if(icon === "sort"){
            return <SortIcon size={size.icon} fill={fill} />;
        } else {
            return <></>;
        }
    } 

    return (
        <button className={`flex mr-6 items-center ${styles.opacity_hover_effect}`} onClick={onClick}>
            {renderIcon()} 
            <span className={`${size.text} ml-2`}>
                {text}
            </span>
        </button>
    ); 
}

export default TextIconButton;