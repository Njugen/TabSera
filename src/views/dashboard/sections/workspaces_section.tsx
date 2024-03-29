import FolderItem from '../../../components/features/folder_item/folder_item'
import "./../../../styles/global_utils.module.scss";
import PrimaryButton from '../../../components/utils/primary_button/primary_button';
import FolderManager from '../../../components/features/folder_manager/folder_manager';
import { useEffect, useState } from "react";
import { iFolderItem } from '../../../interfaces/folder_item';
import { iFieldOption } from '../../../interfaces/dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { clearInEditFolder  } from '../../../redux/actions/inEditFolderActions';
import {  createFolderAction, readAllFoldersFromBrowserAction } from '../../../redux/actions/folderCollectionActions';
import Paragraph from '../../../components/utils/paragraph';
import { deleteFolderAction } from "../../../redux/actions/folderCollectionActions";
import { saveToStorage, getFromStorage } from '../../../services/webex_api/storage';
import PopupMessage from '../../../components/utils/popup_message';
import TextIconButton from '../../../components/utils/text_icon_button';
import randomNumber from '../../../tools/random_number';
import { iWindowItem } from '../../../interfaces/window_item';
import * as workspaceSettingsActions from '../../../redux/actions/workspaceSettingsActions';
import Dropdown from '../../../components/utils/dropdown/dropdown';
import SectionContainer from '../../../components/utils/section_container';
import DeselectedCheckboxIcon from '../../../images/icons/deselected_checkbox_icon';
import SelectedCheckboxIcon from '../../../images/icons/selected_checkbox_icon';
import FolderDuplicateIcon from '../../../images/icons/folder_duplicate_icon';
import MergeIcon from '../../../images/icons/merge_icon';
import TrashIcon from '../../../images/icons/trash_icon';
import GridIcon from '../../../images/icons/grid_icon';
import ListIcon from '../../../images/icons/list_icon';

const { 
    changeWorkspacesViewMode, 
    clearMarkedFoldersAction, 
    setFoldersSortOrder, 
    setMarkedFoldersAction, 
    setMarkMultipleFoldersAction 
} = workspaceSettingsActions;

/*
    Workspace management section listing all available folders/workspaces.
*/

