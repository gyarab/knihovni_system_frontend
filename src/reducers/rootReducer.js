import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import bookReducer from "./bookReducer";
import internalReducer from "./internalReducer";

export default combineReducers({
    auth: authReducer,
    books: bookReducer,
    internal: internalReducer,
});