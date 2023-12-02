import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { FolderCollectionReducer } from "../../redux/reducers/folderCollectionReducer";
import { InEditFolderReducer } from "../../redux/reducers/inEditFolderReducer";
import { WarningActionsReducer } from "../../redux/reducers/warningActionsReducer";
import { WorkspaceSettingsReducer } from "../../redux/reducers/workspaceSettingsReducer";
import { HistorySettingsReducer } from "../../redux/reducers/historySettingsReducer";
import { CurrentSessionSettingsReducer } from "../../redux/reducers/currentSessionReducer";
import { MiscReducer } from "../../redux/reducers/miscReducer";
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