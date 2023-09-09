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
import PrimaryButton from "./utils/primary_button";
import GreyBorderButton from "./utils/grey_border_button";
import TabItem from "./tab_item";

function WindowItem(props: iWindowItem): JSX.Element {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<string>("list");
    const { id, tabs, key } = props;
    
    function handleExpand(): void {
        setExpanded(expanded === true ? false : true);
    }

    function handleChangeViewMode(): void {
        setViewMode(viewMode === "list" ? "grid" : "list");
    }

    function renderTabs(){
        let result = [];

        result = tabs.map((tab, i) => <TabItem key={i} id={tab.id} label={tab.label} url={tab.url} />)

        return result;
    }

    return (
        <div className="window-item" id={`window-${id}`}>
            <div className="flex justify-between items-center w-full border-b border-black pb-2">
                <h3 className="text-lg">
                    {`Window ${id}`}
                </h3>
                <div className={`tab-settings`}>
                    <GenericIconButton icon="grid" size={24} fill="#000" onClick={handleChangeViewMode} />
                    <GenericIconButton icon="trash" size={24} fill="#000" onClick={() => {}} />
                    <GenericIconButton icon={expanded === true ? "collapse" : "expand"} size={30} fill="#000" onClick={handleExpand} />
                </div>
            </div>
            <div className={`tabs-list mt-6 ${expanded === true ? "block" : "hidden"}`}>
                <div className={`${viewMode === "list" ? "mx-auto" : "grid grid-cols-4 gap-x-4 gap-y-0"}`}>
                {...renderTabs()}
                </div>
                <div className="mt-10 flex justify-end">
                    <GreyBorderButton text="Delete" onClick={() => {}} />
                    <PrimaryButton text="New tab" onClick={() => {}} />
                </div>
            </div>
            
        </div>
    ); 
}

export default WindowItem;