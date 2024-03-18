import { useState, useEffect, useRef } from "react";
import SearchIcon from "../../images/icons/search_icon";
import { useSelector } from 'react-redux';
import TabItem from "../tab_item";
import styles from "../../styles/global_utils.module.scss";
import Folder from "../../components/folder";
import { iFolder } from '../../interfaces/folder';
import { iWindowItem } from '../../interfaces/window_item';

/*
    Search bar placed at the top of the viewport

    Filters current and history tabs by input string
    
    Upcoming features:
    - Filter folders (not prioritized, might be redundant)
    - Filter by tags
    - Sort search results (e.g. asc, desc, etc)
*/

function AdvancedSearchBar(props: any): JSX.Element {
    const [showResultsContainer, setShowResultsContainer] = useState<boolean>(false);
    const [slideDown, setSlideDown] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [windowsPayload, setWindowsPayload] = useState<Array<iWindowItem> | null>(null);
    const [folderLaunchType, setFolderLaunchType] = useState<string | null>(null); 
    const [showPerformanceWarning, setShowPerformanceWarning] = useState<boolean>(false);
    const [totalTabsCount, setTotalTabsCount] = useState<number>(0);
    
    
    const searchResultsContainerRef = useRef<HTMLDivElement>(null);
    const searchFieldRef = useRef<HTMLInputElement>(null);

    const folderCollection = useSelector((state: any) => state.FolderCollectionReducer);
    const currentSessionSettings = useSelector((state: any) => state.CurrentSessionSettingsReducer);
    const historySettings = useSelector((state: any) => state.HistorySettingsReducer);

    
    // Filter currently opened tabs
    function filterCurrentTabs(): Array<chrome.tabs.Tab> {
        let collection: Array<chrome.tabs.Tab> = [];
        currentSessionSettings.windows.forEach((window: chrome.windows.Window) => {
            collection = collection.concat(window.tabs!);
        });

        const result: Array<chrome.tabs.Tab> = collection.filter((tab: chrome.tabs.Tab) => tab.title && tab.title.toLowerCase().includes(searchTerm.toLowerCase()));
        return result.slice(0,5);
    }

    // Filter previously opened tabs
    function filterHistory(): Array<chrome.history.HistoryItem> {
        const result =  historySettings.tabs.filter((tab: chrome.history.HistoryItem) => tab.title!.toLowerCase().includes(searchTerm.toLowerCase()));
        return result.slice(0,5);
    }

    function filterFolders(): Array<iFolder> {
        const result =  folderCollection.filter((folder: iFolder) => folder.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return result.slice(0,5);
    }

    useEffect(() => {
        // Listen for clicks in the viewport. Used primarily to hide the search results
        // once the user clicks outside the searchfield AND the results area
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        }
    }, []);

    useEffect(() => {
        // Listen for clicks in the viewport. Used primarily to hide the search results
        // once the user clicks outside the searchfield AND the results area
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        }
    }, [showResultsContainer]);

    // Show search results by sliding in the results area
    function handleShowResultsContainer(): void {
        if(showResultsContainer === false){
            setShowResultsContainer(true);
            
                setSlideDown(slideDown === true ? false : true);
          
        } else {
            if(searchResultsContainerRef.current){
                searchResultsContainerRef.current.classList.remove("mt-20");
                searchResultsContainerRef.current.classList.add("mt-10");
            } 
            document.body.style.overflowY = "auto";
            setSlideDown(false);
     
                setShowResultsContainer(false);
      
        }
    
    }

    // Identify clicked viewport area and hide/show search results accordingly
    function handleWindowClick(e: any): void {
        e.stopPropagation();
        //console.log("e", e.target.parentElement.parentElement);
        if(showResultsContainer === false || !e.target.parentElement || !e.target.parentElement.parentElement) return;
        
        const searchFieldId = "search-field";
        const searchResultsContainerId = "search-results-area";

        if(e.target.id.includes(searchFieldId) === false && 
        e.target.id.includes(searchResultsContainerId) === true){
            handleShowResultsContainer();
        }
    }

    // Change state of the current search term
    function handleFieldChange(e: any): void {
        setSearchTerm(e.target.value);
    }

    // Show search results area unless already shown
    function handleActivateSearch(e: any): void {
        if(slideDown === false) handleShowResultsContainer();
    }

    // Close a tab
    function handleCloseTab(tabId: number){
        chrome.tabs.remove(tabId);
    }

    // Adjust the search field features based on the slideDown state
    useEffect(() => {
        if(searchTerm.length === 0) {
            if(slideDown === false){
                searchFieldRef.current!.value = "Search tabs...";
            } else {
                searchFieldRef.current!.value = "";
            }
        }

        if(slideDown === true){
            setTimeout(() => {
                if(searchResultsContainerRef.current){
                    searchResultsContainerRef.current.classList.remove("mt-10");
                    searchResultsContainerRef.current.classList.add("mt-20");
                }
            }, 50);
          //  document.body.style.overflowY = "hidden";
            document.body.style.overflowX = "hidden";
        }
    }, [slideDown]);

    useEffect(() => {
        
        if(!windowsPayload || !folderLaunchType) return;
        let tabsCount = 0;
        windowsPayload.forEach((window: iWindowItem) => {
            tabsCount += window.tabs.length;
        });
   
        chrome.storage.sync.get("performance_notification_value", (data) => {
            setTotalTabsCount(data.performance_notification_value);
            if(data.performance_notification_value !== -1 && data.performance_notification_value <= tabsCount) {
                setShowPerformanceWarning(true);
            } else {
                handleLaunchFolder(windowsPayload);
            }
        });
    }, [folderLaunchType]);

    function handlePrepareLaunchFolder(windows: Array<iWindowItem>, type: string): void {
        setWindowsPayload(windows);
        setFolderLaunchType(type);
    }

    function handleLaunchFolder(windows: Array<iWindowItem>): void {
        // Now, prepare a snapshot, where currently opened windows get stored
        let snapshot: Array<chrome.windows.Window> = [];

        const queryOptions: chrome.windows.QueryOptions = {
            populate: true,
            windowTypes: ["normal", "popup"]
        };

        // Store currently opened windows into the snapshot
        chrome.windows.getAll(queryOptions, (currentWindows: Array<chrome.windows.Window>) => {
            snapshot = currentWindows;
        });

        // Open all windows in this folder
        windows.forEach((window: iWindowItem, i) => {
            const windowSettings = {
                focused: i === 0 ? true : false,
                url: window.tabs.map((tab) => tab.url),
                incognito: folderLaunchType === "incognito" ? true : false
            }
            chrome.windows.create(windowSettings);
        });

        // Close current session after launching the folder. Only applies when
        // set in the Pettings page
        chrome.storage.sync.get("close_current_setting", (data) => {
            if(data.close_current_setting === true){
                snapshot.forEach((window) => {
                    if(window.id) chrome.windows.remove(window.id);
                });
            }
        });

        // Unset all relevant states to prevent interferance with other features once the folder has been launched
        setWindowsPayload(null);
        setFolderLaunchType(null);
        setShowPerformanceWarning(false);
    }

    return (
        <>
            <div className="mt-8 flex justify-center">
                <div className={`w-7/12 flex items-center relative  z-[501] text-sm h-10 ${slideDown === false ? "opacity-50 bg-gray-300" : "drop-shadow-md bg-white"} focus:opacity-90 border-tbfColor-lightergrey focus:outline-0 focus:outline-tbfColor-lighterpurple4 focus:shadow-md hover:shadow py-5 pr-5 rounded-3xl`}>
                    <div data-testid="te" className="ml-4 mr-2 z-[502]">
                        <SearchIcon fill={"#5c5c5c"} size={24} />
                    </div>
                    <input ref={searchFieldRef} data-testid="search-field" id="search-field" defaultValue="Search tabs..." onChange={handleFieldChange} onClick={handleActivateSearch} className={`py-5 h-10 ${slideDown === false ? "bg-gray-300" : "bg-white"} w-full focus:outline-0`} type="text" />
                </div>
                {slideDown === true && <div data-testid="search-results-area" id="search-results-area" className={`${styles.popup_container_transparent_bg} w-screen h-full top-0 bg-[rgba-] absolute z-500 left-0 flex justify-center`}>
                    <div ref={searchResultsContainerRef} className={`bg-white absolute p-6 ml-16 mt-10 transition-all ease-in duration-75 overflow-hidden w-7/12 z-10 rounded-lg drop-shadow-[0_3px_2px_rgba(0,0,0,0.15)]`}>
                        {searchTerm.length > 0 ? <div className="grid grid-cols-2 gap-x-[1.75rem]">   
                           {/* 
                            <div className="">
                                    <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                        Workspaces
                                    </h3>
                                    <ul className="list-none text-sm text-tbfColor-darkergrey">
                                        {filterWorkspaces().map((workspace) => <li className="my-2">{workspace}</li>)}
                                        
                                    </ul>
                                
                                </div>
                            */}
                            <div className="">
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">Folders</h3>
                                {filterFolders().map((folder) => <Folder marked={false} id={folder.id!} name={folder.name} viewMode={"list"} type={"collapsed"} desc={folder.desc} windows={folder.windows} onOpen={handlePrepareLaunchFolder} />)}
                            </div>
                            <div className="">
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                    Currently opened
                                </h3>
                                {filterCurrentTabs().map((tab) => <TabItem key={tab.id} marked={false} id={tab.id!} label={tab.title!} url={tab.url!} disableEdit={true} disableMark={true} disableCloseButton={false} onClose={() => handleCloseTab(tab.id!)} />)}
                            </div>
                            <div className="mt-4">
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                    History
                                </h3>
                                {filterHistory().map((tab) => <TabItem key={tab.id} marked={false} id={parseInt(tab.id)} label={tab.title!} url={tab.url!} disableEdit={true} disableMark={true} disableCloseButton={true} onClose={() => {}} />)}
                            </div>
                        </div>: <p className="text-center">Enter a search term...</p>}
                    </div>
                </div> }
            </div>
            
        </>
    ); 
}

export default AdvancedSearchBar;