import {
  ALL_ROOMS_FETCHED,
  ROOM_DETAILS_FETCHED,
  ROOM_CREATED,
  TOPIC_SUBSCRIBED,
  TOPIC_UNSUBSCRIBED,
  ENTERED_ROOM,
  USER_ENTERED,
  EXITED_ROOM,
  USER_EXITED,
} from '../actions/chat';

const initState = {
  rooms: [],
  currentRoom: null,
  topics: [],
};

export const chatReducer = (state = initState, action) => {
  const { type } = action;

  if (type === TOPIC_SUBSCRIBED) {
    const topics = state.topics.slice();
    topics.push(action.topic);
    return {
      ...state,
      topics,
    };
  }

  if (type === TOPIC_UNSUBSCRIBED) {
    const topics = state.topics.slice();
    const index = topics.indexOf(action.topic);
    if (index >= 0) topics.splice(index, 1);
    return {
      ...state,
      topics,
    };
  }

  if (type === ALL_ROOMS_FETCHED) {
    return {
      ...state,
      rooms: action.rooms,
    };
  }

  if (type === ROOM_DETAILS_FETCHED) {
    return {
      ...state,
      currentRoom: action.room,
    };
  }

  if (type === ROOM_CREATED) {
    const rooms = state.rooms.slice();
    rooms.push(action.room);
    return {
      ...state,
      rooms,
    };
  }

  if (type === ENTERED_ROOM) {
    return {
      ...state,
      myRoomId: action.room.id,
    };
  }

  if (type === EXITED_ROOM) {
    return {
      ...state,
      myRoomId: null,
    };
  }

  if (type === USER_ENTERED) {
    const currentRoom = Object.assign({}, state.currentRoom);
    currentRoom.users.push(action.user);
    return {
      ...state,
      currentRoom,
    };
  }

  if (type === USER_EXITED) {
    const currentRoom = Object.assign({}, state.currentRoom);
    const users = currentRoom.users;
    const index = users.indexOf(action.user);
    currentRoom.users = users.splice(index, 1);
    return {
      ...state,
      currentRoom,
    };
  }
  return state;
};
