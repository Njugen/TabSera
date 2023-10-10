import { 
    SET_MARKED_WORKSPACES_ID, 
    SET_MULTIPLE_MARKED_WORKSPACES_ID, 
    CLEAR_ALL_MARKED_WORKSPACES_ID, 
    SET_WORKSPACES_SORT_ORDER,
    
    CHANGE_WORKSPACES_VIEWMODE
} from "../types/workspaceSettingsTypes";

const workspaceSettingsState: {
    markedFoldersId: Array<number>
    folderSort: string,
    viewMode: "list" | "grid",
} = {
    markedFoldersId: [],
    folderSort: "asc",
    viewMode: "grid"
}

function WorkspaceSettingsReducer(state = workspaceSettingsState, action: any) {
    const { type, data } = action;

    if(type === SET_MARKED_WORKSPACES_ID){
        let currentFoldersId: Array<number> = state.markedFoldersId;
        const isMarked: number | undefined = currentFoldersId.find((id) => id === data);
        
        if(isMarked){
            currentFoldersId = currentFoldersId.filter((id) => id !== data);
        } else {
            currentFoldersId.push(data);
        }

        return {
            ...state,
            markedFoldersId: [...currentFoldersId]
        }
    } else if(type === SET_MULTIPLE_MARKED_WORKSPACES_ID){
        return {
            ...state,
            markedFoldersId: data
        }
    } else if(type === CLEAR_ALL_MARKED_WORKSPACES_ID){
        return {
            ...state,
            markedFoldersId: []
        }
    } else if(type === SET_WORKSPACES_SORT_ORDER){
        return {
            ...state,
            folderSort: data
        }
    } else if(type === CHANGE_WORKSPACES_VIEWMODE){
        return {
            ...state,
            viewMode: data
        }
    } else {
        return state;
    }
}

export { WorkspaceSettingsReducer }