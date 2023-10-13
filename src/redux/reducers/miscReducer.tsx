import { IS_EDITING_TAB } from "../types/inEditFoldersTypes";

const miscStates = {
    isEditingTabs: 0
}

function MiscReducer(state = miscStates, action: any){
    const { type, data } = action;    

    if(type === IS_EDITING_TAB){
        return {
            ...miscStates,
            isEditingTabs: data
        }
    }

    return state;
}

export {
    MiscReducer
}