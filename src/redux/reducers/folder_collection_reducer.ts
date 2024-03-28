import { iFolderItem } from "../../interfaces/folder_item";
import { CREATE_FOLDER, READ_FOLDER, READ_ALL_FOLDERS, UPDATE_FOLDER, DELETE_FOLDER, SET_UP_FOLDERS, READ_ALL_FOLDERS_FROM_BROWSER } from "../types/folder_collection_types";

import { saveToStorage } from "../../services/webex_api/storage";

const folder_collection_state: Array<iFolderItem> = [];

function FolderCollectionReducer(state = folder_collection_state, action: any) {
    const { type, data } = action;

    if(type === SET_UP_FOLDERS){
        return [data]
    } else if(type === CREATE_FOLDER){
        const updatedFolders = [ ...state, data ];
        console.log("create Folder", updatedFolders);
        saveToStorage("local", "folders", updatedFolders);
        return updatedFolders;
    } else if(type === READ_ALL_FOLDERS){
        
        return [
            ...data
        ]
    } else if(type === READ_ALL_FOLDERS_FROM_BROWSER) {
     
       return [
        ...data
       ] 
    } else if(type === READ_FOLDER){
        return state.filter((target) => target.id === data);
    } else if(type === UPDATE_FOLDER){
        const updatedFolders = state.map((item) => {
            if(item.id === data.id){
                console.log("update Folder", item);
           //     saveTo
                return data;
            } else {
                return item;
            }
        });
        saveToStorage("local", "folders", updatedFolders);

        return [
            ...updatedFolders
        ]
    } else if(type === DELETE_FOLDER){
        const updatedFolders = state.filter((target) => target.id !== data)

        if(updatedFolders.length === 0) saveToStorage("local", "folders", []);

        return [
            ...updatedFolders
        ];
    } else {
        return state;
    }
}

export { FolderCollectionReducer }