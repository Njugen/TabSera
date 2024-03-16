import { useState, useEffect, useRef } from "react";
import { iWindowItem } from '../../interfaces/window_item';
import { useSelector, useDispatch } from "react-redux";
import { iFolder } from '../../interfaces/folder';
import Folder from "../../components/folder";
import { getFromStorage, saveToStorage } from '../../services/webex_api/storage';
import { readAllFoldersFromBrowserAction } from '../../redux/actions/folderCollectionActions';
import ManageFolderPopup from "../../components/utils/manage_folder_popup";
import { clearInEditFolder } from "../../redux/actions/inEditFolderActions";
import { clearMarkedTabsAction, setMarkMultipleTabsAction, setUpTabsAction } from '../../redux/actions/historySettingsActions';
import { setCurrentTabsSortOrder, setUpWindowsAction } from '../../redux/actions/currentSessionActions';
import PrimaryButton from "../../components/utils/primary_button";
import { clearMarkedFoldersAction } from '../../redux/actions/workspaceSettingsActions';
import randomNumber from '../../tools/random_number';
import AddToWorkspacePopup from "../../components/utils/add_to_workspace_popup";
import { iTabItem } from '../../interfaces/tab_item';
import { iFieldOption } from '../../interfaces/dropdown';
import CurrentSessionWindowItem from '../../components/current_session_window_item';

function CurrentSessionView(props:any): JSX.Element {
    const [addToWorkSpaceMessage, setAddToWorkspaceMessage] = useState<boolean>(false);
    const [createFolder, setCreateFolder] = useState<boolean>(false);
    const [mergeProcess, setMergeProcess] = useState<iFolder | null>(null);
    const [editFolderId, setEditFolderId] = useState<number | null>(null);

    const folderCollection: Array<iFolder> = useSelector((state: any) => state.FolderCollectionReducer);

    const dispatch = useDispatch();
    const currentSessionData = useSelector((state: any) => state.CurrentSessionSettingsReducer);

    useEffect(() => {        
        if(folderCollection.length > 0){
            saveToStorage("local", "folders", folderCollection);
        } 
    }, [folderCollection]);

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
                title="Save session"
                type="popup"
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
            render = <ManageFolderPopup type="popup" title="Create workspace" folder={payload} onClose={handlePopupClose} />;
        } else if(mergeProcess !== null) {

            render = <ManageFolderPopup type="popup" title={`Merge tabs to ${mergeProcess.name}`} folder={mergeProcess} onClose={handlePopupClose} />;
        } else {
            render = <></>;
        }

        return render;
    }

    function renderWindows(): Array<JSX.Element> {
        const existingWindows = currentSessionData?.windows;
        const existingWindowsElements: Array<JSX.Element> = existingWindows?.map((item: iWindowItem, i: number) => <CurrentSessionWindowItem key={`window-item-${i}`} tabsCol={1} disableEdit={currentSessionData.windows.length < 2 ? true : false} disableTabMark={false} disableTabEdit={true} id={item.id} tabs={item.tabs} initExpand={true} />);
        
        if (existingWindowsElements?.length > 0){
            return [...existingWindowsElements];
        } else {
            return [renderEmptyMessage()];
        }
    }

    return (
        <>
            {addToWorkSpaceMessage && renderAddTabsMessage()}
            {renderPopup()}
            <div className="flex justify-center mt-4 mb-6">
                <PrimaryButton disabled={false} text="Save session" onClick={() => setAddToWorkspaceMessage(true)} />
            </div>
            <div>
                {renderWindows()}
            </div>
        </>
    )
}

export default CurrentSessionView;