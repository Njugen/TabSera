import Folder from '../../components/folder'
import "./../../styles/global_utils.module.scss";
import PrimaryButton from '../../components/utils/primary_button';
import ManageFolderPopup from '../../components/utils/manage_folder_popup';
import { useEffect, useState } from "react";

import GenericIconButton from '../../components/utils/generic_icon_button';
import * as predef from "../../styles/predef";
import { iFolder } from '../../interfaces/folder';
import { useDispatch, useSelector } from 'react-redux';
import { clearInEditFolder  } from '../../redux/actions/inEditFolderActions';
import {  createFolderAction, readAllFoldersFromBrowserAction } from '../../redux/actions/folderCollectionActions';
import Paragraph from '../../components/utils/paragraph';
import { deleteFolderAction } from "../../redux/actions/folderCollectionActions";
import { saveToStorage, getFromStorage } from '../../services/webex_api/storage';
import MessageBox from '../../components/utils/message_box';
import GreyBorderButton from '../../components/utils/grey_border_button';
import TextIconButton from '../../components/utils/text_icon_button';
import randomNumber from '../../tools/random_number';
import { iWindowItem } from '../../interfaces/window_item';
import { clearMarkedFoldersAction, setFoldersSortOrder, setMarkedFoldersAction, setMarkMultipleFoldersAction } from '../../redux/actions/workspaceSettingsActions';
import Dropdown from '../../components/utils/dropdown';
import GridIcon from '../../images/icons/grid_icon';
import SortIcon from '../../images/icons/sort_icon';
import TabItem from '../../components/tab_item';
import WindowItem from '../../components/window_item';
import { setTabsSortOrder, setUpTabsAction } from '../../redux/actions/historySettingsActions';
import { iTabItem } from '../../interfaces/tab_item';
import { iFieldOption } from '../../interfaces/dropdown';

function History(props: any): JSX.Element {
    const [viewMode, setViewMode] = useState<string>("grid");
    const [historyList, setHistoryList] = useState<Array<chrome.history.HistoryItem>>([]);

    const dispatch = useDispatch();
    const tabsData = useSelector((state: any) => state.HistorySettingsReducer);

    function handleChangeViewMode(): void {
        setViewMode(viewMode === "list" ? "grid" : "list");
    }

    function handleSort(e: any): void{
      //  dispatch(setFoldersSortOrder(e.selected === 0 ? "asc" : "desc"));
        let option = "asc";

        if(e.selected === 0){
            option = "asc";
        } else if(e.selected === 1){
            option = "desc";
        } else if(e.selected === 2){
            option = "lv";
        } else if(e.selected === 3){
            option = "mv";
        }
        
        dispatch(setTabsSortOrder(option));
    }

    function renderSortingDropdown(): JSX.Element {
        const optionsList: Array<iFieldOption> = [
            {id: 0, label: "Ascending title"},
            {id: 1, label: "Descending title"},
            {id: 2, label: "Last visited"},
            {id: 3, label: "Most visited"}
        ];

        return <Dropdown tag="sort-folders" preset={{id: 0, label: "Ascending"}} options={optionsList} onCallback={handleSort} />

    }

    function renderOptionsMenu(): JSX.Element {
        return <>
        
            <div className="mr-4 inline-flex items-center justify-between w-full">
                
                <div className="flex w-5/12">
                    <TextIconButton icon={"selected_checkbox"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Mark all" onClick={() => {}} />
                    <TextIconButton icon={"deselected_checkbox"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Unmark all" onClick={() => {}} />
                    <TextIconButton icon={"trash"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Delete from history" onClick={() => {}} />
                </div>
                <div className="flex items-center justify-end w-8/12">
                    
                    <TextIconButton icon={viewMode === "list" ? "grid" : "list"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text={viewMode === "list" ? "Grid" : "List"} onClick={handleChangeViewMode} />
                    <div className="relative w-4/12 mr-4 flex items-center">
                    
                        <div className="mr-2">
                            <SortIcon size={24} fill="#6D00C2" />
                        </div> 
                        <div className="text-sm mr-4">Sort:</div> 
                        {
                            renderSortingDropdown()
                        }
                    </div>
                    <PrimaryButton text="Open selected" onClick={() => {}} />
                    <PrimaryButton text="Add to workspace" onClick={() => {}} />
                </div>
            </div>
               
            
        </>
    }

    useEffect(() => {
        const query = {
            text: "",
            maxResults: 10
        }

        chrome.history.search(query, (items: Array<chrome.history.HistoryItem>) => {
            //console.log("RESULT", result);
            console.log("ABC");
            
            dispatch(setUpTabsAction(items));
        });
    }, []);

    function renderTabs(): Array<JSX.Element> {
        const { tabsSort, tabs } = tabsData;
        let sortedTabs: Array<chrome.history.HistoryItem> = tabs;
        

        function titleCondition(a: chrome.history.HistoryItem, b: chrome.history.HistoryItem) {
            a.title = a.title ? a.title : "";
            b.title = b.title ? b.title : "";

            const aTitleLowerCase = a.title.toLowerCase();
            const bTitleToLowerCase = b.title.toLowerCase();

            return tabsSort === "asc" ? (aTitleLowerCase > bTitleToLowerCase) : (bTitleToLowerCase > aTitleLowerCase);
        }

        console.log("TABS SORT", tabsSort);
        if(tabsSort === "asc" || tabsSort === "desc"){
            sortedTabs = [...tabs].sort((a: any, b: any) => titleCondition(a, b) ? 1 : -1);
        } else if(tabsSort === "lv"){
            sortedTabs = [...tabs].sort((a: any, b: any) => a.lastVisitTime - b.lastVisitTime);
        } else if(tabsSort === "mv"){
            sortedTabs = [...tabs].sort((a: any, b: any) => a.visitCount - b.visitCount);
        }

        console.log("SORTED TABS", sortedTabs);

        const result = sortedTabs.map((item: chrome.history.HistoryItem) => {
            return <TabItem id={parseInt(item.id)} label={item.title || ""} url={item.url || "https://"} disableEdit={true} />
        });

        return result; 
    };

    function decideGridCols(): number {
        const { innerWidth } = window;
        
        if(innerWidth > 1920){
            return 4;
        } else if(innerWidth > 1280){
            return 4;
        } else {
            return 3;
        }
    };

    return (
        <>
            
            <div id="history-view" className="mb-12">
                <div className="mb-6 mx-auto flex justify-between">
                    <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                        History
                    </h1>
                </div>
                <div className="flex justify-between bg-white px-6 drop-shadow-md">
                    <div className="pt-6 w-full mb-6">
                        {renderOptionsMenu()}
                        <div className="w-full mt-10">
                           
                          
                            <h2 className="text-2xl text-black inline-block">
                                Single tabs
                            </h2>
                            <div className={`${viewMode === "list" ? "mx-auto mt-10" : `grid grid-cols-${decideGridCols()}  grid-flow-dense gap-x-4 gap-y-0 mt-8`}`}>
                                {renderTabs()}
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </>  
    );

}

export default History