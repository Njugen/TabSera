"use client";

import Folder from '../components/folder'
import "./../styles/global_utils.module.scss";
import PrimaryButton from '../components/utils/primary_button';
import Popup from '../components/utils/popup';
import { useEffect, useState } from "react";

import GenericIconButton from '../components/utils/generic_icon_button';
import * as predef from "../styles/predef";
import { iFolder } from '../interfaces/folder';
import { useDispatch, useSelector } from 'react-redux';
import { clearInEditFolder  } from '../redux/actions/inEditFolderActions';
import {  createFolderAction, readAllFoldersFromBrowserAction } from '../redux/actions/folderCollectionActions';
import Paragraph from '../components/utils/paragraph';
import { deleteFolderAction } from "../redux/actions/folderCollectionActions";
import { saveToStorage, getFromStorage } from '../services/webex_api/storage';
import MessageBox from '../components/utils/message_box';
import GreyBorderButton from '../components/utils/grey_border_button';
import TextIconButton from '../components/utils/text_icon_button';
import randomNumber from '../tools/random_number';
import { iWindowItem } from '../interfaces/window_item';

function FolderView(props: any): JSX.Element {
    const [editFolderId, setEditFolderId] = useState<number | null>(null);
    const [createFolder, setCreateFolder] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<string>("grid");
    const [showSearchField, setShowSearchField] = useState<boolean>(true);
    const [ removalTarget, setRemovalTarget] = useState<iFolder | null>(null);
    const [markedFoldersId, setMarkedFoldersId] = useState<Array<number> | null>(null);
    const [mergeProcess, setMergeProcess] = useState<iFolder | null>(null);
    const dispatch = useDispatch();
    const foldersData = useSelector((state: any) => state.FolderCollectionReducer);


    useEffect(() => {
        getFromStorage("local", "folders", (data) => {  

            dispatch(readAllFoldersFromBrowserAction(data.folders));
        })
        //readAllFoldersFromBrowser();
    }, []);

    function handleMarkFolder(id: number): void{

        const currentMarkedFoldersId = markedFoldersId === null ? [] : markedFoldersId;
        const targetIndex: number = currentMarkedFoldersId.findIndex((targetId: number) => targetId === id);
     
        if(targetIndex === -1){
            const updatedMarks: Array<number> = currentMarkedFoldersId;
            updatedMarks.push(id);

            setMarkedFoldersId([...updatedMarks]);
        } else {
            const updatedFoldersId = currentMarkedFoldersId.filter((targetId: number) => targetId !== id);

            setMarkedFoldersId([...updatedFoldersId]);
        }
    }

    function handleMergeFolders(): void {
        const newId = randomNumber();

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

        if(foldersData && markedFoldersId){
            const mergedWindows: Array<iWindowItem> = [];
            markedFoldersId.forEach((targetId: number) => {
                const markedFolderIndex = foldersData.findIndex((folder: iFolder) => targetId === folder.id);

                if(markedFolderIndex > -1){
                    mergedWindows.push(...foldersData[markedFolderIndex].windows);
                }
            });
            payload.windows = [...mergedWindows];
            setMergeProcess({...payload});
            setMarkedFoldersId(null);
        }
    }

    function handleMarkAllFolders(): void {

            const updatedMarks: Array<number> = [];

            foldersData.forEach((folder: iFolder) => {
                updatedMarks.push(folder.id);
                
            });
            setMarkedFoldersId([...updatedMarks]);
            
        
    }
    

    function handleDeleteFolders(): void {
        if(foldersData && markedFoldersId){
            markedFoldersId.forEach((targetId: number) => {
                const markedFolderIndex = foldersData.findIndex((folder: iFolder) => targetId === folder.id);

                if(markedFolderIndex > -1){
                    dispatch(deleteFolderAction(foldersData[markedFolderIndex].id));
                    
                }
            });
            setMarkedFoldersId(null);
        }
    }

    function handleDuplicateFolders(): void {
        if(foldersData && markedFoldersId){
            markedFoldersId.forEach((targetId: number) => {
                const markedFolderIndex = foldersData.findIndex((folder: iFolder) => targetId === folder.id);

                if(markedFolderIndex > -1){
                    const newFolder: iFolder = {...foldersData[markedFolderIndex]};

                  
                    newFolder.id = randomNumber();
                    newFolder.name = newFolder.name + " (duplicate)";

                    dispatch(createFolderAction({...newFolder}));
                }
            });
            setMarkedFoldersId(null);
        }
    }

    function handleChangeViewMode(): void {
        setViewMode(viewMode === "list" ? "grid" : "list");
    }

    function handleShowSearchField(): void {
        setShowSearchField(showSearchField === false ? true : false);
    }

    function handlePopupClose(): void {
        setEditFolderId(null);
        setCreateFolder(false);
        setMergeProcess(null);

        dispatch(clearInEditFolder());
    }
    
    useEffect(() => {
        
        if(foldersData.length > 0){
            saveToStorage("local", "folders", foldersData);
        } 
    }, [foldersData]);

    function renderPopup(): JSX.Element {
        let render;

        if(createFolder === true){
            render = <Popup title="Create workspace" onClose={handlePopupClose}>test</Popup>;
        } else {

            if(mergeProcess !== null){
                return <Popup title={`Create folder by merge`} folder={mergeProcess} onClose={handlePopupClose}>test</Popup>
            } else {
                const targetFolder: Array<iFolder> = foldersData.filter((item: iFolder) => editFolderId === item.id);
                const input: iFolder = {...targetFolder[0]};

                if(targetFolder.length > 0){
                    render = <Popup title={`Edit folder ${targetFolder[0].id}`} folder={input} onClose={handlePopupClose}>test</Popup>;
                } else {
                    render = <></>;
                }
            }
            
        }

        return render;
    }

    function renderFolders(): Array<JSX.Element> {
        let result: Array<JSX.Element> = [];
        result = foldersData.map((folder: iFolder, i: number) => {
            return <Folder onDelete={(e) => setRemovalTarget(folder)} marked={markedFoldersId?.find((id) => folder.id === id) ? true : false} onMark={handleMarkFolder} onEdit={() => setEditFolderId(folder.id)} key={folder.id} type={folder.type} id={folder.id} viewMode={folder.viewMode} name={folder.name} desc={folder.desc} settings={folder.settings} windows={folder.windows} />
        });

        return result.length > 0 ? result : [<></>];
    }

    function renderPageOptionsMenu(): JSX.Element {
        return <>
            <div className="inline-flex items-center">
                <div className="mr-4 inline-flex items-center">
                    <div className={`mr-6`}>
                        {/*<input type="text" defaultValue={"..."} className={`${predef.textfield}  transition-all ease-in ${showSearchField === true ? "w-[450px] p-2" : "w-[0px] py-2 px-0 border-0"}`} />*/}
                        {/*<input className="p-2 bg-white drop-shadow-sm border border-tbfColor-lightgrey" />*/}
                    
                        {/*<GenericIconButton icon="search" fill={showSearchField === false ? "#6D00C2" : "#b2b2b2"} size={30} onClick={handleShowSearchField} />*/}
                    </div>
                    <div className="mr-12 flex">
                        <strong className="mr-2">Actions:</strong>
                        <TextIconButton icon={"close"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Mark all" onClick={handleMarkAllFolders} />
                        <TextIconButton icon={"close"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Duplicate" onClick={handleDuplicateFolders} />
                        <TextIconButton icon={"close"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Merge" onClick={handleMergeFolders} />
                        <TextIconButton icon={"close"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text="Delete" onClick={handleDeleteFolders} />
                    </div>
                    <div className="flex">
                        <strong className="mr-2">Viewport:</strong>
                        <TextIconButton icon={"close"} size={{ icon: 20, text: "text-sm" }} fill="#6D00C2" text="Sort" onClick={() => {}} />
                        <TextIconButton icon={viewMode === "list" ? "grid" : "list"} size={{ icon: 20, text: "text-sm" }}  fill="#6D00C2" text={viewMode === "list" ? "Grid" : "List"} onClick={handleChangeViewMode} />
                    </div>
                </div>
                <PrimaryButton text="Create workspace" onClick={() => setCreateFolder(true)} />
            </div>
        </>
    }

    function renderMessageBox(): JSX.Element {
        return <>
            <div className="flex flex-col items-center justify-center h-[83.3333333vh]">
                <Paragraph text="You currently have no folders available. Please, create a new folder or import previous folders." />
                <div className="mt-8">
                    <PrimaryButton text="Import workspaces" onClick={() => setCreateFolder(true)} />
                    <PrimaryButton text="Create workspace" onClick={() => setCreateFolder(true)} />
                </div>
            </div>
        </>
    }

    function hasFolders(): boolean {
        if(foldersData && foldersData.length > 0){
            return true;
        }
        return false;
    }

    function decideGridCols(): number {
        const { innerWidth } = window;
        
        if(innerWidth > 1920){
            return 4;
        } else if(innerWidth > 1280){
            return 3;
        } else {
            return 2;
        }
    };

    return (
        <>
            {removalTarget && 
                <MessageBox 
                    title="Warning" 
                    text={`You are about to remove the "${removalTarget.name}" folder and all its contents. This is irreversible, do you want to proceed?`}
                    primaryButton={{ text: "Yes, remove this folder", callback: () => { dispatch(deleteFolderAction(removalTarget.id)); setRemovalTarget(null)}}}
                    secondaryButton={{ text: "No, don't remove", callback: () => setRemovalTarget(null)}}    
                />
            }
            {renderPopup()}
            <div id="folders-view">
                <div className="mb-6 mx-auto flex justify-between">
                    <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                        Workspaces
                    </h1>
                    {hasFolders() && renderPageOptionsMenu()}
                </div>
                {!hasFolders() && renderMessageBox()}
                {hasFolders() === true && <div className="bg-white p-6 drop-shadow-md min-h-[83.33333333333vh]">
                    
                    {<div className={`${viewMode === "list" ? "mx-auto" : `grid grid-cols-${decideGridCols()} grid-flow-dense gap-x-4 gap-y-0`}`}>
                        {renderFolders()}
                    </div>}
                </div>}
            </div>
        </>
    );
}

export default FolderView;