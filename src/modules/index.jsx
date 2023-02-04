import { combineReducers } from 'redux';
import auth from './auth';
import todo from './todo';

const reducer = combineReducers({
  auth,
  todo
});

export default reducer;