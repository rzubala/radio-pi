import { GET_CONFIG, SAVE_CONFIG } from "../actions/config";

const initialState = {
  ip: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONFIG:
    case SAVE_CONFIG:
      return {
        ...state,
        ip: action.data
      };
  }
  return state;
};
