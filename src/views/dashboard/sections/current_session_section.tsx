import "../../../styles/global_utils.module.scss";
import PrimaryButton from '../../../components/utils/primary_button';
import FolderManager from '../../../components/utils/folder_manager';
import { useEffect, useState } from "react";
import { iFolderItem } from '../../../interfaces/folder_item';
import { useDispatch, useSelector } from 'react-redux';
import { clearInEditFolder  } from '../../../redux/actions/inEditFolderActions';
import randomNumber from '../../../tools/random_number';
import { iWindowItem } from '../../../interfaces/window_item';
import { clearMarkedFoldersAction } from '../../../redux/actions/workspaceSettingsActions';
import { clearMarkedTabsAction} from '../../../redux/actions/historySettingsActions';
import { iTabItem } from '../../../interfaces/tab_item';
import { iFieldOption } from '../../../interfaces/dropdown';
import { setUpWindowsAction } from '../../../redux/actions/currentSessionActions';
import CurrentSessionWindowItem from '../../../components/current_session_window_item';
import AddToWorkspacePopup from '../../../components/utils/add_to_workspace_popup';
import SectionContainer from "../../../components/utils/section_container";

const CurrentSessionSection = (props: any): JSX.Element => {
    const [addToWorkSpaceMessage, setAddToWorkspaceMessage] = useState<boolean>(false);
    const [mergeProcess, setMergeProcess] = useState<iFolderItem | null>(null);
    const [createFolder, setCreateFolder] = useState<boolean>(false);

    const folderCollection: Array<iFolderItem> = useSelector((state: any) => state.FolderCollectionReducer);
    const currentSessionData = useSelector((state: any) => state.CurrentSessionSettingsReducer);

    const dispatch = useDispatch();

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

    function getAllWindows(): void {
        const queryOptions: chrome.windows.QueryOptions = {
            populate: true,
            windowTypes: ["normal", "popup"]
        };
        chrome.windows.getAll(queryOptions, (windows: Array<chrome.windows.Window>) => {
            dispatch(setUpWindowsAction(windows));
        });
    };

    function handleCloseFolderManager(): void {
        // Reset and clear out any settings or processes 
        setCreateFolder(false);
        setMergeProcess(null);

        dispatch(clearMarkedTabsAction());
        dispatch(clearMarkedFoldersAction());
        dispatch(clearInEditFolder());
    }

    function renderOptionsMenu(): JSX.Element {
        return (
            <>
                <div className="inline-flex items-center justify-end">
                    <div className="flex">
                   
                    </div>
                    <div className="flex items-center justify-end">
                        <PrimaryButton 
                            disabled={false} 
                            text="Save this session to workspace" 
                            onClick={() => setAddToWorkspaceMessage(true)} 
                        />
                    </div>
                </div>
            </>
        )
    }

    function renderContents(): Array<JSX.Element> | JSX.Element {
        const existingWindows = currentSessionData?.windows;
        const existingWindowsElements: Array<JSX.Element> = existingWindows?.map((item: iWindowItem, i: number) => {
            return (
                <CurrentSessionWindowItem 
                    key={`window-item-${i}`} 
                    tabsCol={4} 
                    disableEdit={currentSessionData.windows.length < 2 ? true : false} 
                    disableTabMark={false} 
                    disableTabEdit={true} id={item.id} 
                    tabs={item.tabs} 
                    initExpand={true} 
                />
            );
        });
        
        if (existingWindowsElements?.length > 0){
            return [...existingWindowsElements];
        } else {
            return <></>;
        }
    }

    function renderAddTabsMessage(): JSX.Element {
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

        function handleAddToNewWorkspace(): void {
            setAddToWorkspaceMessage(false);
            setCreateFolder(true);
        }

        function handleAddToExistingWorkspace(e: any): void {
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

        return (
            <AddToWorkspacePopup 
                title="Save session"
                type="slide-in"
                dropdownOptions={dropdownOptions}
                onNewWorkspace={handleAddToNewWorkspace}
                onExistingWorkspace={handleAddToExistingWorkspace}
                onCancel={() => setAddToWorkspaceMessage(false)}
            />
        );
    }
    
    function renderFolderManager(): JSX.Element {
        let render = <></>;

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
            render = <FolderManager type="slide-in" title="Create workspace" folder={folderSpecs} onClose={handleCloseFolderManager} />;
        } else if(mergeProcess !== null) {
            render = <FolderManager type="slide-in" title={`Merge tabs to ${mergeProcess.name}`} folder={mergeProcess} onClose={handleCloseFolderManager} />;
        }

        return render;
    }

    return (
        <>
            {addToWorkSpaceMessage && renderAddTabsMessage()}
            {renderFolderManager()}
            <SectionContainer id="currentSession-view" title="Current session" options={renderOptionsMenu}>
                {renderContents()}
            </SectionContainer>
        </>  
    );

}

export default CurrentSessionSection