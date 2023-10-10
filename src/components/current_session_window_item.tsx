import { useState, useEffect } from "react";
import GenericIconButton from "./utils/generic_icon_button";
import TabItem from "./tab_item";
import { iWindowItem} from "../interfaces/window_item";
import EditableTabItem from "./editable_tab_item";
import { useDispatch, useSelector } from "react-redux";
import { updateInEditFolder } from "../redux/actions/inEditFolderActions";

function CurrentSessionWindowItem(props: iWindowItem): JSX.Element {
    const [expanded, setExpanded] = useState<boolean>(true);
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

    function handleChangeViewMode(): void {
        setViewMode(viewMode === "list" ? "grid" : "list");
        setExpanded(true);
    }

    function handleDeleteWindow(): void {
        const windows = currentSessionData.windows.filter((target: iWindowItem) => target.id !== id);

        dispatch(updateInEditFolder("windows", windows));
    }

    function handleAddNewTab(): void {
        setNewTab(true);
    }

    function handleMark(tabId: number, checked: boolean): void {
        if(checked === true){
            const findInState = markedTabs.findIndex((target) => target === tabId);
            if(findInState < 0){  
                setMarkedTabs([...markedTabs, tabId]);
            }
        } else {
            const filteredMarks = markedTabs.filter((id) => id !== tabId);
            setMarkedTabs([...filteredMarks]);
        }
    }

    function handleDeleteTabs(): void {
        chrome.tabs.remove(markedTabs);
    }

    function handleTabEdit(id: number): void {
        setEditTab(id);
    }

    function renderEditTab(windowId: number, url?: string, tabId?: number): JSX.Element {
        return <EditableTabItem windowId={windowId} id={tabId} preset={url} onStop={() => setEditTab(null)} />
    }

    function handleCloseTab(tabId: number){
        chrome.tabs.remove(tabId);
    }

    function renderTabs(): Array<JSX.Element> {
        let result = [];
        
        result = tabs.map((tab, i) => {
            if(editTab === tab.id){
                return renderEditTab(id, tab.url, editTab);
            } else {
                return <TabItem marked={false} disableCloseButton={tabs.length > 1 ? false : true} disableMark={true} disableEdit={disableTabEdit} key={tab.id} id={tab.id} label={tab.label} url={tab.url} onMark={handleMark} onEdit={handleTabEdit} onClose={handleCloseTab} />
            }
            
        })

        return result;
    }


    
    function evaluateNewTabRender(): Array<JSX.Element> {
        if(newTab === true){
            return [...renderTabs(), renderEditTab(id)];
        } else {
            return [...renderTabs()];
        }
    }


    useEffect(() => {
       if(initExpand === true) setExpanded(true); 
    },[])

    return (
        <div className="window-item w-full py-1 rounded-md mb-3" id={`window-${id}`}>
            <div className="flex justify-between items-center w-full border-b border-tbfColor-darkgrey">
                <h3 className="text-sm font-semibold ">
                    {`Window`}
                </h3>
                <div className={`tab-settings`}>
                    {/*<GenericIconButton icon="grid" size={18} fill="#000" onClick={handleChangeViewMode} />*/}
                    {disableEdit === false && <GenericIconButton icon="trash" size={20} fill="#000" onClick={handleDeleteWindow} />}
                    <GenericIconButton icon={expanded === true ? "collapse" : "expand"} size={20} fill="#000" onClick={handleExpand} />
                </div>
            </div>
            <div className={`tabs-list mt-3 overflow-hidden ${expanded === true ? "max-h-[2000px] ease-out" : "max-h-0 ease-in"} duration-200 transition-all`}>
                <div className={`${/*viewMode === "list" ? "mx-auto" : "grid grid-cols-3 gap-x-3 gap-y-0"*/ `grid grid-cols-${tabsCol ? tabsCol : 2} gap-x-3 gap-y-0`}`}>
                {tabs.length > 0 ? [...evaluateNewTabRender()] : [renderEditTab(id)]}
                </div>
                {tabs.length > 0 && <div className="mt-10 mb-8 flex justify-end">
                    {/*markedTabs.length > 0 && <GreyBorderButton disabled={false} text="Close marked tabs" onClick={handleDeleteTabs} />*/}
                    {/*disableEdit === false && <PrimaryButton disabled={false} text="New tab" onClick={handleAddNewTab} />*/}
                </div>}
            </div>
            
        </div>
    ); 
}

export default CurrentSessionWindowItem;