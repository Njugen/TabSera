import { iFolder } from "../../interfaces/folder";
import { 
    SET_UP_WINDOWS,
    SET_MARKED_CURRENT_WINDOWS_ID,
    SET_MARKED_CURRENT_TABS_ID,
    CLEAR_ALL_MARKED,
    SET_CURRENT_SORT_ORDER,
    
    CHANGE_WORKSPACES_VIEWMODE
} from "../types/currentSessionSettingsTypes";
import { saveToStorage } from "../../services/webex_api/storage";
import { iTabItem } from "../../interfaces/tab_item";

const currentSessionSettingsState: {
    windows: Array<chrome.windows.Window>
    markedWindows: Array<chrome.windows.Window>
    markedTabs: Array<chrome.tabs.Tab>,
    windowsSort: string,
    viewMode: "list" | "grid",
} = {
    windows: [],
    markedWindows: [],
    markedTabs: [],
    windowsSort: "asc",
    viewMode: "grid"
}

function CurrentSessionSettingsReducer(state = currentSessionSettingsState, action: any) {
    const { type, data } = action;

    if(type === SET_UP_WINDOWS){
        return {
            ...state,
            windows: data
        }
    } else {
        return state;
    }
}

export { CurrentSessionSettingsReducer }