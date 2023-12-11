import { IS_EDITING_TAB } from "../types/inEditFoldersTypes";
import { CURRENTLY_EDITING_TAB } from "../types/miscTypes";

const miscStates = {
    isEditingTabs: 0,
    currentlyEditingTab: false
}

function MiscReducer(state = miscStates, action: any){
    const { type, data } = action;    

    if(type === IS_EDITING_TAB){
        return {
            ...miscStates,
            isEditingTabs: data
        }
    } else if(type === CURRENTLY_EDITING_TAB){
        return {
            ...miscStates,
            currentlyEditingTab: data
        }
    }

    return state;
}

export {
    MiscReducer
}