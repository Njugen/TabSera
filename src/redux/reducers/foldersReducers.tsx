import { iWindowItem } from "../../interfaces/window_item";
import { iFolder } from "../../interfaces/folder";
import { CREATE_FOLDER, READ_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, SET_UP_FOLDERS } from "../types/foldersTypes";
import { EDIT_FOLDER, UPDATE_IN_EDIT_FOLDER } from "../types/inEditFoldersTypes";

const initialState: {
    folders: Array<iFolder>
} = {
    folders: [],
}

const initialFolderState: {
    inEditFolder: iFolder | null,
} = {
    inEditFolder: null
}

function InEditFolderReducers(state = initialFolderState, action: any){
    const { type, data } = action;

    if(type === EDIT_FOLDER){
        return {
            ...state,
            inEditFolder: data
        }
    } else if(type === UPDATE_IN_EDIT_FOLDER){
        return {
            ...state,
            inEditFolder: {
                [data.key]: [data.value]
            }
        }
    }
}

function FoldersReducers(state = initialState, action: any) {
    const { type, data } = action;

    if(type === SET_UP_FOLDERS){
        return {
            ...state,
            folders: data
        }
    }
    if(type === CREATE_FOLDER){
        return {
            ...state,
            folders: [ ...state.folders, action.data ]
        }
    } else if(type === READ_FOLDER){
        return state.folders.filter((target) => target.id === data);
    } else if(type === UPDATE_FOLDER){
        return {
            ...state,
            folders: [ ...state.folders, action.data ]
        }
    } else if(type === DELETE_FOLDER){
        const updatedFolders = state.folders.filter((target) => target.id !== data)

        return {
            ...state,
            folders: updatedFolders
        };
    } else {
        return state;
    }
}

export { FoldersReducers, InEditFolderReducers }