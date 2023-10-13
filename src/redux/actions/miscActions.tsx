import { 
    IS_EDITING_TAB
} from "../types/miscTypes";

function setTabInEdits(value: number){
    return {
        type: IS_EDITING_TAB,
        data: value
    }
}

export {
    setTabInEdits
}