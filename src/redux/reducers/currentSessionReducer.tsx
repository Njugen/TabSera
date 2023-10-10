import { 
    SET_UP_WINDOWS,
    SET_CURRENT_TABS_SORT_ORDER,
    DELETE_MARKED_CURRENT_TABS_ID,
} from "../types/currentSessionSettingsTypes";


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