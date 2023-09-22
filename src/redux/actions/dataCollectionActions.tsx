import { iFolder } from "../../interfaces/folder";
import { SET_MARKED_FOLDERS_ID, 
    SET_MULTIPLE_MARKED_FOLDERS_ID, 
    CLEAR_ALL_MARKED_FOLDERS_ID,
    SET_FOLDERS_SORT_ORDER
} from "../types/dataCollectionTypes";


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

function setFoldersSortOrder(input: string){
    return {
        type: SET_FOLDERS_SORT_ORDER,
        data: input
    }
}

export {
    setMarkedFoldersAction,
    setMarkMultipleFoldersAction,
    clearMarkedFoldersAction,
    setFoldersSortOrder
}