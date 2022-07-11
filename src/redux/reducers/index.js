import { combineReducers } from "@reduxjs/toolkit";
import wallet from './wallet'

const rootReducer = combineReducers({
    wallet,
});

export default rootReducer;