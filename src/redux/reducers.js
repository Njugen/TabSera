import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { FolderCollectionReducer } from "./reducers/folder_collection_reducer";
import { InEditFolderReducer } from "./reducers/in_edit_folder_reducer";
import { WarningActionsReducer } from "./reducers/warning_actions_reducer";
import { WorkspaceSettingsReducer } from "./reducers/workspace_settings_reducer";
import { HistorySettingsReducer } from "./reducers/history_settings_reducer";
import { CurrentSessionSettingsReducer } from "./reducers/current_session_reducer";
import { MiscReducer } from "./reducers/misc_reducer";

const combinedReducers = combineReducers({
    FolderCollectionReducer: FolderCollectionReducer,
    InEditFolderReducer: InEditFolderReducer,
    WarningActionsReducer: WarningActionsReducer,
    WorkspaceSettingsReducer: WorkspaceSettingsReducer,
    HistorySettingsReducer: HistorySettingsReducer,
    CurrentSessionSettingsReducer: CurrentSessionSettingsReducer,
    MiscReducer: MiscReducer
});

const middleware = applyMiddleware(thunk);
const store = createStore(combinedReducers, middleware);
store.subscribe(()=>{});

const mockStore = () => {
    const middleware = applyMiddleware(thunk);
    const temp = createStore(combinedReducers, middleware);
    temp.subscribe(()=>{});
    return temp;
}

export { store, mockStore, combinedReducers }