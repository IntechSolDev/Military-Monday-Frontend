import {USER_REG} from '../Types';
export const SAVE_USER = payload => dispatch => {
  dispatch({type: USER_REG, payload});
};

