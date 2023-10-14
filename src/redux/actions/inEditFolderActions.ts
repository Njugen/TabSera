import { iFolder } from "../../interfaces/folder";
import { iTabItem } from "../../interfaces/tab_item";

import { 
    EDIT_FOLDER, 
    UPDATE_IN_EDIT_FOLDER, 
    CLEAR_IN_EDIT_FOLDER, 
    UPDATE_WINDOW_MANAGER 
} from "../types/inEditFoldersTypes";

    
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
    initInEditFolder,
    updateInEditFolder,
    clearInEditFolder,
    updateWindowManager,
}
