import { combineReducers } from 'redux';
import authFinancesReducer from "./authFinancesReducer";

export default combineReducers({
    auth: authFinancesReducer,

});