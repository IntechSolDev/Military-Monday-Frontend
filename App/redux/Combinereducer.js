import {combineReducers} from 'redux';
import AuthenticationReducer from './Reducers/AuthenticationReducer';
import appReducer from './Reducers/appReducer';
import removeData from './Reducers/removeData';
const rootReducer = combineReducers({
  AuthenticationReducer,
  appReducer,
  removeData
});

export default rootReducer;
