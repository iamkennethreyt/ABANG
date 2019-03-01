import axios from "axios";

import {
  GET_ERRORS,
  GET_PROPERTIES,
  ADD_PROPERTY,
  PROPERTIES_LOADING,
  GET_OWN_PROPERTIES,
  GET_PROPERTY,
  ROOMS_LOADING,
  ADD_ROOM,
  GET_ROOMS
} from "./types";

// Add Property
export const addRoom = (newData, onSuccess) => dispatch => {
  axios
    .post("/api/rooms", newData)
    .then(res => {
      dispatch(setRoomLoading());
      dispatch({
        type: ADD_ROOM,
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

//Get rooms  by id property
export const getRoomsByProperty = id => dispatch => {
  dispatch(setRoomLoading());
  axios
    .get(`/api/rooms/properties/${id}`)
    .then(res =>
      dispatch({
        type: GET_ROOMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: {},
        payload: {}
      })
    );
};

// User loading
export const setRoomLoading = () => {
  return {
    type: ROOMS_LOADING
  };
};
