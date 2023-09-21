import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { FolderCollectionReducer, InEditFolderReducer } from "./reducers/foldersReducers";


const combinedReducers = combineReducers({
    FolderCollectionReducer: FolderCollectionReducer,
    InEditFolderReducer: InEditFolderReducer
});

const middleware = applyMiddleware(thunk);
const store = createStore(combinedReducers, middleware);
store.subscribe(()=>{});
export { store }