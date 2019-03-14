import axios from "axios";

import {
  GET_ERRORS,
  ROOMS_LOADING,
  ADD_ROOM,
  GET_ROOMS,
  GET_ROOM,
  DELETE_ROOM
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
export const getRooms = () => dispatch => {
  dispatch(setRoomLoading());
  axios
    .get(`/api/rooms/`)
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

//Get rooms  by id property
export const getRoom = id => dispatch => {
  dispatch(setRoomLoading());
  axios
    .get(`/api/rooms/room/${id}`)
    .then(res =>
      dispatch({
        type: GET_ROOM,
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

//Get rooms  by id property
export const bookRoom = data => dispatch => {
  axios
    .put(`/api/properties/booking/${data.id}`, data)
    .then(
      res => console.log(res)
      // dispatch({
      //   type: GET_ROOM,
      //   payload: res.data
      // })
    )
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

//Delete room
export const deleteRoom = id => dispatch => {
  console.log(id);
  axios.delete(`/api/rooms/room/${id}`).then(res =>
    dispatch({
      type: DELETE_ROOM,
      payload: res.data
    })
  );
};

// User loading
export const setRoomLoading = () => {
  return {
    type: ROOMS_LOADING
  };
};
