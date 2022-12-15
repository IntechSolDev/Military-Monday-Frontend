import { SAVE_SEARCH } from '../Types';

const initialState = {
  recentsearch: [],

};
const userSearch = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_SEARCH:
      return {
        ...state,
        recentsearch: [...state.recentsearch, payload]
      };
      

    default:
      return state;
  }
};

export default userSearch;
