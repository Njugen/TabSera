import "./../../styles/global_utils.module.scss";
import PrimaryButton from '../../components/utils/primary_button';
import ManageFolderPopup from '../../components/utils/manage_folder_popup';
import { useEffect, useState, useRef } from "react";
import { iFolder } from '../../interfaces/folder';
import { useDispatch, useSelector } from 'react-redux';
import { clearInEditFolder  } from '../../redux/actions/inEditFolderActions';
import randomNumber from '../../tools/random_number';
import { iWindowItem } from '../../interfaces/window_item';
import { clearMarkedFoldersAction } from '../../redux/actions/workspaceSettingsActions';
import Dropdown from '../../components/utils/dropdown';
import { clearMarkedTabsAction, setMarkMultipleTabsAction, setUpTabsAction } from '../../redux/actions/historySettingsActions';
import { iTabItem } from '../../interfaces/tab_item';
import { iFieldOption } from '../../interfaces/dropdown';
import { setCurrentTabsSortOrder, setUpWindowsAction } from '../../redux/actions/currentSessionActions';
import CurrentSessionWindowItem from '../../components/current_session_window_item';
import AddToWorkspacePopup from '../../components/utils/add_to_workspace_popup';

function CurrentSession(props: any): JSX.Element {
    const [viewMode, setViewMode] = useState<string>("grid");
    const [addToWorkSpaceMessage, setAddToWorkspaceMessage] = useState<boolean>(false);
    const [mergeProcess, setMergeProcess] = useState<iFolder | null>(null);
    const [editFolderId, setEditFolderId] = useState<number | null>(null);
    const [createFolder, setCreateFolder] = useState<boolean>(false);

    const historyListRef = useRef<HTMLDivElement>(null);
    const folderCollection: Array<iFolder> = useSelector((state: any) => state.FolderCollectionReducer);

    const dispatch = useDispatch();
    const currentSessionData = useSelector((state: any) => state.CurrentSessionSettingsReducer);

    /*
    function loadMoreTabs(): void {
        dispatch(...);
    }

    useEffect(() => {
        historyListRef.current?.addEventListener("scroll", loadMoreTabs);
        return () => historyListRef.current?.removeEventListener("historyListRef", loadMoreTabs);
      }, []);*/
    

    function handleChangeViewMode(): void {
        setViewMode(viewMode === "list" ? "grid" : "list");
    }



    function handleUnMarkAll(): void {
        
        dispatch(setMarkMultipleTabsAction([]));
    }

    function handleDeleteFromHistory(): void {
   
        let updatedMarks = currentSessionData.tabs;

        currentSessionData.markedTabs.forEach((tab: chrome.history.HistoryItem) => {
            chrome.history.deleteUrl({ url: tab.url! });
            updatedMarks = updatedMarks.filter((target: chrome.history.HistoryItem) => target.url !== tab.url);
        });
        dispatch(setUpTabsAction(updatedMarks));
        dispatch(setMarkMultipleTabsAction([]));
    }

    function handleOpenSelected(): void {
        const markedTabs: Array<chrome.history.HistoryItem> = currentSessionData.markedTabs as Array<chrome.history.HistoryItem>;
        
        markedTabs.forEach((tab: chrome.history.HistoryItem) => {
            const properties: object = {
                active: false,
                url: tab.url
            };
            chrome.tabs.create(properties);
        })
    }
    
    function getAllWindows(): void {
        const queryOptions: chrome.windows.QueryOptions = {
            populate: true,
            windowTypes: ["normal", "popup"]
        };
        chrome.windows.getAll(queryOptions, (windows: Array<chrome.windows.Window>) => {
            dispatch(setUpWindowsAction(windows));
        });
    };

   

    useEffect(() => {
        getAllWindows();
        chrome.windows.onCreated.addListener(() => {
            getAllWindows();
        });
    
        chrome.windows.onRemoved.addListener(() => {
            getAllWindows();
        });

        chrome.tabs.onCreated.addListener(() => {
            getAllWindows();
        });

        chrome.tabs.onRemoved.addListener(() => {
            getAllWindows();
        });

        chrome.tabs.onDetached.addListener(() => {
            getAllWindows();
        });

        chrome.tabs.onMoved.addListener(() => {
            getAllWindows();
        });

        chrome.tabs.onReplaced.addListener(() => {
            getAllWindows();
        });

        chrome.tabs.onUpdated.addListener(() => {
            getAllWindows();
        });
    }, []);

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



    function handlePopupClose(): void {

        setEditFolderId(null);
        setCreateFolder(false);
        setMergeProcess(null);

        dispatch(clearMarkedTabsAction());
        dispatch(clearMarkedFoldersAction());
        dispatch(clearInEditFolder());
    }

    function renderEmptyMessage(): JSX.Element {
        return (
            <div className={"flex justify-center items-center"}>
                <p> Your browing history is empty.</p>
            </div>
        );
    }

    function renderSortingDropdown(): JSX.Element {
        const optionsList: Array<iFieldOption> = [
            {id: 0, label: "Ascending title"},
            {id: 1, label: "Descending title"},
        ];

        return <Dropdown tag="sort-folders" preset={{id: 0, label: "Ascending"}} options={optionsList} onCallback={handleSort} />

    }

    function handleSort(e: any): void{
        //  dispatch(setFoldersSortOrder(e.selected === 0 ? "asc" : "desc"));
        let option = "asc";

        if(e.selected === 0){
            option = "asc";
        } else if(e.selected === 1){
            option = "desc";
        }
        dispatch(setCurrentTabsSortOrder(option));
    }

    function renderOptionsMenu(): JSX.Element {
        const markedTabs = [] ;
        return <>
        
            <div className="mr-4 inline-flex items-center justify-between w-full">
                
                <div className="flex w-5/12">
                    {/*<TextIconButton disabled={false} icon={"selected_checkbox"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Mark all tabs" onClick={() => {}} />
                    <TextIconButton disabled={false} icon={"deselected_checkbox"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Unmark all tabs" onClick={() => {}} />
                    <TextIconButton disabled={markedTabs.length > 0 ? false : true} icon={"trash"} size={{ icon: 20, text: "text-sm" }}  fill={markedTabs.length > 0 ? "#6D00C2" : "#9f9f9f"} text="Close tabs" onClick={handleDeleteFromHistory} />
                    */}
                </div>
                <div className="flex items-center justify-end w-8/12">
                    
                    {/*<TextIconButton disabled={false} icon={viewMode === "list" ? "grid" : "list"} size={{ icon: 20, text: "text-sm" }} fill="#6D00C2" text={viewMode === "list" ? "Grid" : "List"} onClick={handleChangeViewMode} />
                    <div className="relative w-4/12 mr-4 flex items-center">
                    
                        <div className="mr-2">
                            <SortIcon size={24} fill="#6D00C2" />
                        </div> 
                        <div className="text-sm mr-4">Sort:</div> 
                        {
                            renderSortingDropdown()
                        }
                    </div>
                    <PrimaryButton disabled={markedTabs.length > 0 ? false : true} text="Open selected" onClick={handleOpenSelected} />*/}
                    <PrimaryButton disabled={false} text="Save this session to workspace" onClick={() => setAddToWorkspaceMessage(true)} />
                </div>
            </div>
               
            
        </>
    }

    function renderContents(): Array<JSX.Element> {
        const existingWindows = currentSessionData?.windows;
        const existingWindowsElements: Array<JSX.Element> = existingWindows?.map((item: iWindowItem) => <CurrentSessionWindowItem tabsCol={4} disableEdit={currentSessionData.windows.length < 2 ? true : false} disableTabMark={false} disableTabEdit={true} key={`existing-window-${item.id}`} id={item.id} tabs={item.tabs} initExpand={true} />);
        
        if (existingWindowsElements?.length > 0){
            return [...existingWindowsElements];
        } else {
            return [renderEmptyMessage()];
        }
    }

    function renderActionButtons(): JSX.Element {
        return <div className="flex flex-row my-6 justify-center">
            <PrimaryButton disabled={false} text="New window" onClick={() => {}} />            
        </div>
    }

    function renderAddTabsMessage(): JSX.Element {
        const currentFolders: Array<iFolder> = folderCollection;

        const options: Array<iFieldOption> = currentFolders.map((folder) => {
            return { id: folder.id, label: folder.name }
        });

        const dropdownOptions: Array<iFieldOption> = [
            {
                id: -1,
                label: "Select a workspace"
            },
            ...options
        ];

        function handleAddToNewWorkspace(): void {
            

            setAddToWorkspaceMessage(false);
            setCreateFolder(true);
        }

        function handleAddToExistingWorkspace(e: any): void {
            if(e.selected === -1) return;

            const targetFolderId = e.selected;
            const targetFolder: iFolder | undefined = folderCollection.find((folder: iFolder) => folder.id === targetFolderId);
         
            if(!targetFolder) return;
            
            /*const markedTabs: Array<iTabItem> = tabsData.markedTabs.map((tab: chrome.history.HistoryItem) => {
                return {
                    id: tab.id,
                    label: tab.title,
                    url: tab.url,
                    disableEdit: false,
                    disableMark: false,
                }
            });

            const presetWindow: iWindowItem = {
                id: randomNumber(),
                tabs: markedTabs
            };*/
            if(currentSessionData.windows){
                const newWindowItems: Array<iWindowItem> = currentSessionData.windows.map((window: chrome.windows.Window) => {
                    if(window.tabs){
                        const tabs: Array<iTabItem> = window.tabs.map((tab: chrome.tabs.Tab) => {
                            return {
                                id: tab.id || randomNumber(),
                                label: tab.title || "",
                                url: tab.url || "",
                                marked: false,
                                disableEdit: false,
                                disableMark: false,
                            }
                        })

                        return {
                            id: randomNumber(),
                            tabs: tabs
                        }
                    }
                })

                const updatedFolder: iFolder = {...targetFolder};
                updatedFolder.windows = [...updatedFolder.windows,  ...newWindowItems];

                if(targetFolder){
                    setAddToWorkspaceMessage(false);
                    setMergeProcess(updatedFolder);
                }
            }
            
        }

        return (
            <AddToWorkspacePopup 
                title="Choose where to save the current session"
                dropdownOptions={dropdownOptions}
                onNewWorkspace={handleAddToNewWorkspace}
                onExistingWorkspace={handleAddToExistingWorkspace}
                onCancel={() => setAddToWorkspaceMessage(false)}
            />
        );
    }
    
    function renderPopup(): JSX.Element {
        let render;
        if(createFolder === true){
            


            /*const presetWindows: iWindowItem = {
                id: randomNumber(),
                tabs: markedTabs
            };*/
            
            const presetWindows: Array<iWindowItem> = currentSessionData.windows.map((window: chrome.windows.Window) => {
                if(window.tabs){
                    const tabs: Array<iTabItem> = window.tabs.map((tab: chrome.tabs.Tab) => {
                        return {
                            id: tab.id || randomNumber(),
                            label: tab.title || "",
                            url: tab.url || "",
                            marked: false,
                            disableEdit: false,
                            disableMark: false,
                        }
                    })

                    return {
                        id: randomNumber(),
                        tabs: tabs
                    }
                }
            })

            const payload: iFolder = {
                id: randomNumber(),
                name: "",
                desc: "",
                type: "expanded",
                viewMode: "grid",
                marked: false,
                windows: [...presetWindows],
            }
            render = <ManageFolderPopup title="Create workspace" folder={payload} onClose={handlePopupClose} />;
        } else if(mergeProcess !== null) {

            render = <ManageFolderPopup title={`Merge tabs to ${mergeProcess.name}`} folder={mergeProcess} onClose={handlePopupClose} />;
        } else {
            render = <></>;
        }

        return render;
    }

    return (
        <>
            {addToWorkSpaceMessage && renderAddTabsMessage()}
            {renderPopup()}
            <div id="currentSession-view" className="mb-12 border-b border-gray-300">
                <div className={"pb-6 w-full bg-white min-h-[350px]"}>
                    <div className="w-full mb-6 px-16">
                        <h1 className="text-4xl text-tbfColor-darkpurple mb-6 font-light inline-block">
                            Currently opened windows and tabs
                        </h1>
                        <div className="w-full mb-12">
                            {renderOptionsMenu()}
                        </div>
                        
                        <div>
                            
                            {renderContents()}
                            {/*renderActionButtons()*/}
                        </div>
                    </div>
                </div>
            </div>
            
        </>  
    );

}

export default CurrentSession