import { iFolder } from "../../interfaces/folder";
import { 
    SET_MARKED_TABS_ID, 
    SET_MULTIPLE_MARKED_TABS_ID, 
    CLEAR_ALL_MARKED_TABS_ID,
    SET_TABS_SORT_ORDER,
    SET_UP_TABS,

    CHANGE_TABS_VIEWMODE
} from "../types/historySettingsTypes";
import { saveToStorage } from "../../services/webex_api/storage";
import { iTabItem } from "../../interfaces/tab_item";

const historySettingsState: {
    tabs: Array<chrome.history.HistoryItem>
    markedTabs: Array<chrome.history.HistoryItem>
    tabsSort: string,
    viewMode: "list" | "grid",
} = {
    tabs: [],
    markedTabs: [],
    tabsSort: "asc",
    viewMode: "grid"
}

function HistorySettingsReducer(state = historySettingsState, action: any) {
    const { type, data } = action;

    if(type === SET_UP_TABS){
        return {
            ...state,
            tabs: data
        }
    } else if(type === SET_MARKED_TABS_ID){
        let currentTabs = state.markedTabs;
        const isMarked = currentTabs.find((tab) => tab.id === data);
        
        if(isMarked){
            currentTabs = currentTabs.filter((tab) => tab.id !== data);
        } else {
            currentTabs.push(data);
        }

        return {
            ...state,
            markedTabs: [...currentTabs]
        }
    } else if(type === SET_MULTIPLE_MARKED_TABS_ID){
        console.log("DDDD", data);
        return {
            ...state,
            markedTabs: [...data]
        }
    } else if(type === CLEAR_ALL_MARKED_TABS_ID){
        return {
            ...state,
            markedTabs: []
        }
    } else if(type === SET_TABS_SORT_ORDER){

        return {
            ...state,
            tabsSort: data
        }
    } else if(type === CHANGE_TABS_VIEWMODE){
        return {
            ...state,
            viewMode: data
        }
    } else {
        return state;
    }
}

export { HistorySettingsReducer }