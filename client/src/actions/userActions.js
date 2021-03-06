import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  EDIT_USER,
  USER_LOADING,
  GET_USER
} from "./types";

// Sign up user
export const signup = (userData, history, onSuccess) => dispatch => {
  axios
    .post("/api/users/signup", userData)
    .then(res => {
      onSuccess();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const signin = userData => dispatch => {
  axios
    .post("/api/users/signin", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get user
export const getUser = id => dispatch => {
  dispatch(setUserLoading());
  axios.get(`/api/users/profile/${id}`).then(res => {
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  });
};

//profile settings
export const accountSettings = (newData, history) => dispatch => {
  axios
    .put("/api/users/settings/account", newData)
    .then(res => {
      dispatch({
        type: EDIT_USER,
        payload: res.data
      });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//update password
export const passwordSettings = (data, history) => dispatch => {
  axios
    .put("/api/users/settings/password", data)
    .then(() => {
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const signout = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
