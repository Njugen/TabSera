import { iFolder } from "../../interfaces/folder";
import { CREATE_FOLDER, READ_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, SET_UP_FOLDERS } from "../types/foldersTypes";

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
export {
    createFolderAction,
    readFolderAction,
    updateFolderAction,
    deleteFolderAction,
    setUpFoldersAction
}