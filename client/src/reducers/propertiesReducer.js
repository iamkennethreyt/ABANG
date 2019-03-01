import {
  PROPERTIES_LOADING,
  ADD_PROPERTY,
  GET_PROPERTIES,
  GET_PROPERTY
} from "../actions/types";

const initialState = {
  loading: false,
  property: {},
  properties: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROPERTIES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROPERTIES:
      return {
        ...state,
        loading: false,
        properties: action.payload
      };
    case GET_PROPERTY:
      return {
        ...state,
        loading: false,
        property: action.payload
      };
    case ADD_PROPERTY:
      return {
        ...state,
        properties: [action.payload, ...state.properties],
        loading: false
      };
    default:
      return state;
  }
}
