import { iFolder } from "../../interfaces/folder";
import { CREATE_FOLDER, READ_FOLDER, READ_ALL_FOLDERS, UPDATE_FOLDER, DELETE_FOLDER, SET_UP_FOLDERS, READ_ALL_FOLDERS_FROM_BROWSER } from "../types/foldersTypes";

import { saveToStorage } from "../../services/webex_api/storage";

const folderCollectionState: {
    folders: Array<iFolder>
} = {
    folders: [],
}


function FolderCollectionReducer(state = folderCollectionState, action: any) {
    const { type, data } = action;

    if(type === SET_UP_FOLDERS){
        return {
            ...state,
            folders: data
        }
    } else if(type === CREATE_FOLDER){
        const updatedFolders = [ ...state.folders, action.data ];
   
        return {
            ...state,
            folders: updatedFolders
        }
    } else if(type === READ_ALL_FOLDERS){
       
        return {
            ...state,
            folders: data
        }
    } else if(type === READ_ALL_FOLDERS_FROM_BROWSER) {
     
       return {
        ...state,
        folders: data
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

        if(updatedFolders.length === 0) saveToStorage("local", "folders", []);

        return {
            ...state,
            folders: updatedFolders
        };
    } else {
        return state;
    }
}

export { FolderCollectionReducer }