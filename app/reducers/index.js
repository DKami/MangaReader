import { combineReducers } from 'redux';
import mangasReducer from './reducer_mangas';
import { routerReducer as routing } from 'react-router-redux';

export default combineReducers({
  mangas: mangasReducer,
  routing
})
