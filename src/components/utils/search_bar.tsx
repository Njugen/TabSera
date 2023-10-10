import styles from "./../../styles/global_utils.module.scss";
import { iFolderIconButton } from "../../interfaces/folder_icon_button";
import { iFolder } from "../../interfaces/folder";
import OpenBrowserIcon from "../../images/icons/open_browser_icon";
import SettingsIcon from "../../images/icons/settings_icon";
import TrashIcon from "../../images/icons/trash_icon";
import ExpandIcon from "../../images/icons/expand_icon";
import CollapseIcon from "../../images/icons/collapse_icon";
import { useState, useEffect, useRef } from "react";
import SearchIcon from "../../images/icons/search_icon";
import { useDispatch, useSelector } from 'react-redux';
import CurrentSession from './../../views/folders/currentSession';
import { CurrentSessionSettingsReducer } from "../../redux/reducers/currentSessionReducer";
import { HistorySettingsReducer } from "../../redux/reducers/historySettingsReducer";

function SearchBar(props: any): JSX.Element {
    const [showResultsContainer, setShowResultsContainer] = useState<boolean>(false);
    const [slideDown, setSlideDown] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
  //  const [filteredWorkspaces, setFilteredWorkspaces] = useState<Array<any>>([]);

    const searchFieldRef = useRef<HTMLInputElement>(null);
    const folderCollection = useSelector((state: any) => state.FolderCollectionReducer);
    const currentSessionSettings = useSelector((state: any) => state.CurrentSessionSettingsReducer);
    const historySettings = useSelector((state: any) => state.HistorySettingsReducer);

    function filterWorkspaces(): Array<string> {
        const folders = folderCollection.filter((folder: iFolder) => folder.name.toLowerCase().includes(searchTerm.toLowerCase()));
        return folders.map((folder: iFolder) => folder.name);
    }

    function filterCurrentTabs(): Array<chrome.tabs.Tab> {
        let collection: Array<chrome.tabs.Tab> = [];
         currentSessionSettings.windows.forEach((window: chrome.windows.Window) => collection = collection.concat(window.tabs!));
        console.log("BLABLABLA", collection);

        const result: Array<chrome.tabs.Tab> = collection.filter((tab: chrome.tabs.Tab) => tab.title && tab.title.toLowerCase().includes(searchTerm.toLowerCase()));
        return result;
    }


    function filterHistory(): Array<chrome.history.HistoryItem> {
        const result =  historySettings.tabs.filter((tab: chrome.history.HistoryItem) => tab.title!.toLowerCase().includes(searchTerm.toLowerCase()));
        return result;
    }

    useEffect(() => {
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("click", handleWindowClick);

        return () => {
            window.removeEventListener("click", handleWindowClick);
        }
    }, [showResultsContainer]);

    function handleShowResultsContainer(): void {
        if(showResultsContainer === false){
            setShowResultsContainer(true);
            setTimeout(() => {
                setSlideDown(slideDown === true ? false : true);
            }, 75);
        } else {
            setSlideDown(false);
            setTimeout(() => {
                setShowResultsContainer(false);
            }, 75);
        }
    
    }

    useEffect(() => {
        
        if(searchTerm.length === 0) {
            if(slideDown === false){
                searchFieldRef.current!.value = "Search tabs...";
            } else {
                searchFieldRef.current!.value = "";
            }
        }
    }, [slideDown]);

    function handleWindowClick(e: any): void {
        e.stopPropagation();
        if(showResultsContainer === false || !e.target.parentElement || ! e.target.parentElement.parentElement) return;
        
        const searchFieldId = "search-field";
        const searchResultsContainerId = "search-results-area";
        

        const firstParent = e.target.parentElement!.id;
        const secondParent = e.target.parentElement.parentElement.id
        if(e.target.id.includes(searchFieldId) === false && 
        e.target.id.includes(searchResultsContainerId) === false &&
        firstParent.includes(searchFieldId) === false && 
        firstParent.includes(searchResultsContainerId) === false &&
        secondParent.includes(searchResultsContainerId) === false){
            handleShowResultsContainer();
        }

    }

    function handleFieldChange(e: any): void {
        setSearchTerm(e.target.value);
    }

    function handleActivateSearch(e: any): void {
        if(slideDown === false) handleShowResultsContainer();
        
    }

    return (
        <>
            <div className="p-3 h-16 top-0 z-50 sticky flex justify-center bg-tbfColor-lighterpurple drop-shadow-md">
                <div className={`w-7/12 flex items-center relative bg-white z-[501] text-sm h-10 ${slideDown === false ? "opacity-50" : "drop-shadow-md"} focus:opacity-90 border-tbfColor-lightergrey focus:outline-0 focus:outline-tbfColor-lighterpurple4 focus:shadow-md hover:shadow py-5 pr-5 rounded-3xl`}>
                    <div className="ml-4 mr-2 z-[502]">
                        <SearchIcon fill={"#5c5c5c"} size={24} />
                    </div>
                    <input ref={searchFieldRef} id="search-field" defaultValue="Search tabs..." onChange={handleFieldChange} onClick={handleActivateSearch} className={`py-5 h-10 bg-white w-full focus:outline-0`} type="text" />
                </div>
                <div id="search-results-area" className={`w-7/12 absolute z-500 ${slideDown === true ? "flex justify-center" : "hidden"}`}>
                    <div className="bg-white p-6 mt-16 max-h-96 overflow-hidden w-full z-10 rounded-lg drop-shadow-[0_3px_2px_rgba(0,0,0,0.15)]">
                        <div className="grid grid-cols-3 gap-x-4">   
                            <div className="">
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                    Workspaces
                                </h3>
                                <ul className="list-none text-sm text-tbfColor-darkergrey">
                                    {filterWorkspaces().map((workspace) => <li className="my-2">{workspace}</li>)}
                                    
                                </ul>
                            </div>
                            <div className="">
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                    Currently opened
                                </h3>
                                <ul className="list-none text-sm text-tbfColor-darkergrey">
                                    {filterCurrentTabs().map((tab) => <li className="my-2">{tab.title}</li>)}
                                </ul>
                            </div>
                            <div className="">
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                    History
                                </h3>
                                <ul className="list-none text-sm text-tbfColor-darkergrey">
                                    {filterHistory().map((tab) => <li className="my-2">{tab.title}</li>)}
                                </ul>
                            </div>
                        </div> 
                    </div>
                </div> 
            </div>
            
        </>
    ); 
}

export default SearchBar;