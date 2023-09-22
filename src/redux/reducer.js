import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { FolderCollectionReducer } from "./reducers/folderCollectionReducer";
import { InEditFolderReducer } from "./reducers/inEditFolderReducer";
import { WarningActionsReducer } from "./reducers/warningActionsReducer";
import { DataCollectionReducer } from "./reducers/dataCollectionReducer";

const combinedReducers = combineReducers({
    FolderCollectionReducer: FolderCollectionReducer,
    InEditFolderReducer: InEditFolderReducer,
    WarningActionsReducer: WarningActionsReducer,
    DataCollectionReducer: DataCollectionReducer
});

const middleware = applyMiddleware(thunk);
const store = createStore(combinedReducers, middleware);
store.subscribe(()=>{});
export { store }