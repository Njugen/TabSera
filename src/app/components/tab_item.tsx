import { useRef, useState, useEffect } from "react";
import styles from "./../../styles/global_utils.module.scss";
import OpenBrowserIcon from "../images/icons/open_browser_icon";
import SettingsIcon from "../images/icons/settings_icon";
import TrashIcon from "../images/icons/trash_icon";
import ExpandIcon from "../images/icons/expand_icon";
import CollapseIcon from "../images/icons/collapse_icon";
import Paragraph from './utils/paragraph';
import CheckedIcon from "@/app/images/icons/checked_icon";
import GenericIconButton from "./utils/generic_icon_button";
import Checkbox from "./utils/checkbox";

function TabItem(props: iTabItem): JSX.Element {
    const { id, label, url } = props;
    

    return (
        <div className="hover:bg-tbfColor-lighterpurple hover:text-tbfColor-darkpurple tab-item border-tbfColor-middlegrey4 hover:border-tbfColor-lightpurple border my-1 flex items-center justify-between">
            <a href={url} className="text-sm p-2 tab-item-info w-full" target="_blank">
                <img src="/" className="w-18 h-18 bg-black inline-block" />
                <span className="mx-3">{label}</span>
            </a>
          
            <div className="tab-item-settings p-2">
                <Checkbox onCallback={(e) => {}} />
            </div>
    </div>
    ); 
}

export default TabItem;