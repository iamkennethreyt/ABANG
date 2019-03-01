import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import usersReducer from "./usersReducer";
import propertiesReducer from "./propertiesReducer";
import roomsReducer from "./roomsReducer";

export default combineReducers({
  errors: errorReducer,
  users: usersReducer,
  properties: propertiesReducer,
  rooms: roomsReducer
});
