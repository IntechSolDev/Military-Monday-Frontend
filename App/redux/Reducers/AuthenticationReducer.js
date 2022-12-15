import {USER_REG} from '../Types';

const initialState = {
  user: null,

};
const AuthenticationReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case USER_REG:
      return {...state, user: payload};
 
    default:
      return state;
  }
};

export default AuthenticationReducer;
