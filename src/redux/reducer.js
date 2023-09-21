import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { FolderCollectionReducer } from "./reducers/folderCollectionReducer";
import { InEditFolderReducer } from "./reducers/inEditFolderReducer";

const combinedReducers = combineReducers({
    FolderCollectionReducer: FolderCollectionReducer,
    InEditFolderReducer: InEditFolderReducer
});

const middleware = applyMiddleware(thunk);
const store = createStore(combinedReducers, middleware);
store.subscribe(()=>{});
export { store }