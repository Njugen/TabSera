import { iFolder } from "../../interfaces/folder";
import { CREATE_FOLDER, READ_FOLDER, READ_ALL_FOLDERS, UPDATE_FOLDER, DELETE_FOLDER, SET_UP_FOLDERS, READ_ALL_FOLDERS_FROM_BROWSER } from "../types/foldersTypes";
import { EDIT_FOLDER, UPDATE_IN_EDIT_FOLDER, CLEAR_IN_EDIT_FOLDER, UPDATE_WINDOW_MANAGER } from "../types/inEditFoldersTypes";

import { saveToStorage } from "../../services/webex_api/storage";

const folderCollectionState: {
    folders: Array<iFolder>
} = {
    folders: [],
}

const inEditFolderState: {
    inEditFolder: iFolder | null,
} = {
    inEditFolder: null
}

function InEditFolderReducer(state = inEditFolderState, action: any){
    const { type, data } = action;

    if(type === EDIT_FOLDER){
        return {
            ...state,
            inEditFolder: data
        }
    } else if(type === UPDATE_IN_EDIT_FOLDER){
        const stateClone = { ...state };

        if(stateClone.inEditFolder && data){
            stateClone.inEditFolder = {
                ...stateClone.inEditFolder,
                [data[0]]: data[1]
            };
        }
  
        return {
            ...stateClone
        }
    } else if(type === CLEAR_IN_EDIT_FOLDER){
        return {
            ...state,
            inEditFolder: null
        }
    } else if(type === UPDATE_WINDOW_MANAGER){
        if(state === null) return state;

        const stateClone = { ...state };

        if(stateClone.inEditFolder && data){
            const { windowId, payload } = data; 

            // Look for the window in inEditFolder store. If none, then create it.
            let targetIndex: number | null = null;
            const windowResult = stateClone.inEditFolder?.windows.filter((target, i) => {
                if(target.id === windowId) targetIndex = i;
                return target.id === windowId
            });
            
            if(windowResult?.length === 0){
                const currentWindowItems = stateClone.inEditFolder.windows;
                const newWindowItem = {
                    id: windowId,
                    tabs: [payload],
                    initExpand: true
                }
                // window does not exist. Create it and add the tab (payload) into it
                stateClone.inEditFolder = {
                    ...stateClone.inEditFolder,
                    windows: [...currentWindowItems, newWindowItem]
                }
                
                return {
                    ...stateClone
                };
            } else {
     
                // window does exist. Push the tab to target window
               
                if(targetIndex !== null){

                    const tabs = windowResult[0].tabs;
                    
                    // Check whether or not a tab already exists. If it exists, then replace it with the new payload
                    const tabIndex: number = stateClone.inEditFolder.windows[targetIndex].tabs.findIndex((tab) => tab.id === payload.id);
                    

                    stateClone.inEditFolder = {
                        ...stateClone.inEditFolder
                    }
    
                    stateClone.inEditFolder.windows = [
                        ...stateClone.inEditFolder.windows
                    ]
    
                    stateClone.inEditFolder.windows[targetIndex] = {
                        ...stateClone.inEditFolder.windows[targetIndex]
                    }

                    stateClone.inEditFolder.windows[targetIndex].tabs = [
                        ...stateClone.inEditFolder.windows[targetIndex].tabs
                    ];

                    if(tabIndex > -1){
                        stateClone.inEditFolder.windows[targetIndex].tabs[tabIndex] = payload;               
                    } else {
                        stateClone.inEditFolder.windows[targetIndex].tabs.push(payload);
                    }

                    return stateClone;
                    
                }

                
            }

        }
    }
    
    return state;
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

export { FolderCollectionReducer, InEditFolderReducer }