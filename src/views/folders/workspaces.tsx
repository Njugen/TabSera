import Folder from '../../components/folder'
import "./../../styles/global_utils.module.scss";
import PrimaryButton from '../../components/utils/primary_button';
import ManageFolderPopup from '../../components/utils/manage_folder_popup';
import { useEffect, useState } from "react";

import GenericIconButton from '../../components/utils/generic_icon_button';
import * as predef from "../../styles/predef";
import { iFolder } from '../../interfaces/folder';
import { useDispatch, useSelector } from 'react-redux';
import { clearInEditFolder  } from '../../redux/actions/inEditFolderActions';
import {  createFolderAction, readAllFoldersFromBrowserAction } from '../../redux/actions/folderCollectionActions';
import Paragraph from '../../components/utils/paragraph';
import { deleteFolderAction } from "../../redux/actions/folderCollectionActions";
import { saveToStorage, getFromStorage } from '../../services/webex_api/storage';
import MessageBox from '../../components/utils/message_box';
import GreyBorderButton from '../../components/utils/grey_border_button';
import TextIconButton from '../../components/utils/text_icon_button';
import randomNumber from '../../tools/random_number';
import { iWindowItem } from '../../interfaces/window_item';
import { changeWorkspacesViewMode, clearMarkedFoldersAction, setFoldersSortOrder, setMarkedFoldersAction, setMarkMultipleFoldersAction } from '../../redux/actions/workspaceSettingsActions';
import Dropdown from '../../components/utils/dropdown';
import GridIcon from '../../images/icons/grid_icon';
import SortIcon from '../../images/icons/sort_icon';

