import { iFolder } from "../../interfaces/folder";
import { SET_MARKED_FOLDERS_ID, SET_MULTIPLE_MARKED_FOLDERS_ID, CLEAR_ALL_MARKED_FOLDERS_ID } from "../types/dataCollectionTypes";


function setMarkedFoldersAction(input: number){
    return {
        type: SET_MARKED_FOLDERS_ID,
        data: input
    }
}

function setMarkMultipleFoldersAction(input: Array<number>){
    return {
        type: SET_MULTIPLE_MARKED_FOLDERS_ID,
        data: input
    }
}

function clearMarkedFoldersAction(){
    return {
        type: CLEAR_ALL_MARKED_FOLDERS_ID,
        data: null
    }
}

export {
    setMarkedFoldersAction,
    setMarkMultipleFoldersAction,
    clearMarkedFoldersAction
}