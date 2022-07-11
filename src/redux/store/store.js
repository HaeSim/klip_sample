
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';
import thunk from 'redux-thunk'

import rootReducer from '../reducers/index';

const middleware = [thunk];
if(process.env.NODE_ENV !== 'production') {
    middleware.push(logger);
}
const store = configureStore({
    reducer: rootReducer,
    middleware: [...middleware],
    devTools: process.env.NODE_ENV !== 'production'
});


export default store;