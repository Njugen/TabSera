import Folder from '../../components/folder'
import "./../../styles/global_utils.module.scss";
import PrimaryButton from '../../components/utils/primary_button';
import ManageFolderPopup from '../../components/utils/manage_folder_popup';
import { useEffect, useState } from "react";

import { iFolder } from '../../interfaces/folder';
import { useDispatch, useSelector } from 'react-redux';
import { clearInEditFolder  } from '../../redux/actions/inEditFolderActions';
import {  createFolderAction, readAllFoldersFromBrowserAction } from '../../redux/actions/folderCollectionActions';
import Paragraph from '../../components/utils/paragraph';
import { deleteFolderAction } from "../../redux/actions/folderCollectionActions";
import { saveToStorage, getFromStorage } from '../../services/webex_api/storage';
import MessageBox from '../../components/utils/message_box';
import TextIconButton from '../../components/utils/text_icon_button';
import randomNumber from '../../tools/random_number';
import { iWindowItem } from '../../interfaces/window_item';
import { changeWorkspacesViewMode, clearMarkedFoldersAction, setFoldersSortOrder, setMarkedFoldersAction, setMarkMultipleFoldersAction } from '../../redux/actions/workspaceSettingsActions';
import Dropdown from '../../components/utils/dropdown';
import SortIcon from '../../images/icons/sort_icon';

/*
    Workspace management section listing all available folders/workspaces.
*/

