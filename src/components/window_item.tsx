import { useRef, useState, useEffect } from "react";

import GenericIconButton from "./utils/generic_icon_button";
import PrimaryButton from "./utils/primary_button";
import GreyBorderButton from "./utils/grey_border_button";
import TabItem from "./tab_item";
import { iWindowItem} from "../interfaces/window_item";
import EditableTabItem from "./editable_tab_item";
import { iTabItem } from "../interfaces/tab_item";
import { useDispatch, useSelector } from "react-redux";
import { updateInEditFolder } from "../redux/actions/FoldersActions";

function WindowItem(props: iWindowItem): JSX.Element {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<string>("list");
    const [newTab, setNewTab] = useState<boolean>(false);
    const [editTab, setEditTab] = useState<number | null>(null);
    const [markedTabs, setMarkedTabs] = useState<Array<number>>([]);
    const { id, tabs, initExpand, disableEdit } = props;
    
    const dispatch = useDispatch();
    const folderData = useSelector((state: any) => state.InEditFolderReducers);

    useEffect(() => {
      
        if(newTab === true) setNewTab(false);
    }, [folderData]);

    function handleExpand(): void {
        setExpanded(expanded === true ? false : true);
    }

    function handleChangeViewMode(): void {
        setViewMode(viewMode === "list" ? "grid" : "list");
        setExpanded(true);
    }

    function handleDeleteWindow(): void {
        const windows = folderData.inEditFolder.windows.filter((target: iWindowItem) => target.id !== id);

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
        const windows = folderData.inEditFolder.windows.filter((target: iWindowItem) => target.id === id);
        const targetWindowIndex = folderData.inEditFolder.windows.findIndex((target: iWindowItem) => target.id === id);
        const tabs = windows[0]?.tabs;

        const newTabCollection: Array<iTabItem> = [];
        if(tabs){
            tabs.forEach((tab: iTabItem) => {
                const markedTabIndex = markedTabs.findIndex((target) => target === tab.id);
           
                if(markedTabIndex === -1){
                    // an index exists. Save it
                    newTabCollection.push(tab);
                    
                }
            });

            folderData.inEditFolder.windows[targetWindowIndex].tabs = [...newTabCollection];
            
            setMarkedTabs([]);
            dispatch(updateInEditFolder("windows", folderData.inEditFolder.windows));
        }
    }

    function handleTabEdit(id: number): void {
        setEditTab(id);
    }

    function renderEditTab(windowId: number, tabId?: number): JSX.Element {
        return <EditableTabItem windowId={windowId} id={tabId} onStop={() => setEditTab(null)} />
    }

    function renderTabs(): Array<JSX.Element> {
        let result = [];
        
        result = tabs.map((tab, i) => {
            if(editTab === tab.id){
                return renderEditTab(id, editTab);
            } else {
                return <TabItem key={tab.id} id={tab.id} label={tab.label} url={tab.url} onMark={handleMark} onEdit={handleTabEdit} />
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
        <div className="window-item w-full" id={`window-${id}`}>
            <div className="flex justify-between items-center w-full border-b border-black pb-2">
                <h3 className="text-lg">
                    {`Window ${id}`}
                </h3>
                <div className={`tab-settings`}>
                    <GenericIconButton icon="grid" size={24} fill="#000" onClick={handleChangeViewMode} />
                    {disableEdit === false && <GenericIconButton icon="trash" size={24} fill="#000" onClick={handleDeleteWindow} />}
                    <GenericIconButton icon={expanded === true ? "collapse" : "expand"} size={30} fill="#000" onClick={handleExpand} />
                </div>
            </div>
            <div className={`tabs-list mt-6 ${expanded === true ? "block" : "hidden"}`}>
                <div className={`${viewMode === "list" ? "mx-auto" : "grid grid-cols-3 gap-x-4 gap-y-0"}`}>
                {tabs.length > 0 ? [...evaluateNewTabRender()] : [renderEditTab(id)]}
                </div>
                <div className="mt-10 flex justify-end">
                    {tabs.length > 0 && disableEdit === false && <GreyBorderButton text="Delete" onClick={handleDeleteTabs} />}
                    {disableEdit === false && <PrimaryButton text="New tab" onClick={handleAddNewTab} />}
                </div>
            </div>
            
        </div>
    ); 
}

export default WindowItem;