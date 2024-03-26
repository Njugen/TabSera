import styles from "../../../styles/global_utils.module.scss";
import PrimaryButton from '../../../components/utils/primary_button/primary_button';
import FolderManager from '../../../components/features/folder_manager/folder_manager';
import { useEffect, useState, useRef } from "react";
import { iFolderItem } from '../../../interfaces/folder_item';
import { useDispatch, useSelector } from 'react-redux';
import { clearInEditFolder  } from '../../../redux/actions/inEditFolderActions';
import TextIconButton from '../../../components/utils/text_icon_button';
import randomNumber from '../../../tools/random_number';
import { iWindowItem } from '../../../interfaces/window_item';
import { clearMarkedFoldersAction } from '../../../redux/actions/workspaceSettingsActions';
import Dropdown from '../../../components/utils/dropdown/dropdown';
import TabItem from '../../../components/features/tab_item';
import { changeTabsViewMode, clearMarkedTabsAction, setMarkMultipleTabsAction, setMarkedTabsAction, setTabsSortOrder, setUpTabsAction } from '../../../redux/actions/historySettingsActions';
import { iTabItem } from '../../../interfaces/tab_item';
import { iDropdownSelected, iFieldOption } from '../../../interfaces/dropdown';
import AddToWorkspacePopup from '../../../components/features/add_to_workspace_popup';
import SectionContainer from "../../../components/utils/section_container";
import iHistoryState from "../../../interfaces/states/historyState";
import { getFromStorage, saveToStorage } from "../../../services/webex_api/storage";
import SelectedCheckboxIcon from "../../../images/icons/selected_checkbox_icon";
import TrashIcon from "../../../images/icons/trash_icon";
import GridIcon from "../../../images/icons/grid_icon";
import ListIcon from "../../../images/icons/list_icon";
import DeselectedCheckboxIcon from "../../../images/icons/deselected_checkbox_icon";

