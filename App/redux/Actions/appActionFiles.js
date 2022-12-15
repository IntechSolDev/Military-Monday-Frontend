import { SAVE_SEARCH } from '../Types';

export const SAVESEARCH_RESULT = payload => dispatch => {
  dispatch({ type: SAVE_SEARCH, payload });
};

