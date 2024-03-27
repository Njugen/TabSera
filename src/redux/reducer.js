import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { FolderCollectionReducer } from "./reducers/folderCollectionReducer";
import { InEditFolderReducer } from "./reducers/inEditFolderReducer";
import { WarningActionsReducer } from "./reducers/warningActionsReducer";
import { WorkspaceSettingsReducer } from "./reducers/workspaceSettingsReducer";
import { HistorySettingsReducer } from "./reducers/historySettingsReducer";
import { CurrentSessionSettingsReducer } from "./reducers/currentSessionReducer";
import { MiscReducer } from "./reducers/miscReducer";

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