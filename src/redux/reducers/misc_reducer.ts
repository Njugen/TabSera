import { IS_EDITING_TAB } from "../types/in_edit_folders_types";
import { CURRENTLY_EDITING_TAB } from "../types/misc_types";

const misc_states = {
    isEditingTabs: 0,
    currentlyEditingTab: false
}

function MiscReducer(state = misc_states, action: any){
    const { type, data } = action;    

    if(type === IS_EDITING_TAB){
        return {
            ...misc_states,
            isEditingTabs: data
        }
    } else if(type === CURRENTLY_EDITING_TAB){
        return {
            ...misc_states,
            currentlyEditingTab: data
        }
    }

    return state;
}

export {
    MiscReducer
}