const HistorySection = (props: any): JSX.Element => {
    const [addToWorkSpaceMessage, setAddToWorkspaceMessage] = useState<boolean>(false);
    const [mergeProcessFolder, setMergeProcessFolder] = useState<iFolderItem | null>(null);
    const [createFolder, setCreateFolder] = useState<boolean>(false);

    const tabsData = useSelector((state: any) => state.HistorySettingsReducer);
    const folderCollection: Array<iFolderItem> = useSelector((state: any) => state.FolderCollectionReducer);

    const historyListRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const query = {
            text: "",
            maxResults: 25
        }

        chrome.history.search(query, (items: Array<chrome.history.HistoryItem>) => {
            dispatch(setUpTabsAction(items));
        });

        getFromStorage("sync", "history_sort", (data) => {  
            dispatch(setTabsSortOrder(data.history_sort));
        })

        getFromStorage("sync", "history_viewmode", (data) => {  
            dispatch(changeTabsViewMode(data.history_viewmode));
        })
    }, []);

    // Change tab listing from grid to list, and vice versa
    const handleChangeViewMode = (): void => {
        const { viewMode } = tabsData;
        
        const newStatus = viewMode === "list" ? "grid" : "list"
        saveToStorage("sync", "history_viewmode", newStatus)
        dispatch(changeTabsViewMode(newStatus));
    }

    const handleCloseFolderManager = (e: any): void => {
        const newStatus = e.selected;

        saveToStorage("sync", "history_sort", newStatus);
        dispatch(setTabsSortOrder(newStatus));
    }

    const renderSortOptionsDropdown = (): JSX.Element => {
        const optionsList: Array<iFieldOption> = [
            {id: 0, label: "Ascending title"},
            {id: 1, label: "Descending title"},
            {id: 2, label: "Last visited"},
            {id: 3, label: "Most visited"}
        ];

        const presetOption = optionsList.filter((option: iFieldOption) => option.id === tabsData.tabSortOptionId);
        
        return <Dropdown tag="sort-folders" preset={presetOption[0] || optionsList[0]} options={optionsList} onCallback={handleCloseFolderManager} />
    }

    // Mark/unmark a tab by its id
    const handleMarkTab = (id: number): void => {
        const tabCollection: Array<chrome.history.HistoryItem> = tabsData.tabs;
        const markedTabs: Array<chrome.history.HistoryItem> = tabsData.markedTabs;

        // Get an index of the affected tab
        const index = tabCollection.findIndex((tab: chrome.history.HistoryItem) => id === parseInt(tab.id));

        if(index >= 0){
            const isMarked = markedTabs.find((tab: chrome.history.HistoryItem) => id === parseInt(tab.id));
            
            if(isMarked){
                const updatedMarkedTabCollection: Array<chrome.history.HistoryItem> = markedTabs.filter((tab) => parseInt(tab.id) !== id);

                dispatch(setMarkMultipleTabsAction(updatedMarkedTabCollection));
            } else {
                const newTab = tabCollection[index];
                dispatch(setMarkedTabsAction(newTab));
            }  
        }
    }

    const handleMarkAllTabs = (): void => {
        const tabs: Array<chrome.history.HistoryItem> = tabsData.tabs as Array<chrome.history.HistoryItem>;
        dispatch(setMarkMultipleTabsAction(tabs));
    }

    const handleUnMarkAll = (): void => {
        dispatch(setMarkMultipleTabsAction([]));
    }

    const handleDeleteFromHistory = (): void => {
        let updatedMarks = tabsData.tabs;

        tabsData.markedTabs.forEach((tab: chrome.history.HistoryItem) => {
            chrome.history.deleteUrl({ url: tab.url! });
            updatedMarks = updatedMarks.filter((target: chrome.history.HistoryItem) => target.url !== tab.url);
        });
        dispatch(setUpTabsAction(updatedMarks));
        dispatch(setMarkMultipleTabsAction([]));
    }

    const handleOpenSelected = (): void => {
        const markedTabs: Array<chrome.history.HistoryItem> = tabsData.markedTabs as Array<chrome.history.HistoryItem>;
        
        markedTabs.forEach((tab: chrome.history.HistoryItem) => {
            const properties: object = {
                active: false,
                url: tab.url
            };
            chrome.tabs.create(properties);
        })
    }

    const renderOptionsMenu = (): JSX.Element => {
        const { markedTabs } = tabsData;
        let specs: any;

        if(markedTabs.length > 0){
            specs = {
                label: "Mark all",
                id: "selected_checkbox",
                handle: handleUnMarkAll
            }
        } else {
            specs = {
                label: "Mark all",
                id: "deselected_checkbox",
                handle: handleMarkAllTabs
            }
        }

        return (
            <>
                <div className="mr-4 inline-flex items-center justify-end w-full">
                    <div className="flex">
                        <TextIconButton 
                            disabled={false} 
                            id={specs.id} 
                            textSize="text-sm"
                            text={specs.label} 
                            onClick={specs.handle} 
                        >
                            {
                                markedTabs.length > 0 ? 
                                <SelectedCheckboxIcon size={20} fill={"#6D00C2"} /> : 
                                <DeselectedCheckboxIcon size={20} fill={"#6D00C2"} />
                            }
                        </TextIconButton>
                        <TextIconButton 
                            disabled={markedTabs.length > 0 ? false : true} 
                            id={"trash"} 
                            textSize="text-sm"
                            text="Delete from history" 
                            onClick={handleDeleteFromHistory} 
                        >
                            <TrashIcon size={20} fill={markedTabs.length > 0 ? "#6D00C2" : "#9f9f9f"} />
                        </TextIconButton>
                    </div>
                    
                    <div className="flex items-center justify-end">
                        <TextIconButton 
                            disabled={false} 
                            id={tabsData.viewMode === "list" ? "grid" : "list"} 
                            textSize="text-sm"
                            text={tabsData.viewMode === "list" ? "Grid" : "List"} 
                            onClick={handleChangeViewMode} 
                        >
                            { 
                                tabsData.viewMode === "list" ? 
                                <GridIcon size={20} fill={"#6D00C2"} /> : 
                                <ListIcon size={20} fill={"#6D00C2"} />
                            }
                        </TextIconButton>
                        <div className="relative w-[175px] mr-4 flex items-center">
                            {renderSortOptionsDropdown()}
                        </div>
                        <PrimaryButton disabled={markedTabs.length > 0 ? false : true} text="Open selected" onClick={handleOpenSelected} />
                        <PrimaryButton disabled={markedTabs.length > 0 ? false : true} text="Add to workspace" onClick={() => setAddToWorkspaceMessage(true)} />
                    </div>
                </div>
            </>
        )
    }

    const renderTabs = (): Array<JSX.Element> => {
        const { tabSortOptionId, tabs } = tabsData;
        let sortedTabs: Array<chrome.history.HistoryItem> = tabs;
        
        const titleCondition = (a: chrome.history.HistoryItem, b: chrome.history.HistoryItem): boolean => {
            a.title = a.title ? a.title : "";
            b.title = b.title ? b.title : "";

            const aTitleLowerCase = a.title.toLowerCase();
            const bTitleToLowerCase = b.title.toLowerCase();

            return tabSortOptionId === 0 ? (aTitleLowerCase > bTitleToLowerCase) : (bTitleToLowerCase > aTitleLowerCase);
        }

        if(tabSortOptionId === 0 || tabSortOptionId === 1){
            sortedTabs = [...tabs].sort((a: any, b: any) => titleCondition(a, b) ? 1 : -1);
        } else if(tabSortOptionId === 2){
            sortedTabs = [...tabs].sort((a: any, b: any) => a.lastVisitTime - b.lastVisitTime);
        } else if(tabSortOptionId === 3){
            sortedTabs = [...tabs].sort((a: any, b: any) => a.visitCount - b.visitCount);
        }

        const result = sortedTabs.map((item: chrome.history.HistoryItem) => {
            const collection = tabsData.markedTabs;
            const isMarked = collection.find((target: chrome.history.HistoryItem) => parseInt(target.id) === parseInt(item.id));
            const { id, title, url } = item;
    
            return (
                <TabItem 
                    onMark={handleMarkTab} 
                    key={`sorted-tab-${id}`} 
                    id={parseInt(id)} 
                    label={title || ""} 
                    url={url || "https://"} 
                    disableEdit={true} 
                    disableMark={false} 
                    marked={isMarked ? true : false} 
                />
            )
        });

        return result; 
    };

    const handleAddToNewWorkspace = (): void => {
        setAddToWorkspaceMessage(false);
        setCreateFolder(true);
    }

    const handleAddToExistingWorkspace = (e: any): void => {
        if(e.selected === -1) return;

        const targetFolderId = e.selected;
        const targetFolder: iFolderItem | undefined = folderCollection.find((folder: iFolderItem) => folder.id === targetFolderId);
     
        if(!targetFolder) return;
        
        const markedTabs: Array<iTabItem> = tabsData.markedTabs.map((tab: chrome.history.HistoryItem) => {
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
        };

        const updatedFolder: iFolderItem = {...targetFolder};
        updatedFolder.windows = [...updatedFolder.windows, presetWindow];

        if(targetFolder){
            setAddToWorkspaceMessage(false);
            setMergeProcessFolder(updatedFolder);
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
                title="Add to workspace"
                type="slide-in"
                dropdownOptions={dropdownOptions}
                onNewWorkspace={handleAddToNewWorkspace}
                onExistingWorkspace={handleAddToExistingWorkspace}
                onCancel={() => setAddToWorkspaceMessage(false)}
            />

        );
    }


    const handlePopupClose = (): void => {
        setCreateFolder(false);
        setMergeProcessFolder(null);

        dispatch(clearMarkedTabsAction());
        dispatch(clearMarkedFoldersAction());
        dispatch(clearInEditFolder());
    }

    const renderFolderManager = (): JSX.Element => {
        let render;
        if(createFolder === true){
            const markedTabs: Array<iTabItem> = tabsData.markedTabs.map((tab: chrome.history.HistoryItem) => {
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
            };
            
            const folderSpecs: iFolderItem = {
                id: randomNumber(),
                name: "",
                desc: "",
                type: "expanded",
                viewMode: "grid",
                marked: false,
                windows: [presetWindow],
            }
            render = <FolderManager type="slide-in" title="Create workspace" folder={folderSpecs} onClose={handlePopupClose} />;
        } else if(mergeProcessFolder !== null) {
            render = <FolderManager type="slide-in" title={`Merge tabs to ${mergeProcessFolder.name}`} folder={mergeProcessFolder} onClose={handlePopupClose} />;
        } else {
            render = <></>;
        }

        return render;
    }

    const tabViewModeCSS = (): string => {
        if(tabsData.viewMode === "list"){
            return "mx-auto mt-10";
        } else {
            return "grid xl:grid-cols-3 2xl:grid-cols-4 grid-flow-dense gap-x-3 gap-y-0 mt-6 pr-2";
        }
    }

    const renderContentSection = (): JSX.Element => {
        return (
            <div className="flex justify-center min-h-[350px]">
                <div className="w-full">
                    <div className="pb-6">
                        <div ref={historyListRef} className={`${styles.scroll_style} overflow-y-auto ${tabViewModeCSS()} max-h-[350px]`}>
                            {renderTabs()}
                        </div>
                    </div> 
                </div>            
            </div>
        );
    }

    const renderEmptyMessage = (): JSX.Element => {
        return (
            <div className="flex justify-center items-center bg-white min-h-[350px]">
                <p> Your browing history is empty.</p>
            </div>
        );
    }

    return (
        <>
            {addToWorkSpaceMessage && renderAddTabsMessage()}
            {renderFolderManager()}
            <SectionContainer id="history-view" title="History" options={renderOptionsMenu}>
                <div className="mt-8">                     
                    {tabsData.tabs.length > 0 ? renderContentSection() : renderEmptyMessage()}
                </div>  
            </SectionContainer>
        </>
    );

}

export default HistorySection