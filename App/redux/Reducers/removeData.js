import {REMOVE_SCREEN_DATA } from '../Types';

const initialState = {
  removedata:false

};
const removeData = (state = initialState, { type, payload }) => {
    console.log("payloaddddd",payload)
  switch (type) {
    case REMOVE_SCREEN_DATA:
      return {
        ...state,
        removedata:payload
      };
      

    default:
      return state;
  }
};

export default removeData;
