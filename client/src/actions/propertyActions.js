import axios from "axios";

import {
  GET_ERRORS,
  GET_PROPERTIES,
  ADD_PROPERTY,
  PROPERTIES_LOADING,
  GET_OWN_PROPERTIES,
  GET_PROPERTY
} from "./types";

// Add Property
export const addProperty = (newData, onSuccess) => dispatch => {
  axios
    .post("/api/properties", newData)
    .then(res => {
      dispatch(setPropertyLoading());
      dispatch({
        type: ADD_PROPERTY,
        payload: res.data
      });
      onSuccess();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get all properties
export const getProperties = () => dispatch => {
  dispatch(setPropertyLoading());
  axios
    .get("/api/properties")
    .then(res =>
      dispatch({
        type: GET_PROPERTIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_OWN_PROPERTIES,
        payload: {}
      })
    );
};

//Get all properties
export const getOwnProperties = () => dispatch => {
  dispatch(setPropertyLoading());
  axios
    .get("/api/properties/currentuser")
    .then(res =>
      dispatch({
        type: GET_PROPERTIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_OWN_PROPERTIES,
        payload: {}
      })
    );
};

//Get SINGLE property
export const getProperty = id => dispatch => {
  dispatch(setPropertyLoading());
  axios
    .get(`/api/properties/property/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROPERTY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROPERTY,
        payload: {}
      })
    );
};

//add phone number
export const addNewPhoneNumber = (newData, onSuccess) => dispatch => {
  axios
    .post(`/api/properties/phonenumber/${newData.id}`, newData)
    .then(res => {
      dispatch({
        type: GET_PROPERTY,
        payload: res.data
      });
      onSuccess();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete phone number
export const deleteNewPhoneNumber = newData => dispatch => {
  axios
    .delete(`/api/properties/phonenumber/${newData.id}/${newData._id}`)
    .then(res => {
      dispatch({
        type: GET_PROPERTY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// User loading
export const setPropertyLoading = () => {
  return {
    type: PROPERTIES_LOADING
  };
};
