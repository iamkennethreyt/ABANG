import _ from "lodash";

import { SET_CURRENT_USER, USER_LOADING, GET_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  userByID: {},
  currentUser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER:
      return {
        ...state,
        userByID: action.payload,
        loading: false
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
