import {
  ALL_ROOMS_FETCHED,
  ROOM_DETAILS_FETCHED,
  ROOM_CREATED,
  TOPIC_SUBSCRIBED,
  TOPIC_UNSUBSCRIBED,
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

  // if (type === ENTERED_ROOM) {
  //   return {
  //     ...state,
  //     myRoomId: action.room.id,
  //   };
  // }

  if (type === EXITED_ROOM) {
    return {
      ...state,
      currentRoom: null,
    };
  }

  if (type === USER_ENTERED) {
    const currentRoom = Object.assign({}, state.currentRoom);
    currentRoom.attendees.push(action.attendee);
    return {
      ...state,
      currentRoom,
    };
  }

  if (type === USER_EXITED) {
    if (state.currentRoom == null) return state;
    const currentRoom = Object.assign({}, state.currentRoom);
    const attendees = currentRoom.attendees;
    const index = attendees.indexOf(action.attendee);
    currentRoom.attendees = attendees.splice(index, 1);
    return {
      ...state,
      currentRoom,
    };
  }
  return state;
};
