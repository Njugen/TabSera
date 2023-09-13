import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { FoldersReducers, InEditFolderReducers } from "./reducers/foldersReducers";

const combinedReducers = combineReducers({
    FoldersReducers: FoldersReducers,
    InEditFolderReducers: InEditFolderReducers
});

const middleware = applyMiddleware(thunk);
const store = createStore(combinedReducers, middleware);

export { store }