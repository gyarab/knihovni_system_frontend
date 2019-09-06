import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import bookReducer from "./bookReducer";
import internalReducer from "./internalReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
    auth: authReducer,
    books: bookReducer,
    internal: internalReducer,
    admin: adminReducer
});