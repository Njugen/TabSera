import { iFolder } from "../../interfaces/folder";
import { iTabItem } from "../../interfaces/tab_item";
import { 
    CREATE_FOLDER, 
    READ_FOLDER, 
    READ_ALL_FOLDERS, 
    UPDATE_FOLDER, 
    DELETE_FOLDER, 
    SET_UP_FOLDERS, 
    READ_ALL_FOLDERS_FROM_BROWSER} from "../types/foldersTypes";

import { 
    EDIT_FOLDER, 
    UPDATE_IN_EDIT_FOLDER, 
    CLEAR_IN_EDIT_FOLDER, 
    UPDATE_WINDOW_MANAGER } from "../types/inEditFoldersTypes";



function createFolderAction(folder: iFolder){
    return {
        type: CREATE_FOLDER,
        data: folder
    }
}

function readFolderAction(id: number){
    return {
        type: READ_FOLDER,
        data: id
    }
}

function updateFolderAction(folder: iFolder){
    return {
        type: UPDATE_FOLDER,
        data: folder
    }
}

function deleteFolderAction(id: number){
    return {
        type: DELETE_FOLDER,
        data: id
    }
}

function setUpFoldersAction(folder: Array<iFolder>){
    return {
        type: SET_UP_FOLDERS,
        data: folder
    }
}

// ASYNC

function readAllFoldersFromBrowserAction(payload: any){
    return {
        type: READ_ALL_FOLDERS_FROM_BROWSER,
        data: payload
    }
}

///////////////

function initInEditFolder(folder: iFolder) {
    return {
        type: EDIT_FOLDER,
        data: folder
    }
}

function updateInEditFolder(key: string, value: any){
    return {
        type: UPDATE_IN_EDIT_FOLDER,
        data: [key, value]
    }
}

function clearInEditFolder(){
    return {
        type: CLEAR_IN_EDIT_FOLDER,
        data: null
    }
}

function updateWindowManager(windowId: number, payload: iTabItem){
    return {
        type: UPDATE_WINDOW_MANAGER,
        data: { windowId, payload }
    }
}

export {
    createFolderAction,
    readFolderAction,
    readAllFoldersFromBrowserAction,
    updateFolderAction,
    deleteFolderAction,
    setUpFoldersAction,

    initInEditFolder,
    updateInEditFolder,
    clearInEditFolder,
    updateWindowManager,
}