function Workspaces(props: any): JSX.Element {
    const [editFolderId, setEditFolderId] = useState<number | null>(null);
    const [createFolder, setCreateFolder] = useState<boolean>(false);
    const [removalTarget, setRemovalTarget] = useState<iFolder | null>(null);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);
    const [showDuplicationWarning, setShowDuplicationWarning] = useState<boolean>(false);
    const [mergeProcess, setMergeProcess] = useState<iFolder | null>(null);
    const [showPerformanceWarning, setShowPerformanceWarning] = useState<boolean>(false);
    const [totalTabsCount, setTotalTabsCount] = useState<number>(0);
    const [windowsPayload, setWindowsPayload] = useState<Array<iWindowItem> | null>(null);
    const [folderLaunchType, setFolderLaunchType] = useState<string | null>(null); 

    const dispatch = useDispatch();

    const folderCollection = useSelector((state: any) => state.FolderCollectionReducer);
    const workspaceSettings = useSelector((state: any) => state.WorkspaceSettingsReducer);

    // Save/update the folder collection to browser memory once the redux collection has changes
    useEffect(() => {        
        if(folderCollection.length > 0){
            saveToStorage("local", "folders", folderCollection);
        } 
    }, [folderCollection]);

    // Get folders from browser stirage and store it into redux 
    useEffect(() => {
        getFromStorage("local", "folders", (data) => {  
            dispatch(readAllFoldersFromBrowserAction(data.folders));
        })
    }, []);

    // Delete one or more marked folders
    function handleDeleteFolders(): void {
        const { markedFoldersId } = workspaceSettings;
        if(folderCollection && markedFoldersId){
            markedFoldersId.forEach((targetId: number) => {
                const markedFolderIndex = folderCollection.findIndex((folder: iFolder) => targetId === folder.id);

                if(markedFolderIndex > -1){
                    dispatch(deleteFolderAction(folderCollection[markedFolderIndex].id));
                    
                }
            });
            setShowDeleteWarning(false);
            dispatch(clearMarkedFoldersAction());
        }
    }

    // Duplicate one of more marked folders
    function handleDuplicateFolders(): void {
        const { markedFoldersId } = workspaceSettings;

        if(folderCollection && markedFoldersId){
            markedFoldersId.forEach((targetId: number) => {
                const markedFolderIndex = folderCollection.findIndex((folder: iFolder) => targetId === folder.id);

                if(markedFolderIndex > -1){
                    const newFolder: iFolder = {...folderCollection[markedFolderIndex]};

                    newFolder.id = randomNumber();
                    newFolder.windows.forEach((window) => {
                        window.id = randomNumber();
                        window.tabs.forEach((tab) => tab.id = randomNumber());
                    });
                    newFolder.name = newFolder.name + " (duplicate)";

                    dispatch(createFolderAction({...newFolder}));
                }
            });
            setShowDuplicationWarning(false);
            dispatch(clearMarkedFoldersAction());
        }
    }

    // Open a specific folder
    function renderFolderManagerPopup(): JSX.Element {
        let render;

        if(createFolder === true){
            render = <ManageFolderPopup title="Create workspace" onClose={handleCloseFolderManager} />;
        } else {

            if(mergeProcess !== null){
                return <ManageFolderPopup title={`Create folder by merge`} folder={mergeProcess} onClose={handleCloseFolderManager} />
            } else {
                const targetFolder: Array<iFolder> = folderCollection.filter((item: iFolder) => editFolderId === item.id);
                const input: iFolder = {...targetFolder[0]};

                if(targetFolder.length > 0){
                    render = <ManageFolderPopup title={`Edit folder ${targetFolder[0].id}`} folder={input} onClose={handleCloseFolderManager} />;
                } else {
                    render = <></>;
                }
            }
            
        }

        return render;
    }

    // Mark a specific folder
    function handleMarkFolder(id: number): void{
        dispatch(setMarkedFoldersAction(id));
    }

    // Merge selected folders
    function handleMergeFolders(): void {
        const newId = randomNumber();
        const { markedFoldersId } = workspaceSettings;

        const payload: iFolder = {
            id: newId,
            name: "",
            desc: "",
            type: "expanded",
            viewMode: "grid",
            marked: false,
            windows: [],
        }

        if(folderCollection && markedFoldersId){
            const mergedWindows: Array<iWindowItem> = [];
            markedFoldersId.forEach((targetId: number) => {
                const markedFolderIndex = folderCollection.findIndex((folder: iFolder) => targetId === folder.id);

                if(markedFolderIndex > -1){
                    mergedWindows.push(...folderCollection[markedFolderIndex].windows);
                }
            });
            payload.windows = [...mergedWindows];
            setMergeProcess({...payload});
       
        }
    }

    // Close the folder manager
    function handleCloseFolderManager(): void {
        setEditFolderId(null);
        setCreateFolder(false);
        setMergeProcess(null);

        dispatch(clearMarkedFoldersAction());
        dispatch(clearInEditFolder());
    }

    // Unmark all listed folders
    function handleUnmarkAllFolders(): void {
        dispatch(setMarkMultipleFoldersAction([]));
    }

    // Mark all listed folders
    function handleMarkAllFolders(): void {
            const updatedMarks: Array<number> = [];

            folderCollection.forEach((folder: iFolder) => {
                updatedMarks.push(folder.id);
                
            });

            dispatch(setMarkMultipleFoldersAction([...updatedMarks]));
        
    }

    // Toggle between grid and list view
    function handleChangeViewMode(): void {
        const { viewMode } = workspaceSettings;
        
        dispatch(changeWorkspacesViewMode(viewMode === "list" ? "grid" : "list"));
    }

    // Sort all folders
    function handleSortFolders(e: any): void{
        dispatch(setFoldersSortOrder(e.selected === 0 ? "asc" : "desc"));
    }

    // Render the folder list
    function renderFolders(): Array<JSX.Element> {
        let result: Array<JSX.Element> = [];

        function condition(a: iFolder, b: iFolder) {
            const { folderSort } = workspaceSettings
            
            const aNameLowerCase = a.name.toLowerCase();
            const bNameToLowerCase = b.name.toLowerCase();

            return folderSort === "asc" ? (aNameLowerCase > bNameToLowerCase) : (bNameToLowerCase > aNameLowerCase);
        }

        const sortedFolders = [...folderCollection].sort((a: any, b: any) => condition(a, b) ? 1 : -1);

        function handleFolderDelete(target: iFolder): void {
            chrome.storage.sync.get("removal_warning_setting", (data) => {
                if(data.removal_warning_setting === true) {
                    setRemovalTarget(target);
                } else {
                    dispatch(deleteFolderAction(target.id)); 
                    setRemovalTarget(null);
                }
            });
            
        }

        result = sortedFolders.map((folder: iFolder, i: number) => {
            const collection: Array<number> = workspaceSettings.markedFoldersId;
            return <Folder onDelete={(e) => handleFolderDelete(folder)} marked={collection.find((id) => folder.id === id) ? true : false} onMark={handleMarkFolder} onEdit={() => setEditFolderId(folder.id)} key={folder.id} type={folder.type} id={folder.id} viewMode={folder.viewMode} name={folder.name} desc={folder.desc} windows={folder.windows} onOpen={handlePrepareLaunchFolder}/>
        });

        return result.length > 0 ? result : [<></>];
    }

    // Render the action buttons for workspace area
    function renderOptionsMenu(): JSX.Element {
        const { markedFoldersId } = workspaceSettings;
        return <>
            <div className="mr-4 inline-flex items-center justify-between w-full">
                <div className="flex w-7/12">
                    <TextIconButton disabled={false} icon={"selected_checkbox"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Mark all" onClick={handleMarkAllFolders} />
                    <TextIconButton disabled={false} icon={"deselected_checkbox"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Unmark all" onClick={handleUnmarkAllFolders} />
                    <TextIconButton disabled={markedFoldersId.length > 0 ? false : true} icon={"folder_duplicate"} size={{ icon: 20, text: "text-sm" }}  fill={markedFoldersId.length > 0 ? "#6D00C2" : "#9f9f9f"} text="Duplicate" onClick={handlePrepareDuplication} />
                    <TextIconButton disabled={markedFoldersId.length >= 2 ? false : true} icon={"merge"} size={{ icon: 20, text: "text-sm" }}  fill={markedFoldersId.length >= 2 ? "#6D00C2" : "#9f9f9f"} text="Merge" onClick={handleMergeFolders} />
                    <TextIconButton disabled={markedFoldersId.length > 0 ? false : true} icon={"trash"} size={{ icon: 20, text: "text-sm" }}  fill={markedFoldersId.length > 0 ? "#6D00C2" : "#9f9f9f"} text="Delete" onClick={handlePrepareMultipleRemovals} />
                </div>
                <div className="flex items-center justify-end w-5/12">
                    
                    <TextIconButton disabled={false} icon={workspaceSettings.viewMode === "list" ? "grid" : "list"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text={workspaceSettings.viewMode === "list" ? "Grid" : "List"} onClick={handleChangeViewMode} />
                    <div className="relative w-5/12 mr-4 flex items-center">
                    
                        <div className="mr-2">
                            <SortIcon size={24} fill="#6D00C2" />
                        </div> 
                        <div className="text-sm mr-4">Sort:</div> 
                        <Dropdown tag="sort-folders" preset={{id: 0, label: "Ascending"}} options={[{id: 0, label: "Ascending"}, {id: 1, label: "Descending"}]} onCallback={handleSortFolders} />
                    </div>
                    <PrimaryButton disabled={false} text="Create workspace" onClick={() => setCreateFolder(true)} />
                </div>
            </div>
        </>
    }

    // Render a message. Primarily used when no folders are available
    function renderMessageBox(): JSX.Element {
        return <>
            <div className="flex flex-col items-center justify-center h-full">
                <Paragraph text="You currently have no folders available. Please, create a new folder" />
                <div className="mt-8">
                    <PrimaryButton disabled={false} text="Create workspace" onClick={() => setCreateFolder(true)} />
                </div>
            </div>
        </>
    }

    // Check whether or not there are folders stored in redux
    function hasFolders(): boolean {
        if(folderCollection && folderCollection.length > 0){
            return true;
        }
        return false;
    }
    
    // Prepare to remove multiple folders. Warn the user if set in Settings page
    function handlePrepareMultipleRemovals(): void {
        const { markedFoldersId } = workspaceSettings;
        
        if(markedFoldersId.length > 0) {
            chrome.storage.sync.get("removal_warning_setting", (data) => {
                if(data.removal_warning_setting === true) {
                    setShowDeleteWarning(true);
                } else {
                    handleDeleteFolders();
                }
            });
        }
    }

    // Prepare to duplicate multiple folders. Warn the user if set in Settings page
    function handlePrepareDuplication(): void {
        const { markedFoldersId } = workspaceSettings;
        
        if(markedFoldersId.length > 0) {
            chrome.storage.sync.get("duplication_warning_value", (data) => {
                if(data.duplication_warning_value !== -1 && data.duplication_warning_value <= workspaceSettings.markedFoldersId.length) {
                    setShowDuplicationWarning(true);
                } else {
                    handleDuplicateFolders();
                }
            });
            
        }
    }

    // Prepare to launch a folder: Once folderLaunchType changes, then open all windows and tabs in the specific folder
    // Warn the user if the number of tabs exceeeds the amount set in Settings page.
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

    // Prepare to launch a folder by setting windows to be launched, and how to launch the windows/tabs in it.
    function handlePrepareLaunchFolder(windows: Array<iWindowItem>, type: string): void {
        setWindowsPayload(windows);
        setFolderLaunchType(type);
    }

    // Close the performance warning if opened.
    useEffect(() => {
        if(showPerformanceWarning === false) setWindowsPayload(null);
    }, [showPerformanceWarning]);

    // Launch folder
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
            {showPerformanceWarning &&
                <MessageBox 
                    title="Warning" 
                    text={`You are about to open ${totalTabsCount} or more tabs at once. Opening this many may slow down your browser. Do you want to proceed?`}
                    primaryButton={{ text: "Yes, open selected folders", callback: () => { windowsPayload && handleLaunchFolder(windowsPayload); setShowPerformanceWarning(false)}}}
                    secondaryButton={{ text: "No, do not open", callback: () => { setShowPerformanceWarning(false); setWindowsPayload(null);
                        setFolderLaunchType(null); setShowPerformanceWarning(false);}}}    
                />
            }

            {showDuplicationWarning &&
                
                <MessageBox 
                    title="Warning" 
                    text={`You are about to duplicate ${workspaceSettings.markedFoldersId.length} or more folders at once. Unnecessary duplications may clutter your dashboard, do you want to proceed?`}
                    primaryButton={{ text: "Yes, proceed", callback: () => { handleDuplicateFolders(); setShowDuplicationWarning(false)}}}
                    secondaryButton={{ text: "No, do not duplicate", callback: () => setShowDuplicationWarning(false)}}    
                />
            }
            {removalTarget &&
                
                <MessageBox 
                    title="Warning" 
                    text={`You are about to remove the "${removalTarget.name}" workspace and all its contents. This is irreversible, do you want to proceed?`}
                    primaryButton={{ text: "Yes, remove this folder", callback: () => { dispatch(deleteFolderAction(removalTarget.id)); setRemovalTarget(null)}}}
                    secondaryButton={{ text: "No, don't remove", callback: () => setRemovalTarget(null)}}    
                />
            }
            {showDeleteWarning === true && 
                <MessageBox 
                    title="Warning" 
                    text={`You are about to remove one or more workspaces and all their contents. This is irreversible, do you want to proceed?`}
                    primaryButton={{ text: "Yes, remove these folders", callback: () => handleDeleteFolders()}}
                    secondaryButton={{ text: "No, don't remove", callback: () => setShowDeleteWarning(false)}}    
                />
            }
            {renderFolderManagerPopup()}
            <div id="workspace-section" className="mb-12 border-b border-gray-300">
                <div className="flex justify-between min-h-[350px]">
                    <div className="w-full mb-6 px-16 pb-4">
                        <h1 className="text-4xl text-tbfColor-darkpurple mb-6 font-light inline-block">
                            Workspaces
                        </h1>
                        {!hasFolders() && renderMessageBox()}
                        {hasFolders() === true && <div className="">
                            {hasFolders() && renderOptionsMenu()}
                            {<div className={`${workspaceSettings.viewMode === "list" ? "mx-auto mt-10" : `grid xl:grid-cols-2 2xl:grid-cols-3  grid-flow-dense gap-x-4 gap-y-0 mt-8`}`}>
                                {renderFolders()}
                            </div>}
                            
                        </div>}
                    </div>
                
                </div>
            </div>
        </>  
    );

}

export default Workspaces