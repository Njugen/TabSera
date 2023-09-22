import { iFolder } from "../../interfaces/folder";
import { SET_MARKED_FOLDERS_ID, SET_MULTIPLE_MARKED_FOLDERS_ID, CLEAR_ALL_MARKED_FOLDERS_ID } from "../types/dataCollectionTypes";
import { saveToStorage } from "../../services/webex_api/storage";

const dataCollectionState: {
    markedFoldersId: Array<number>
} = {
    markedFoldersId: []
}

function DataCollectionReducer(state = dataCollectionState, action: any) {
    const { type, data } = action;

    if(type === SET_MARKED_FOLDERS_ID){
        console.log("AAA", data);
        let currentFoldersId: Array<number> = state.markedFoldersId;
        console.log("CCCC", currentFoldersId);
        const isMarked: number | undefined = currentFoldersId.find((id) => data);
        
        if(isMarked){
            currentFoldersId = currentFoldersId.filter((id) => id !== data);
        } else {
            currentFoldersId.push(data);
        }

        return {
            ...state,
            markedFoldersId: [...currentFoldersId]
        }
    } else if(type === SET_MULTIPLE_MARKED_FOLDERS_ID){
        console.log("BBBB", data);
        return {
            ...state,
            markedFoldersId: data
        }
    } else if(type === CLEAR_ALL_MARKED_FOLDERS_ID){
        return {
            ...state,
            markedFoldersId: []
        }
    } else {
        return state;
    }
}

export { DataCollectionReducer }