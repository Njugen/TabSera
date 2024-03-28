import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { FolderCollectionReducer } from "../../redux/reducers/folder_collection_reducer";
import { InEditFolderReducer } from "../../redux/reducers/in_edit_folder_reducer";
import { WarningActionsReducer } from "../../redux/reducers/warning_actions_reducer";
import { WorkspaceSettingsReducer } from "../../redux/reducers/workspace_settings_reducer";
import { HistorySettingsReducer } from "../../redux/reducers/history_settings_reducer";
import { CurrentSessionSettingsReducer } from "../../redux/reducers/current_session_reducer";
import { MiscReducer } from "../../redux/reducers/misc_reducer";
import { configureStore } from "@reduxjs/toolkit";

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
export { store }