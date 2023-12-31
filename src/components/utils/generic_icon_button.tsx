import { iGenericIconButton } from "../../interfaces/generic_icon_button";
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
import CloseLightIcon from "../../images/icons/close_light_icon";
import ClosedFolderIcon from "../../images/icons/closed_folder_icon";
import LeftIcon from "../../images/icons/left_icon";
import OpenedFolderIcon from "../../images/icons/opened_folder_icon";
import RightIcon from "../../images/icons/right_icon";

/*
    An icon button used for all kind of things, where only an icon is sufficient (no labels)

    To make use of a new icon, insert a new if-statement returning the requested icon and
    check for the icon's prop name.

    E.g.
    ... 
    else if(icon === "myNewIcon"){
        return <MyNewIconComponent ... />
    } 
    ...
*/


function GenericIconButton(props: iGenericIconButton): JSX.Element {
    const { icon, fill, size, onClick } = props;
    
    function renderIcon(): JSX.Element {
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
        } else if(icon === "search"){
            return <SearchIcon size={size} fill={fill} />;
        } else if(icon === "list"){
            return <ListIcon size={size} fill={fill} />;
        } else if(icon === "grid"){
            return <GridIcon size={size} fill={fill} />;
        } else if(icon === "checked"){
            return <CheckedIcon size={size} fill={fill} />;
        } else if(icon === "edit"){
            return <PenIcon size={size} fill={fill} />;
        } else if(icon === "multi_folders"){
            return <MultipleFoldersIcon size={size} fill={fill} />;
        } else if(icon === "config"){
            return <ConfigIcon size={size} fill={fill} />;
        } else if(icon === "folder_duplicate"){
            return <FolderDuplicateIcon size={size} fill={fill} />;
        } else if(icon === "merge"){
            return <MergeIcon size={size} fill={fill} />;
        } else if(icon === "selected_checkbox"){
            return <SelectedCheckboxIcon size={size} fill={fill} />;
        } else if(icon === "deselected_checkbox"){
            return <DeselectedCheckboxIcon size={size} fill={fill} />;
        } else if(icon === "sort"){
            return <SortIcon size={size} fill={fill} />;
        } else if(icon === "close_light"){ 
            return <CloseLightIcon size={size} fill={fill} />;
        } else if(icon === "closed_folder"){ 
            return <ClosedFolderIcon size={size} fill={fill} />;
        } else if(icon === "left"){ 
            return <LeftIcon size={size} fill={fill} />;
        } else if(icon === "opened_folder"){
            return <OpenedFolderIcon size={size} fill={fill} />;
        } else if(icon === "right"){
            return <RightIcon size={size} fill={fill} />;
        } else {
            return <></>;
        }
    } 

    return (
        <button data-testid={`generic-icon-button-${icon}`} className={`${styles.opacity_hover_effect}`} onClick={onClick}>
            {renderIcon()}
        </button>
    ); 
}

export default GenericIconButton;