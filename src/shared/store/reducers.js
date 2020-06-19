import {combineReducers} from 'redux';
import {reducers} from './slices';

const rootReducer = combineReducers(reducers);

export default rootReducer;
