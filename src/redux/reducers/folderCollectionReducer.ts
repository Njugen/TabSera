import { iFolder } from "../../interfaces/folder";
import { CREATE_FOLDER, READ_FOLDER, READ_ALL_FOLDERS, UPDATE_FOLDER, DELETE_FOLDER, SET_UP_FOLDERS, READ_ALL_FOLDERS_FROM_BROWSER } from "../types/folderCollectionTypes";

import { saveToStorage } from "../../services/webex_api/storage";

const folderCollectionState: Array<iFolder> = [];

function FolderCollectionReducer(state = folderCollectionState, action: any) {
    const { type, data } = action;

    if(type === SET_UP_FOLDERS){
        return [ data]
    } else if(type === CREATE_FOLDER){
        const updatedFolders = [ ...state, data ];
   
        return updatedFolders
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
                return data;
            } else {
                return item;
            }
        });
        
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