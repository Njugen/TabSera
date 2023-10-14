import { iFolder } from "../../interfaces/folder";
import { 
    SET_UP_WINDOWS,
    SET_MARKED_CURRENT_WINDOWS_ID,
    SET_MARKED_CURRENT_TABS_ID,
    CLEAR_ALL_MARKED,
    SET_CURRENT_TABS_SORT_ORDER,
    
    CHANGE_WORKSPACES_VIEWMODE
} from "../types/currentSessionSettingsTypes";

function setUpWindowsAction(input: Array<chrome.windows.Window>){
    return {
        type: SET_UP_WINDOWS,
        data: input
    }
}

function setCurrentTabsSortOrder(input: string){
    return {
        type: SET_CURRENT_TABS_SORT_ORDER,
        data: input
    }
}

export {
    setUpWindowsAction,
    setCurrentTabsSortOrder
}