import iHistoryState from "../../interfaces/states/history_state";
import { 
    SET_MARKED_TABS, 
    SET_MULTIPLE_MARKED_TABS, 
    CLEAR_ALL_MARKED_TABS,
    SET_TABS_SORT_ORDER,
    SET_UP_TABS,

    CHANGE_TABS_VIEWMODE
} from "../types/history_settings_types";

const history_section_state: iHistoryState = {
    tabs: [],
    markedTabs: [],
    tabSortOptionId: 0,
    viewMode: "grid"
}

function HistorySettingsReducer(state = history_section_state, action: any) {
    const { type, data } = action;

    if(type === SET_UP_TABS){
        return {
            ...state,
            tabs: data
        }
    } else if(type === SET_MARKED_TABS){
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
    } else if(type === SET_MULTIPLE_MARKED_TABS){

        return {
            ...state,
            markedTabs: [...data]
        }
    } else if(type === CLEAR_ALL_MARKED_TABS){
        return {
            ...state,
            markedTabs: []
        }
    } else if(type === SET_TABS_SORT_ORDER){

        return {
            ...state,
            tabSortOptionId: data
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