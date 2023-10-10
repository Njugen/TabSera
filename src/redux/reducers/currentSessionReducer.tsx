import iCurrentSessionState from "../../interfaces/states/currentSessionState";
import { 
    SET_UP_WINDOWS,
    SET_CURRENT_TABS_SORT_ORDER,
    DELETE_MARKED_CURRENT_TABS_ID,
} from "../types/currentSessionSettingsTypes";


const currentSessionSettingsState: iCurrentSessionState = {
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