const WorkspacesSection = (props: any): JSX.Element => {
    const [editFolderId, setEditFolderId] = useState<number | null>(null);
    const [createFolder, setCreateFolder] = useState<boolean>(false);
    const [removalTarget, setRemovalTarget] = useState<iFolderItem | null>(null);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);
    const [showDuplicationWarning, setShowDuplicationWarning] = useState<boolean>(false);
    const [mergeProcess, setMergeProcess] = useState<iFolderItem | null>(null);
    const [showPerformanceWarning, setShowPerformanceWarning] = useState<boolean>(false);
    const [totalTabsCount, setTotalTabsCount] = useState<number>(0);
    const [windowsPayload, setWindowsPayload] = useState<Array<iWindowItem> | null>(null);
    const [folderLaunchType, setFolderLaunchType] = useState<string | null>(null); 
    const [loaded, setLoaded] = useState<boolean>(false);

    const dispatch = useDispatch();

    const folderCollection = useSelector((state: any) => state.FolderCollectionReducer);
    const workspaceSettings = useSelector((state: any) => state.WorkspaceSettingsReducer);

    const colsCount: number = window.innerWidth > 1920 ? 3 : 2;

    // Get folders from browser storage and store it into redux 
    useEffect(() => {
        getFromStorage("sync", "folders", (data) => {  
            dispatch(readAllFoldersFromBrowserAction(data.folders));
            setLoaded(true);
        })

        getFromStorage("sync", "workspace_sort", (data) => {  
            dispatch(setFoldersSortOrder(data.workspace_sort));
        })

        getFromStorage("sync", "workspace_viewmode", (data) => {  
            dispatch(changeWorkspacesViewMode(data.workspace_viewmode));
        })
    }, []);

    // Save/update the folder collection to browser memory once the redux collection has changes
    useEffect(() => {        
        if(folderCollection.length > 0){
            console.log("AAAA");
           // saveToStorage("sync", "folders", folderCollection);
        } 
    }, [folderCollection]);

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

    
    // Close the performance warning if opened.
    useEffect(() => {
        if(showPerformanceWarning === false) setWindowsPayload(null);
    }, [showPerformanceWarning]);

    // Delete one or more marked folders
    const handleDeleteFolders = (): void => {
        const { markedFoldersId } = workspaceSettings;
        if(folderCollection && markedFoldersId){
            markedFoldersId.forEach((targetId: number) => {
                const markedFolderIndex = folderCollection.findIndex((folder: iFolderItem) => targetId === folder.id);

                if(markedFolderIndex > -1){
                    dispatch(deleteFolderAction(folderCollection[markedFolderIndex].id));
                    
                }
            });
            setShowDeleteWarning(false);
            dispatch(clearMarkedFoldersAction());
        }
    }

    // Duplicate one of more marked folders
    const handleDuplicateFolders = (): void => {
        const { markedFoldersId } = workspaceSettings;

        if(folderCollection && markedFoldersId){
            markedFoldersId.forEach((targetId: number) => {
                const markedFolderIndex = folderCollection.findIndex((folder: iFolderItem) => targetId === folder.id);

                if(markedFolderIndex > -1){
                    const newFolder: iFolderItem = {...folderCollection[markedFolderIndex]};

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
    const renderFolderManagerPopup = (): JSX.Element => {
        let render;

        if(createFolder === true){
            render = <FolderManager type="slide-in" title="Create workspace" onClose={handleCloseFolderManager} />;
        } else {
            if(mergeProcess !== null){
                return <FolderManager type="slide-in" title={`Create folder by merge`} folder={mergeProcess} onClose={handleCloseFolderManager} />
            } else {
                const targetFolder: Array<iFolderItem> = folderCollection.filter((item: iFolderItem) => editFolderId === item.id);
                const input: iFolderItem = {...targetFolder[0]};

                if(targetFolder.length > 0){
                    render = <FolderManager type="slide-in" title={`Edit folder ${targetFolder[0].id}`} folder={input} onClose={handleCloseFolderManager} />;
                } else {
                    render = <></>;
                }
            }
        }

        return render;
    }

    // Mark a specific folder
    const handleMarkFolder = (id: number): void => {
        dispatch(setMarkedFoldersAction(id));
    }

    // Merge selected folders
    const handleMergeFolders = (): void => {
        const newId = randomNumber();
        const { markedFoldersId } = workspaceSettings;

        const folderSpecs: iFolderItem = {
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
                const markedFolderIndex = folderCollection.findIndex((folder: iFolderItem) => targetId === folder.id);

                if(markedFolderIndex > -1){
                    mergedWindows.push(...folderCollection[markedFolderIndex].windows);
                }
            });
            folderSpecs.windows = [...mergedWindows];
            setMergeProcess({...folderSpecs});
        }
    }

    // Close the folder manager
    const handleCloseFolderManager = (): void => {
        setEditFolderId(null);
        setCreateFolder(false);
        setMergeProcess(null);

        dispatch(clearMarkedFoldersAction());
        dispatch(clearInEditFolder());
    }

    // Unmark all listed folders
    const handleUnmarkAllFolders = (): void => {
        dispatch(setMarkMultipleFoldersAction([]));
    }

    // Mark all listed folders
    const handleMarkAllFolders = (): void => {
        const updatedMarks: Array<number> = [];

        folderCollection.forEach((folder: iFolderItem) => {
            updatedMarks.push(folder.id);
            
        });

        dispatch(setMarkMultipleFoldersAction([...updatedMarks]));        
    }

    // Toggle between grid and list view
    const handleChangeViewMode = (): void => {
        const { viewMode } = workspaceSettings;
        
        const newStatus = viewMode === "list" ? "grid" : "list"
        saveToStorage("sync", "workspace_viewmode", newStatus)
        dispatch(changeWorkspacesViewMode(newStatus));
    }

    // Sort all folders
    const handleSortFolders = (e: any): void => {
        const newStatus = e.selected;

        saveToStorage("sync", "workspace_sort", newStatus);
        dispatch(setFoldersSortOrder(newStatus));
    }

    const folderSortCondition = (a: iFolderItem, b: iFolderItem): boolean => {
        const { folderSortOptionId } = workspaceSettings
        
        const aNameLowerCase = a.name.toLowerCase();
        const bNameToLowerCase = b.name.toLowerCase();

        return folderSortOptionId === 0 ? (aNameLowerCase > bNameToLowerCase) : (bNameToLowerCase > aNameLowerCase);
    }

    const handleFolderDelete = (target: iFolderItem): void => {
        chrome.storage.sync.get("removal_warning_setting", (data) => {
            if(data.removal_warning_setting === true) {
                setRemovalTarget(target);
            } else {
                dispatch(deleteFolderAction(target.id)); 
                setRemovalTarget(null);
            }
        });
    }
    
    // Render the folder list
    const renderFolders = (): Array<JSX.Element> => {        
        const sortedFolders = [...folderCollection].sort((a: any, b: any) => folderSortCondition(a, b) ? 1 : -1);

       

        // Determine the number of columns to be rendered, based on colsCount
        let colsList: Array<Array<JSX.Element>> = [];
        
        for(let i = 0; i < colsCount; i++){
            colsList.push([]);
        }

        for(let i = 0; i < sortedFolders.length; i++){
            const folder = sortedFolders[i];
            let result: JSX.Element = <></>;
            
            const collection: Array<number> = workspaceSettings.markedFoldersId;
            result = (
                <FolderItem 
                    onDelete={(e) => handleFolderDelete(folder)} 
                    index={sortedFolders.length-i} 
                    marked={collection.find((id) => folder.id === id) ? true : false} 
                    onMark={handleMarkFolder} 
                    onEdit={() => setEditFolderId(folder.id)} 
                    key={folder.id} 
                    type={folder.type} 
                    id={folder.id} 
                    viewMode={workspaceSettings.viewMode} 
                    name={folder.name} 
                    desc={folder.desc} 
                    windows={folder.windows} 
                    onOpen={handlePrepareLaunchFolder}
                />
            )
            
            if(i % colsCount === 0){   
                colsList[0].push(result);
            } else if(i % colsCount === 1) {
                colsList[1].push(result);
            } else if(i % colsCount === 2){
                colsList[2].push(result);
            }
        }

        const columnsRender: Array<JSX.Element> = colsList.map((col) => <div>{col}</div>);

        return columnsRender;
    }

    const renderSortOptionsDropdown = (): JSX.Element => {
        const optionsList: Array<iFieldOption> = [
            {id: 0, label: "Ascending"},
            {id: 1, label: "Descending"},
        ];

        const presetOption = optionsList.filter((option: iFieldOption) => option.id === workspaceSettings.folderSortOptionId);

        return <Dropdown tag="sort-folders" preset={presetOption[0] || optionsList[0]} options={optionsList} onCallback={handleSortFolders} />
    }

    // Render the action buttons for workspace area
    const renderOptionsMenu = (): JSX.Element => {
        const { markedFoldersId } = workspaceSettings;
        let markSpecs: any;

        if(markedFoldersId.length > 0){
            markSpecs = {
                label: "Mark all",
                icon: "selected_checkbox",
                handle: handleUnmarkAllFolders
            }
        } else {
            markSpecs = {
                label: "Mark all",
                icon: "deselected_checkbox",
                handle: handleMarkAllFolders
            }
        }

        if(hasFolders()){
            return (
                <>
                    <div className="inline-flex items-center justify-end w-full">
                        <div className="flex">
                            <TextIconButton 
                                disabled={false} 
                                id={markSpecs.id} 
                                textSize="text-sm"
                                text={markSpecs.label} 
                                onClick={markSpecs.handle} 
                            >
                                {
                                    markedFoldersId.length > 0 ? 
                                    <SelectedCheckboxIcon size={20} fill={"#6D00C2"} /> : 
                                    <DeselectedCheckboxIcon size={20} fill={"#6D00C2"} />
                                }
                            </TextIconButton>

                            <TextIconButton 
                                disabled={markedFoldersId.length > 0 ? false : true} 
                                id={"folder_duplicate"} 
                                textSize="text-sm"
                                text="Duplicate" 
                                onClick={handlePrepareDuplication} 
                            >
                                <FolderDuplicateIcon size={20} fill={markedFoldersId.length > 0 ? "#6D00C2" : "#9f9f9f"}  />
                            </TextIconButton>
                            
                            <TextIconButton 
                                disabled={markedFoldersId.length >= 2 ? false : true} 
                                id={"merge"} 
                                textSize="text-sm"
                                text="Merge" onClick={handleMergeFolders} 
                            >
                                <MergeIcon size={20} fill={markedFoldersId.length >= 2 ? "#6D00C2" : "#9f9f9f"}  />
                            </TextIconButton>

                            <TextIconButton 
                                disabled={markedFoldersId.length > 0 ? false : true} 
                                id={"trash"} 
                                textSize="text-sm"
                                text="Delete" 
                                onClick={handlePrepareMultipleRemovals} 
                            >
                                <TrashIcon size={20} fill={markedFoldersId.length > 0 ? "#6D00C2" : "#9f9f9f"}  />
                            </TextIconButton>
                        </div>
                        <div className="flex items-center justify-end">     
                            <TextIconButton 
                                disabled={false} 
                                id={workspaceSettings.viewMode === "list" ? "grid" : "list"} 
                                textSize="text-sm"
                                text={workspaceSettings.viewMode === "list" ? "Grid" : "List"} 
                                onClick={handleChangeViewMode} 
                            >
                                { 
                                    workspaceSettings.viewMode === "list" ? 
                                    <GridIcon size={20} fill={"#6D00C2"} /> : 
                                    <ListIcon size={20} fill={"#6D00C2"} />
                                }
                            </TextIconButton>
                            <div className="relative w-[175px] mr-4 flex items-center">
                                {renderSortOptionsDropdown()}
                            </div>
                            <PrimaryButton disabled={false} text="Create workspace" onClick={() => setCreateFolder(true)} />
                        </div>
                    </div>
                </>
            )
        }

        return <></>
    }

    // Render a message. Primarily used when no folders are available
    const renderMessageBox = (): JSX.Element => {
        return <>
            <div className="flex flex-col items-center justify-center h-[50%]">
                <Paragraph text="You currently have no folders available. Please, create a new folder" />
                <div className="mt-8">
                    <PrimaryButton disabled={false} text="Create workspace" onClick={() => setCreateFolder(true)} />
                </div>
            </div>
        </>
    }

    // Check whether or not there are folders stored in redux
    const hasFolders = (): boolean | null => {
        if(folderCollection.length > 0){
            return true;
        } else {
            return false;
        }
    }
    
    // Prepare to remove multiple folders. Warn the user if set in Settings page
    const handlePrepareMultipleRemovals = (): void => {
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
    const handlePrepareDuplication = (): void => {
        const { markedFoldersId } = workspaceSettings;
        
        // Run if there are more than 0 marked folders
        if(markedFoldersId.length > 0) {
            chrome.storage.sync.get("duplication_warning_value", (data) => {

                // If the duplication warning is set in settings, and the number of marked tabs exceeds the threshold, then warn the user
                if(data.duplication_warning_value !== -1 && data.duplication_warning_value <= workspaceSettings.markedFoldersId.length) {
                    setShowDuplicationWarning(true);
                } else {
                    handleDuplicateFolders();
                }
            });
            
        }
    }

    // Prepare to launch a folder by setting windows to be launched, and how to launch the windows/tabs in it.
    const handlePrepareLaunchFolder = (windows: Array<iWindowItem>, type: string): void => {
        setWindowsPayload(windows);
        setFolderLaunchType(type);
    }

    // Launch folder
    const handleLaunchFolder = (windows: Array<iWindowItem>): void => {
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
        <>{folderCollection && workspaceSettings && (
            <>
            {showPerformanceWarning &&
                <PopupMessage
                    title="Warning" 
                    text={`You are about to open ${totalTabsCount} or more tabs at once. Opening this many may slow down your browser. Do you want to proceed?`}
                    primaryButton={{ text: "Yes, open selected folders", callback: () => { windowsPayload && handleLaunchFolder(windowsPayload); setShowPerformanceWarning(false)}}}
                    secondaryButton={{ text: "No, do not open", callback: () => { setShowPerformanceWarning(false); setWindowsPayload(null);
                        setFolderLaunchType(null); setShowPerformanceWarning(false);}}}    
                />
            }

            {showDuplicationWarning &&
                <PopupMessage
                    title="Warning" 
                    text={`You are about to duplicate ${workspaceSettings.markedFoldersId.length} or more folders at once. Unnecessary duplications may clutter your dashboard, do you want to proceed?`}
                    primaryButton={{ text: "Yes, proceed", callback: () => { handleDuplicateFolders(); setShowDuplicationWarning(false)}}}
                    secondaryButton={{ text: "No, do not duplicate", callback: () => setShowDuplicationWarning(false)}}    
                />
            }
            {removalTarget &&
                <PopupMessage
                    title="Warning" 
                    text={`You are about to remove the "${removalTarget.name}" workspace and all its contents. This is irreversible, do you want to proceed?`}
                    primaryButton={{ text: "Yes, remove this folder", callback: () => { dispatch(deleteFolderAction(removalTarget.id)); setRemovalTarget(null)}}}
                    secondaryButton={{ text: "No, don't remove", callback: () => setRemovalTarget(null)}}    
                />
            }
            {showDeleteWarning === true && 
                <PopupMessage
                    title="Warning" 
                    text={`You are about to remove one or more workspaces and all their contents. This is irreversible, do you want to proceed?`}
                    primaryButton={{ text: "Yes, remove these folders", callback: () => handleDeleteFolders()}}
                    secondaryButton={{ text: "No, don't remove", callback: () => setShowDeleteWarning(false)}}    
                />
            }
            {renderFolderManagerPopup()}
        
            <SectionContainer id="workspace-section" title="Workspaces" options={renderOptionsMenu}>
                <>
                    {loaded === true && !hasFolders() && renderMessageBox()}
                    {<div className={`${workspaceSettings.viewMode === "list" ? "mx-auto mt-12" : `grid xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-3 grid-flow-dense gap-x-4 gap-y-0 mt-8`}`}>
                        {renderFolders()}
                    </div>}
                </>
            </SectionContainer>
        </>)}
        </>  
    );

}

export default WorkspacesSection