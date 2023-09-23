import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { FolderCollectionReducer } from "./reducers/folderCollectionReducer";
import { InEditFolderReducer } from "./reducers/inEditFolderReducer";
import { WarningActionsReducer } from "./reducers/warningActionsReducer";
import { WorkspaceSettingsReducer } from "./reducers/workspaceSettingsReducer";
import { HistorySettingsReducer } from "./reducers/historySettingsReducer";

const combinedReducers = combineReducers({
    FolderCollectionReducer: FolderCollectionReducer,
    InEditFolderReducer: InEditFolderReducer,
    WarningActionsReducer: WarningActionsReducer,
    WorkspaceSettingsReducer: WorkspaceSettingsReducer,
    HistorySettingsReducer: HistorySettingsReducer
});

const middleware = applyMiddleware(thunk);
const store = createStore(combinedReducers, middleware);
store.subscribe(()=>{});
export { store }