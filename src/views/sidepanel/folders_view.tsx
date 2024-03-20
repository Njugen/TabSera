import { useState, useEffect, useRef } from "react";
import { iWindowItem } from '../../interfaces/window_item';
import { useSelector, useDispatch } from "react-redux";
import { iFolder } from '../../interfaces/folder';
import Folder from "../../components/folder";
import { getFromStorage, saveToStorage } from '../../services/webex_api/storage';
import { readAllFoldersFromBrowserAction } from '../../redux/actions/folderCollectionActions';
import FolderManager from "../../components/utils/folder_manager";
import { clearInEditFolder } from "../../redux/actions/inEditFolderActions";
import { clearMarkedFoldersAction } from "../../redux/actions/workspaceSettingsActions";
import MessageBox from "../../components/utils/message_box";
import PrimaryButton from "../../components/utils/primary_button";

function FoldersView(props:any): JSX.Element {
    const [windowsPayload, setWindowsPayload] = useState<Array<iWindowItem> | null>(null);
    const [folderLaunchType, setFolderLaunchType] = useState<string | null>(null); 
    const [totalTabsCount, setTotalTabsCount] = useState<number>(0);
    const [showPerformanceWarning, setShowPerformanceWarning] = useState<boolean>(false);
    const [showFolderManager, setShowFolderManager] = useState<boolean>(false);

    const dispatch = useDispatch();
    const folderCollection = useSelector((state: any) => state.FolderCollectionReducer);

    useEffect(() => {        
        if(folderCollection.length > 0){
            saveToStorage("local", "folders", folderCollection);
        } 
    }, [folderCollection]);

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
            //handleLaunchFolder(windowsPayload);
        });
    }, [folderLaunchType]);

    useEffect(() => {
        getFromStorage("local", "folders", (data) => {  
            dispatch(readAllFoldersFromBrowserAction(data.folders));
        })
    }, []);


    function handlePrepareLaunchFolder(windows: Array<iWindowItem>, type: string): void {
        setWindowsPayload(windows);
        setFolderLaunchType(type);
    }

    function handleLaunchFolder(windows: Array<iWindowItem>): void {
        console.log("BLABLABLA");
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

    const renderFolders = (): Array<JSX.Element> => {
        const result = folderCollection.map((folder: iFolder, i: number) => {
            return (
                <Folder 
                    //onDelete={(e) => handleFolderDelete(folder)} 
                    marked={false} 
                    //onMark={handleMarkFolder} 
                    //onEdit={() => setEditFolderId(folder.id)} 
                    index={folderCollection.length-i}
                    key={folder.id} 
                    type={folder.type} 
                    id={folder.id} 
                    viewMode="list" 
                    name={folder.name} 
                    desc={folder.desc} 
                    windows={folder.windows} 
                    onOpen={handlePrepareLaunchFolder}
                />
            );
        })
        return result.length > 0 ? result : [<p className="text-center">There are no folders at the moment.</p>]
    } 

    function handleCloseFolderManager(): void {
        dispatch(clearMarkedFoldersAction());
        dispatch(clearInEditFolder());
        setShowFolderManager(false);
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
            {showFolderManager === true && <FolderManager type="popup" title="Create workspace" onClose={handleCloseFolderManager} />}
            <div className="flex justify-center mt-4 mb-6">
                <PrimaryButton disabled={false} text="Add folder" onClick={() => setShowFolderManager(true)} />
            </div>
            {renderFolders()}
        </>
    )
}

export default FoldersView;