function Workspaces(props: any): JSX.Element {
    const [editFolderId, setEditFolderId] = useState<number | null>(null);
    const [createFolder, setCreateFolder] = useState<boolean>(false);
    const [removalTarget, setRemovalTarget] = useState<iFolder | null>(null);
    const [showDeleteWarning, setShowDeleteWarning] = useState<boolean>(false);
    const [mergeProcess, setMergeProcess] = useState<iFolder | null>(null);

    const dispatch = useDispatch();
    const folderCollection = useSelector((state: any) => state.FolderCollectionReducer);
    const workspaceSettings = useSelector((state: any) => state.WorkspaceSettingsReducer);

    useEffect(() => {
        
        if(folderCollection.length > 0){
            saveToStorage("local", "folders", folderCollection);
        } 
    }, [folderCollection]);

    useEffect(() => {
        getFromStorage("local", "folders", (data) => {  
            dispatch(readAllFoldersFromBrowserAction(data.folders));
        })
    }, []);


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

    function handleDuplicateFolders(): void {
        const { markedFoldersId } = workspaceSettings;

        if(folderCollection && markedFoldersId){
            markedFoldersId.forEach((targetId: number) => {
                const markedFolderIndex = folderCollection.findIndex((folder: iFolder) => targetId === folder.id);

                if(markedFolderIndex > -1){
                    const newFolder: iFolder = {...folderCollection[markedFolderIndex]};

                  
                    newFolder.id = randomNumber();
                    newFolder.name = newFolder.name + " (duplicate)";

                    dispatch(createFolderAction({...newFolder}));
                }
            });
            dispatch(clearMarkedFoldersAction());
        }
    }

    function renderPopup(): JSX.Element {
        let render;

        if(createFolder === true){
            render = <ManageFolderPopup title="Create workspace" onClose={handlePopupClose}>test</ManageFolderPopup>;
        } else {

            if(mergeProcess !== null){
                return <ManageFolderPopup title={`Create folder by merge`} folder={mergeProcess} onClose={handlePopupClose}>test</ManageFolderPopup>
            } else {
                const targetFolder: Array<iFolder> = folderCollection.filter((item: iFolder) => editFolderId === item.id);
                const input: iFolder = {...targetFolder[0]};

                if(targetFolder.length > 0){
                    render = <ManageFolderPopup title={`Edit folder ${targetFolder[0].id}`} folder={input} onClose={handlePopupClose}>test</ManageFolderPopup>;
                } else {
                    render = <></>;
                }
            }
            
        }

        return render;
    }

    function handleMarkFolder(id: number): void{

        dispatch(setMarkedFoldersAction(id));
    }

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
            settings: {
                startup_launch: false,
                close_previous: false,
                auto_add: false
            },
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

    function handlePopupClose(): void {
        setEditFolderId(null);
        setCreateFolder(false);
        setMergeProcess(null);

        dispatch(clearMarkedFoldersAction());
        dispatch(clearInEditFolder());
    }

    function handleUnmarkAllFolders(): void {
        dispatch(setMarkMultipleFoldersAction([]));
    }

    function handleMarkAllFolders(): void {

            const updatedMarks: Array<number> = [];

            folderCollection.forEach((folder: iFolder) => {
                updatedMarks.push(folder.id);
                
            });

            dispatch(setMarkMultipleFoldersAction([...updatedMarks]));
        
    }

    function handleChangeViewMode(): void {
        const { viewMode } = workspaceSettings;
        
        dispatch(changeWorkspacesViewMode(viewMode === "list" ? "grid" : "list"));
    }

    function handleSortFolders(e: any): void{
        dispatch(setFoldersSortOrder(e.selected === 0 ? "asc" : "desc"));
    }

    function renderFolders(): Array<JSX.Element> {
        let result: Array<JSX.Element> = [];

        function condition(a: iFolder, b: iFolder) {
            const { folderSort } = workspaceSettings
            
            const aNameLowerCase = a.name.toLowerCase();
            const bNameToLowerCase = b.name.toLowerCase();

            return folderSort === "asc" ? (aNameLowerCase > bNameToLowerCase) : (bNameToLowerCase > aNameLowerCase);
        }

        const sortedFolders = [...folderCollection].sort((a: any, b: any) => condition(a, b) ? 1 : -1);

        result = sortedFolders.map((folder: iFolder, i: number) => {
            const collection: Array<number> = workspaceSettings.markedFoldersId;
            return <Folder onDelete={(e) => setRemovalTarget(folder)} marked={collection.find((id) => folder.id === id) ? true : false} onMark={handleMarkFolder} onEdit={() => setEditFolderId(folder.id)} key={folder.id} type={folder.type} id={folder.id} viewMode={folder.viewMode} name={folder.name} desc={folder.desc} settings={folder.settings} windows={folder.windows} />
        });

        return result.length > 0 ? result : [<></>];
    }

    function renderOptionsMenu(): JSX.Element {
        const { markedFoldersId } = workspaceSettings;
        return <>
        
            <div className="mr-4 inline-flex items-center justify-between w-full">
                
                <div className="flex w-7/12">
                    <TextIconButton disabled={false} icon={"selected_checkbox"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Mark all" onClick={handleMarkAllFolders} />
                    <TextIconButton disabled={false} icon={"deselected_checkbox"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Unmark all" onClick={handleUnmarkAllFolders} />
                    <TextIconButton disabled={markedFoldersId.length > 0 ? false : true} icon={"folder_duplicate"} size={{ icon: 20, text: "text-sm" }}  fill={markedFoldersId.length > 0 ? "#6D00C2" : "#9f9f9f"} text="Duplicate" onClick={handleDuplicateFolders} />
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

    function renderMessageBox(): JSX.Element {
        return <>
            <div className="flex flex-col items-center justify-center h-full">
                <Paragraph text="You currently have no folders available. Please, create a new folder or import previous folders." />
                <div className="mt-8">
                    <PrimaryButton disabled={false} text="Import workspaces" onClick={() => setCreateFolder(true)} />
                    <PrimaryButton disabled={false} text="Create workspace" onClick={() => setCreateFolder(true)} />
                </div>
            </div>
        </>
    }

    function hasFolders(): boolean {
        if(folderCollection && folderCollection.length > 0){
            return true;
        }
        return false;
    }

    function decideGridCols(): number {
        const { innerWidth } = window;
        
        if(innerWidth > 1920){
            return 3;
        } else if(innerWidth > 1280){
            return 2;
        } else {
            return 1;
        }
    };

    function handlePrepareMultipleRemovals(): void {
        const { markedFoldersId } = workspaceSettings;
        
        if(markedFoldersId.length > 0) setShowDeleteWarning(true)
    }
    

    return (
        <>
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
            {renderPopup()}
            <div id="workspace-section" className="mb-12">
                <div className="mb-6 mx-auto flex justify-between">
                    <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                        Workspaces
                    </h1>
                </div>
                <div className="flex justify-between bg-white min-h-[350px] px-6 drop-shadow-md">
                    <div className="pt-6 w-full mb-6">
                        {!hasFolders() && renderMessageBox()}
                        {hasFolders() === true && <div className="">
                            {hasFolders() && renderOptionsMenu()}
                            {<div className={`${workspaceSettings.viewMode === "list" ? "mx-auto mt-10" : `grid grid-cols-${decideGridCols()}  grid-flow-dense gap-x-4 gap-y-0 mt-8`}`}>
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