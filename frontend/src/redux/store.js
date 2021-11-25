import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers';

const rootReducer = combineReducers({ authReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));
