import { useState } from "react";
import GenericIconButton from "./utils/generic_icon_button";
import TabItem from "./tab_item";
import { iWindowItem} from "../interfaces/window_item";
import CollapseIcon from "../images/icons/collapse_icon";
import ExpandIcon from "../images/icons/expand_icon";

const CurrentSessionWindowItem = (props: iWindowItem): JSX.Element => {
    const [expanded, setExpanded] = useState<boolean>(props.initExpand || false);
    const { id, tabs, tabsCol, disableTabEdit} = props;

    const handleExpand = (): void =>  {
        setExpanded(expanded === true ? false : true);
    }

    const handleCloseTab = (tabId: number): void =>{
        chrome.tabs.remove(tabId);
    }

    const renderTabs = (): Array<JSX.Element> => {
        let result = [];
        
        result = tabs.map((tab, i) => {
            return (
                <TabItem 
                    marked={false} 
                    disableCloseButton={tabs.length > 1 ? false : true} 
                    disableMark={true} 
                    disableEdit={disableTabEdit} 
                    key={tab.id} 
                    id={tab.id} 
                    label={tab.label} 
                    url={tab.url} 
                    onClose={handleCloseTab} 
                />
            );
        })

        return result;
    }

    const tabListCSS = (): string => {
        if(tabsCol && tabsCol < 2){
            return "mx-auto";
        } else if(tabsCol) {
            return `grid grid-cols-${tabsCol} gap-x-3 gap-y-0`;
        } else {
            return `grid grid-cols-2 gap-x-3 gap-y-0`;
        }
    }

    const expandCollapseButton = (): JSX.Element => {
        let icon: JSX.Element;

        if(expanded === true){
            icon = <CollapseIcon size={20} fill="#000" />
        } else {
            icon = <ExpandIcon size={20} fill="#000" />
        }

        return (
            <GenericIconButton icon={expanded === true ? "collapse" : "expand"} onClick={handleExpand}>
                {icon}
            </GenericIconButton>
        );
    }

    return (
        <div data-testid="window-item" className="window-item w-full py-1 rounded-md mb-3" id={`window-${id}`}>
            <div className="flex justify-between items-center w-full border-b border-tbfColor-darkgrey">
                <h3 className="text-sm font-semibold ">
                    Window
                </h3>
                <div className={`tab-settings`}>
                    {expandCollapseButton()}
                </div>
            </div>
            <div className={`tabs-list mt-3 overflow-hidden ${expanded === true ? "max-h-[2000px] ease-out" : "max-h-0 ease-in"} duration-200 transition-all`}>
                <div className={`${tabListCSS()}`}>
                    {expanded === true && [...renderTabs()]}
                </div>
            </div>
            
        </div>
    ); 
}

export default CurrentSessionWindowItem;