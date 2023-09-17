"use client";

import Folder from '../components/folder'
import "./../styles/global_utils.module.scss";
import PrimaryButton from '../components/utils/primary_button';
import Popup from '../components/utils/popup';
import {  useState, useEffect } from "react";

import GenericIconButton from '../components/utils/generic_icon_button';
import * as predef from "../styles/predef";
import { iFolder } from '../interfaces/folder';
import { useDispatch, useSelector } from 'react-redux';
import { setUpFoldersAction, clearInEditFolder } from '../redux/actions/FoldersActions';

function FolderView(props: any) {
    const [editFolderId, setEditFolderId] = useState<number | null>(null);
    const [createFolder, setCreateFolder] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<string>("list");
    const [showSearchField, setShowSearchField] = useState<boolean>(false);

    const dispatch = useDispatch();
    const foldersData = useSelector((state: any) => state.FoldersReducers);

    function handleChangeViewMode(): void {
        setViewMode(viewMode === "list" ? "grid" : "list");
    }

    function handleShowSearchField(): void {
        setShowSearchField(showSearchField === false ? true : false);
    }
   
    
    function handlePopupClose(): void {
        setEditFolderId(null);
        setCreateFolder(false);
        dispatch(clearInEditFolder());

        // Remove inEdit from store
       
    }

    
    function renderPopup(){
        let render;
      
        if(createFolder === true){
            render = <Popup title="Create folder" onClose={handlePopupClose}>test</Popup>;
        } else {
            
            const targetFolder: Array<iFolder> = foldersData.folders.filter((item: iFolder) => editFolderId === item.id);
            const input: iFolder = {...targetFolder[0]};

            if(targetFolder.length > 0){
      
                render = <Popup title={`Edit folder ${targetFolder[0].id}`} folder={input} onClose={handlePopupClose}>test</Popup>;
            } else {
                render = <></>;
            }
            
        }

        return render;
    }

    function renderFolders(): Array<JSX.Element> {
        let result: Array<JSX.Element>  = [];
    
        result = foldersData.folders.map((folder: iFolder, i: number) => <Folder onEdit={() => setEditFolderId(folder.id)} key={folder.id} type={folder.type} id={folder.id} viewMode={folder.viewMode} name={folder.name} desc={folder.desc} settings={folder.settings} windows={folder.windows} />)

        return result.length > 0 ? result : [<></>];
    }


    return (
        <>
            {renderPopup()}
            <div id="folders-view">
                <div className="my-10 mx-auto flex justify-between">
                    <h1 className="text-4xl text-tbfColor-darkpurple font-light inline-block">
                        Folders
                    </h1>
                    <div className="inline-flex items-center">
                        <div className="mr-4 inline-flex items-center">
                            <div className={`w-[300px]`}>
                                <input type="text" defaultValue={"..."} className={`${predef.textfield} float-right transition-all ease-in ${showSearchField === true ? "w-[300px] p-2" : "w-[0px] py-2 px-0 border-0"}`} />
                            </div>
                            <GenericIconButton icon="search" fill={showSearchField === false ? "#6D00C2" : "#b2b2b2"} size={30} onClick={handleShowSearchField} />
                            <GenericIconButton icon={viewMode === "list" ? "grid" : "list"} fill="#6D00C2" size={30} onClick={handleChangeViewMode} />
                        </div>
                        <PrimaryButton text="Create folder" onClick={() => setCreateFolder(true)} />
                    </div>
                </div>
                <div className={viewMode === "list" ? "mx-auto" : "grid grid-cols-2 grid-flow-dense gap-x-4 gap-y-0"}>
                    {renderFolders()}
                </div>
            </div>
        </>
    );
}

export default FolderView;