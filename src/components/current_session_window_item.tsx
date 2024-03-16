import { useState, useEffect } from "react";
import GenericIconButton from "./utils/generic_icon_button";
import TabItem from "./tab_item";
import { iWindowItem} from "../interfaces/window_item";
import EditableTabItem from "./editable_tab_item";
import { useDispatch, useSelector } from "react-redux";
import { updateInEditFolder } from "../redux/actions/inEditFolderActions";

function CurrentSessionWindowItem(props: iWindowItem): JSX.Element {
    const [expanded, setExpanded] = useState<boolean>(props.initExpand || false);
    const [viewMode, setViewMode] = useState<string>("list");
    const [newTab, setNewTab] = useState<boolean>(false);
    const [editTab, setEditTab] = useState<number | null>(null);
    const [markedTabs, setMarkedTabs] = useState<Array<number>>([]);
    const { id, tabs, tabsCol, initExpand, disableEdit, disableTabEdit} = props;
    
    const dispatch = useDispatch();
    const currentSessionData = useSelector((state: any) => state.CurrentSessionSettingsReducer);

    function handleExpand(): void {
        setExpanded(expanded === true ? false : true);
    }

    function handleCloseTab(tabId: number){
        chrome.tabs.remove(tabId);
    }

    function renderTabs(): Array<JSX.Element> {
        let result = [];
        
        result = tabs.map((tab, i) => {
            return <TabItem marked={false} disableCloseButton={tabs.length > 1 ? false : true} disableMark={true} disableEdit={disableTabEdit} key={tab.id} id={tab.id} label={tab.label} url={tab.url} onClose={handleCloseTab} />
        })

        return result;
    }

    function tabListCSS(): string {
        if(tabsCol && tabsCol < 2){
            return "mx-auto";
        } else if(tabsCol) {
            return `grid grid-cols-${tabsCol} gap-x-3 gap-y-0`;
        } else {
            return `grid grid-cols-2 gap-x-3 gap-y-0`;
        }
    }

    return (
        <div data-testid="window-item" className="window-item w-full py-1 rounded-md mb-3" id={`window-${id}`}>
            <div className="flex justify-between items-center w-full border-b border-tbfColor-darkgrey">
                <h3 className="text-sm font-semibold ">
                    {`Window`}
                </h3>
                <div className={`tab-settings`}>
                    <GenericIconButton icon={expanded === true ? "collapse" : "expand"} size={20} fill="#000" onClick={handleExpand} />
                </div>
            </div>
            <div className={`tabs-list mt-3 overflow-hidden ${expanded === true ? "max-h-[2000px] ease-out" : "max-h-0 ease-in"} duration-200 transition-all`}>
                <div className={`${ tabListCSS()}`}>
                {expanded === true && [...renderTabs()]}
                </div>
               
            </div>
            
        </div>
    ); 
}

export default CurrentSessionWindowItem;