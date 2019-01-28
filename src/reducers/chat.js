// import {
//   ROOM_FETCHING,
//   ROOM_FETCH_SUCCEEDED,
//   ROOM_FETCH_FAILED,
// } from '../actions/chat';
const initState = {
  isLoading: false,
  rooms: [],
  inRoom: null,
};

export const chatReducer = (state = initState, action) => {
  const { updateState } = action;

  return {
    ...state,
    ...updateState,
  };
  /*
  const { type } = action;


  if (type === ROOM_FETCHING) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (type === ROOM_FETCH_SUCCEEDED) {
    return {
      ...state,
      isLoading: false,
      rooms: action.rooms,
    };
  }

  if (type === ROOM_FETCH_FAILED) {
    return { ...state, isLoading: false };
  }
  return state;
  */
};
