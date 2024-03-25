import { useState, useEffect } from "react";
import { iWindowItem } from '../../interfaces/window_item';
import { useSelector, useDispatch } from "react-redux";
import { iFolderItem } from '../../interfaces/folder_item';
import { saveToStorage } from '../../services/webex_api/storage';
import FolderManager from "../../components/features/folder_manager/folder_manager";
import { clearInEditFolder } from "../../redux/actions/inEditFolderActions";
import { clearMarkedTabsAction } from '../../redux/actions/historySettingsActions';
import { setUpWindowsAction } from '../../redux/actions/currentSessionActions';
import PrimaryButton from "../../components/utils/primary_button/primary_button";
import { clearMarkedFoldersAction } from '../../redux/actions/workspaceSettingsActions';
import randomNumber from '../../tools/random_number';
import AddToWorkspacePopup from "../../components/features/add_to_workspace_popup";
import { iTabItem } from '../../interfaces/tab_item';
import { iFieldOption } from '../../interfaces/dropdown';
import SaveIcon from './../../images/icons/save_icon';
import CircleButton from './../../components/utils/circle_button';
import WindowItem from "../../components/features/window_item";

const CurrentSessionView = (props:any): JSX.Element => {
    const [addToWorkSpaceMessage, setAddToWorkspaceMessage] = useState<boolean>(false);
    const [createFolder, setCreateFolder] = useState<boolean>(false);
    const [mergeProcess, setMergeProcess] = useState<iFolderItem | null>(null);
    const [editFolderId, setEditFolderId] = useState<number | null>(null);

    const folderCollection: Array<iFolderItem> = useSelector((state: any) => state.FolderCollectionReducer);

    const dispatch = useDispatch();
    const currentSessionData = useSelector((state: any) => state.CurrentSessionSettingsReducer);

    useEffect(() => {        
        if(folderCollection.length > 0){
            saveToStorage("sync", "folders", folderCollection);
        } 
    }, [folderCollection]);

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

    const getAllWindows = (): void => {
        const queryOptions: chrome.windows.QueryOptions = {
            populate: true,
            windowTypes: ["normal", "popup"]
        };
        chrome.windows.getAll(queryOptions, (windows: Array<chrome.windows.Window>) => {
            dispatch(setUpWindowsAction(windows));
        });
    };

    const handlePopupClose = (): void => {
        setEditFolderId(null);
        setCreateFolder(false);
        setMergeProcess(null);

        dispatch(clearMarkedTabsAction());
        dispatch(clearMarkedFoldersAction());
        dispatch(clearInEditFolder());
    }

    const renderEmptyMessage = (): JSX.Element => {
        return (
            <div className={"flex justify-center items-center"}>
                <p> Your browing history is empty.</p>
            </div>
        );
    }

    const handleAddToNewWorkspace = (): void => {
        setAddToWorkspaceMessage(false);
        setCreateFolder(true);
    }

    const handleAddToExistingWorkspace = (e: any): void => {
        if(e.selected === -1) return;

        const targetFolderId = e.selected;
        const targetFolder: iFolderItem | undefined = folderCollection.find((folder: iFolderItem) => folder.id === targetFolderId);
     
        if(!targetFolder) return;

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

            const updatedFolder: iFolderItem = {...targetFolder};
            updatedFolder.windows = [...updatedFolder.windows,  ...newWindowItems];

            if(targetFolder){
                setAddToWorkspaceMessage(false);
                setMergeProcess(updatedFolder);
            }
        } 
    }

    const renderAddTabsMessage = (): JSX.Element => {
        const currentFolders: Array<iFolderItem> = folderCollection;

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

        return (
            <AddToWorkspacePopup 
                dropdownOptions={dropdownOptions}
                onNewWorkspace={handleAddToNewWorkspace}
                onExistingWorkspace={handleAddToExistingWorkspace}
                onCancel={() => setAddToWorkspaceMessage(false)}
            />
        );
    }

    const renderFolderManager = (): JSX.Element => {
        let render;
        if(createFolder === true){
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

            const folderSpecs: iFolderItem = {
                id: randomNumber(),
                name: "",
                desc: "",
                type: "expanded",
                viewMode: "grid",
                marked: false,
                windows: [...presetWindows],
            }
            render = <FolderManager type="popup" title="Create workspace" folder={folderSpecs} onClose={handlePopupClose} />;
        } else if(mergeProcess !== null) {

            render = <FolderManager type="popup" title={`Merge tabs to ${mergeProcess.name}`} folder={mergeProcess} onClose={handlePopupClose} />;
        } else {
            render = <></>;
        }

        return render;
    }

    const renderWindows = (): Array<JSX.Element> => {
        const existingWindows = currentSessionData?.windows;
        const existingWindowsElements: Array<JSX.Element> = existingWindows?.map((item: iWindowItem, i: number) => {
            return (
               /* <CurrentSessionWindowItem 
                    key={`window-item-${i}`} 
                    tabsCol={1}
                    disableEdit={currentSessionData.windows.length < 2 ? true : false} 
                    disableTabMark={false} 
                    disableTabEdit={true} 
                    id={item.id} 
                    tabs={item.tabs} 
                    initExpand={true} 
                />*/
               

                <WindowItem
                    key={`window-item-${i}`} 
                    tabsCol={1}
                    disableEdit={currentSessionData.windows.length < 2 ? true : false} 
                    disableTabMark={true} 
                    disableTabEdit={true} 
                    id={item.id} 
                    tabs={item.tabs} 
                    initExpand={true} 
                />
            );
        })
        
        if (existingWindowsElements?.length > 0){
            return [...existingWindowsElements];
        } else {
            return [renderEmptyMessage()];
        }
    }

    return (
        <>
            {addToWorkSpaceMessage && renderAddTabsMessage()}
            {renderFolderManager()}
            <div className="flex justify-end mx-2 mt-4 mb-6">
                <CircleButton 
                    disabled={false} 
                    bgCSSClass="bg-tbfColor-lightpurple" 
                    onClick={() => setAddToWorkspaceMessage(true)}
                >
                    <SaveIcon size={20} fill={"#fff"} />
                </CircleButton>
            </div>
            <div>
                {renderWindows()}
            </div>
        </>
    )
}

export default CurrentSessionView;