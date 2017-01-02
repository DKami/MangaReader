import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from '../reducers';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

const router = routerMiddleware(hashHistory)

export default createStore(combinedReducers, {}, applyMiddleware(thunk, router));
