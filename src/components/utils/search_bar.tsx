import { iFolder } from "../../interfaces/folder";
import { useState, useEffect, useRef } from "react";
import SearchIcon from "../../images/icons/search_icon";
import { useSelector } from 'react-redux';
import TabItem from "../tab_item";

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
        currentSessionSettings.windows.forEach((window: chrome.windows.Window) => {
            collection = collection.concat(window.tabs!);
        });

        const result: Array<chrome.tabs.Tab> = collection.filter((tab: chrome.tabs.Tab) => tab.title && tab.title.toLowerCase().includes(searchTerm.toLowerCase()));
        return result.slice(0,5);
    }


    function filterHistory(): Array<chrome.history.HistoryItem> {
        const result =  historySettings.tabs.filter((tab: chrome.history.HistoryItem) => tab.title!.toLowerCase().includes(searchTerm.toLowerCase()));
        return result.slice(0,5);
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
        
        console.log("TARGET", e.target);
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

    function handleCloseTab(tabId: number){
        chrome.tabs.remove(tabId);
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
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                    Currently opened
                                </h3>
                                {filterCurrentTabs().map((tab) => <TabItem marked={false} id={tab.id!} label={tab.title!} url={tab.url!} disableEdit={true} disableMark={true} disableCloseButton={false} onClose={() => handleCloseTab(tab.id!)} />)}
                            </div>
                            <div className="">
                                <h3 className="uppercase font-bold text-md mb-4 text-tbfColor-darkergrey">
                                    History
                                </h3>
                                {filterHistory().map((tab) => <TabItem marked={false} id={parseInt(tab.id)} label={tab.title!} url={tab.url!} disableEdit={true} disableMark={true} disableCloseButton={true} onClose={() => {}} />)}
                            </div>
                        </div>: <p className="text-center">Enter a search term...</p>}
                    </div>
                </div> 
            </div>
            
        </>
    ); 
}

export default SearchBar;