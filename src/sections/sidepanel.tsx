import SimpleSearchBar from '../components/utils/simple_search_bar';
import '../App.css';
import styles from "./../styles/global_utils.module.scss";
import "./../styles/sidepanel_specific.css";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getFromStorage } from '../services/webex_api/storage';
import { readAllFoldersFromBrowserAction } from '../redux/actions/folderCollectionActions';
import { iFolder } from '../interfaces/folder';
import Folder from '../components/folder';
import { iWindowItem } from '../interfaces/window_item';

function RenderSidePanel(props: any): JSX.Element {
    const [windowsPayload, setWindowsPayload] = useState<Array<iWindowItem> | null>(null);
    const [folderLaunchType, setFolderLaunchType] = useState<string | null>(null); 
    const [totalTabsCount, setTotalTabsCount] = useState<number>(0);
    const [showPerformanceWarning, setShowPerformanceWarning] = useState<boolean>(false);

    const dispatch = useDispatch();
    const folderCollection = useSelector((state: any) => state.FolderCollectionReducer);
    
    useEffect(() => {
        
        if(!windowsPayload || !folderLaunchType) return;
        let tabsCount = 0;
        windowsPayload.forEach((window: iWindowItem) => {
            tabsCount += window.tabs.length;
        });
   
        chrome.storage.sync.get("performance_notification_value", (data) => {
            setTotalTabsCount(data.performance_notification_value);
            /*if(data.performance_notification_value !== -1 && data.performance_notification_value <= tabsCount) {
                setShowPerformanceWarning(true);
            } else {
                handleLaunchFolder(windowsPayload);
            }*/
            handleLaunchFolder(windowsPayload);
        });
    }, [folderLaunchType]);

    function handlePrepareLaunchFolder(windows: Array<iWindowItem>, type: string): void {
        setWindowsPayload(windows);
        setFolderLaunchType(type);
    }

    // Launch folder
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
        return result.length > 0 ? result : [<></>]
    } 

    const handleChange = (e: any): void => {
        console.log(e.target.value);
    }

    useEffect(() => {
        getFromStorage("local", "folders", (data) => {  
            dispatch(readAllFoldersFromBrowserAction(data.folders));
        })
    }, []);

    return (
        <>
            <div className={"p-4 border-b border-gray-100 sticky top-0 z-50 bg-white"}>
                <SimpleSearchBar onChange={handleChange} />
                <div className="flex justify-between mt-8">
                    <button className="text-tbfColor-lightpurple font-semibold">Folders</button>
                    <button className="text-gray-400 hover:text-tbfColor-lighterpurple transition ease-in-out duration-300 font-semibold">Current tabs</button>
                    <button className="text-gray-400 hover:text-tbfColor-lighterpurple transition ease-in-out duration-300 font-semibold">History</button>
                </div>
            </div>
            <div className={`overflow-y-auto p-4 ${styles.scroll_style} bg-gray-50 min-h-[1000px]`}>
                {renderFolders()}
            </div>
        </>
    )
}

export default RenderSidePanel;