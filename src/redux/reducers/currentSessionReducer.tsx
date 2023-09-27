import { iFolder } from "../../interfaces/folder";
import { 
    SET_UP_WINDOWS,
    SET_MARKED_CURRENT_WINDOWS_ID,
    SET_MARKED_CURRENT_TABS_ID,
    CLEAR_ALL_MARKED,
    SET_CURRENT_TABS_SORT_ORDER,
    DELETE_MARKED_CURRENT_TABS_ID,
    
    CHANGE_WORKSPACES_VIEWMODE
} from "../types/currentSessionSettingsTypes";
import { saveToStorage } from "../../services/webex_api/storage";
import { iTabItem } from "../../interfaces/tab_item";

const currentSessionSettingsState: {
    windows: Array<chrome.windows.Window>
    markedWindows: Array<chrome.windows.Window>
    markedTabs: Array<chrome.tabs.Tab>,
    tabsSort: string,
    viewMode: "list" | "grid",
} = {
    windows: [],
    markedWindows: [],
    markedTabs: [],
    tabsSort: "asc",
    viewMode: "grid"
}

function CurrentSessionSettingsReducer(state = currentSessionSettingsState, action: any) {
    const { type, data } = action;

    if(type === SET_UP_WINDOWS){
        return {
            ...state,
            windows: data
        }
    } else if(type === SET_CURRENT_TABS_SORT_ORDER) {
        return {
            ...state,
            tabsSort: data
        }
    } else if(type === DELETE_MARKED_CURRENT_TABS_ID){

    } else {
        return state;
    }
}

export { CurrentSessionSettingsReducer }