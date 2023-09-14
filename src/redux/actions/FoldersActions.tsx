import { iFolder } from "../../interfaces/folder";
import { CREATE_FOLDER, READ_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, SET_UP_FOLDERS } from "../types/foldersTypes";
import { EDIT_FOLDER, UPDATE_IN_EDIT_FOLDER, CLEAR_IN_EDIT_FOLDER } from "../types/inEditFoldersTypes";

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

export {
    createFolderAction,
    readFolderAction,
    updateFolderAction,
    deleteFolderAction,
    setUpFoldersAction,

    initInEditFolder,
    updateInEditFolder,
    clearInEditFolder
}