import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  errors: errorReducer,
  users: usersReducer
});
