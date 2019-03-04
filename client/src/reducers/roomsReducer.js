import {
  ROOMS_LOADING,
  GET_ROOMS,
  ADD_ROOM,
  DELETE_ROOM
} from "../actions/types";

const initialState = {
  loading: false,
  room: {},
  rooms: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ROOMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ROOMS:
      return {
        ...state,
        loading: false,
        rooms: action.payload
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [action.payload, ...state.rooms],
        loading: false
      };
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(room => room._id !== action.payload._id)
      };
    default:
      return state;
  }
}
