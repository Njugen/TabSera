import { iFolder } from "../../interfaces/folder";
import { 
    SET_MARKED_FOLDERS_ID, 
    SET_MULTIPLE_MARKED_FOLDERS_ID, 
    CLEAR_ALL_MARKED_FOLDERS_ID, 
    SET_FOLDERS_SORT_ORDER } from "../types/dataCollectionTypes";
import { saveToStorage } from "../../services/webex_api/storage";

const dataCollectionState: {
    markedFoldersId: Array<number>
    folderSort: string
} = {
    markedFoldersId: [],
    folderSort: "asc"
}

function DataCollectionReducer(state = dataCollectionState, action: any) {
    const { type, data } = action;

    if(type === SET_MARKED_FOLDERS_ID){
        let currentFoldersId: Array<number> = state.markedFoldersId;
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
        return {
            ...state,
            markedFoldersId: data
        }
    } else if(type === CLEAR_ALL_MARKED_FOLDERS_ID){
        return {
            ...state,
            markedFoldersId: []
        }
    } else if(type === SET_FOLDERS_SORT_ORDER){
        return {
            ...state,
            folderSort: data
        }
    } else {
        return state;
    }
}

export { DataCollectionReducer }