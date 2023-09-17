import { iFolder } from "../../interfaces/folder";
import { CREATE_FOLDER, READ_FOLDER, UPDATE_FOLDER, DELETE_FOLDER, SET_UP_FOLDERS } from "../types/foldersTypes";
import { EDIT_FOLDER, UPDATE_IN_EDIT_FOLDER, CLEAR_IN_EDIT_FOLDER, UPDATE_WINDOW_MANAGER } from "../types/inEditFoldersTypes";

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
                [data[0]]: data[1]
            };
        }
  
        return {
            ...temp
        }
    } else if(type === CLEAR_IN_EDIT_FOLDER){
        return {
            ...state,
            inEditFolder: null
        }
    } else if(type === UPDATE_WINDOW_MANAGER){
        if(state === null) return state;

        const temp = {...state};

        if(temp.inEditFolder && data){
            const { windowId, payload } = data; 

            // Look for the window in inEditFolder store. If none, then create it.
            let targetIndex: number | null = null;
            const windowResult = temp.inEditFolder?.windows.filter((target, i) => {
                if(target.id === windowId) targetIndex = i;
                return target.id === windowId
            });
            
            if(windowResult?.length === 0){
                const currentWindowItems = temp.inEditFolder.windows;
                const newWindowItem = {
                    id: windowId,
                    tabs: [payload],
                    initExpand: true
                }
                // window does not exist. Create it and add the tab (payload) into it
                temp.inEditFolder = {
                    ...temp.inEditFolder,
                    windows: [...currentWindowItems, newWindowItem]
                }
                
                return {
                    ...temp
                };
            } else {
     
                // window does exist. Push the tab to target window
               
                if(targetIndex !== null){

                    const tabs = windowResult[0].tabs;
                    
                    // Check whether or not a tab already exists. If it exists, then replace it with the new payload
                    const tabIndex: number = temp.inEditFolder.windows[targetIndex].tabs.findIndex((tab) => tab.id === payload.id);
                    

                    temp.inEditFolder = {
                        ...temp.inEditFolder
                    }
    
                    temp.inEditFolder.windows = [
                        ...temp.inEditFolder.windows
                    ]
    
                    temp.inEditFolder.windows[targetIndex] = {
                        ...temp.inEditFolder.windows[targetIndex]
                    }

                    temp.inEditFolder.windows[targetIndex].tabs = [
                        ...temp.inEditFolder.windows[targetIndex].tabs
                    ]

              

                    
                    if(tabIndex > -1){
                        temp.inEditFolder.windows[targetIndex].tabs[tabIndex] = payload;
                       
                    } else {
                        
                        temp.inEditFolder.windows[targetIndex].tabs.push(payload);
                 
                    }
                    return temp;
                    
                }

                
            }

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