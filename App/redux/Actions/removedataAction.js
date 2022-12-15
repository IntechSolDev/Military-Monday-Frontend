import { REMOVE_SCREEN_DATA } from '../Types';

export const REmovedialdata = payload => dispatch => {
  dispatch({ type: REMOVE_SCREEN_DATA, payload });
};

