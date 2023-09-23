import { iFolder } from "../../interfaces/folder";
import { iTabItem } from "../../interfaces/tab_item";
import { 
    SET_MARKED_TABS_ID, 
    SET_MULTIPLE_MARKED_TABS_ID, 
    CLEAR_ALL_MARKED_TABS_ID,
    SET_TABS_SORT_ORDER,
    SET_UP_TABS,

    CHANGE_TABS_VIEWMODE
} from "../types/historySettingsTypes";

function setUpTabsAction(input: Array<chrome.history.HistoryItem>){
    return {
        type: SET_UP_TABS,
        data: input
    }
}

function setMarkedTabsAction(input: number){
    return {
        type: SET_MARKED_TABS_ID,
        data: input
    }
}

function setMarkMultipleTabsAction(input: Array<number>){
    return {
        type: SET_MULTIPLE_MARKED_TABS_ID,
        data: input
    }
}

function clearMarkedTabsAction(){
    return {
        type: CLEAR_ALL_MARKED_TABS_ID,
        data: null
    }
}

function setTabsSortOrder(input: string){
    return {
        type: SET_TABS_SORT_ORDER,
        data: input
    }
}

function changeTabsViewMode(input: "list" | "grid"){
    return {
        type: CHANGE_TABS_VIEWMODE,
        data: input
    }
}

export {
    setUpTabsAction,
    setMarkedTabsAction,
    setMarkMultipleTabsAction,
    clearMarkedTabsAction,
    setTabsSortOrder,

    changeTabsViewMode
}