import { useRef, useState, useEffect } from "react";

import GenericIconButton from "./utils/generic_icon_button";
import PrimaryButton from "./utils/primary_button";
import GreyBorderButton from "./utils/grey_border_button";
import TabItem from "./tab_item";
import { iWindowItem} from "../interfaces/window_item";
import EditableTabItem from "./editable_tab_item";
import { iTabItem } from "../interfaces/tab_item";

function WindowItem(props: iWindowItem): JSX.Element {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<string>("list");
    const { id, tabs, initExpand } = props;
    
    function handleExpand(): void {
        setExpanded(expanded === true ? false : true);
    }

    function handleChangeViewMode(): void {
        setViewMode(viewMode === "list" ? "grid" : "list");
    }

    function renderTabs(){
        let result = [];

        result = tabs.map((tab, i) => <TabItem key={"tab-" + i} id={tab.id} label={tab.label} url={tab.url} />)

        return result;
    }


    function renderEditTab(windowId: number, tabId?: number){
        return <EditableTabItem windowId={windowId} id={tabId} />
    }

    useEffect(() => {
       if(initExpand === true) setExpanded(true); 
    },[])

    return (
        <div className="window-item w-full" id={`window-${id}`}>
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
                <div className={`${viewMode === "list" ? "mx-auto" : "grid grid-cols-3 gap-x-4 gap-y-0"}`}>
                {tabs.length > 0 ? [...renderTabs()] : [renderEditTab(id)]}
                </div>
                <div className="mt-10 flex justify-end">
                    {tabs.length > 0 && <GreyBorderButton text="Delete" onClick={() => {}} />}
                    <PrimaryButton text="New tab" onClick={() => {}} />
                </div>
            </div>
            
        </div>
    ); 
}

export default WindowItem;