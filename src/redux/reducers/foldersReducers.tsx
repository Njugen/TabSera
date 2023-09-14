import { iWindowItem } from "../../interfaces/window_item";
import { iFolder } from "../../interfaces/folder";
import { CREATE_FOLDER, READ_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, SET_UP_FOLDERS } from "../types/foldersTypes";
import { EDIT_FOLDER, UPDATE_IN_EDIT_FOLDER, CLEAR_IN_EDIT_FOLDER } from "../types/inEditFoldersTypes";

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
        const temp = state;
        if(temp.inEditFolder && data){
            temp.inEditFolder = {
                ...temp.inEditFolder,
                [data[0]] : data[1]
            };
        }
        return {
            ...temp
        }
    } else if(type === CLEAR_IN_EDIT_FOLDER){
        return {
            inEditFolder: null
        }
    }
    
    return state;
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
        const updatedFolders = state.folders.map((item) => {
            if(item.id === data.id){
                return data;
            } else {
                return item;
            }
        });
        return {
            ...state,
            folders: updatedFolders
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