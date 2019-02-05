import {
  ALL_ROOMS_FETCHED,
  EXITED_ROOM,
  FETCHED_ME,
  ROOM_DETAILS_FETCHED,
  ROOM_CREATED,
  SELECTED_USER,
  TOPIC_SUBSCRIBED,
  TOPIC_UNSUBSCRIBED,
  USER_ENTERED,
  USER_EXITED,
} from '../actions/chat';

import { STOMP_CLIENT_WILL_DISCONNECT } from '../actions/stomp';

const initState = {
  currentRoom: null,
  me: null,
  rooms: [],
  speakingTo: null,
  topics: [],
};

export const chatReducer = (state = initState, action) => {
  const { type } = action;

  if (type === STOMP_CLIENT_WILL_DISCONNECT) return initState;

  if (type === SELECTED_USER) {
    return {
      ...state,
      speakingTo: action.attendee,
    };
  }

  if (type === FETCHED_ME) {
    return {
      ...state,
      me: action.me,
    };
  }

  if (type === TOPIC_SUBSCRIBED) {
    if (action.topic.uri.startsWith('/app')) return state;
    const topics = state.topics.slice();
    topics.push(action.topic);
    return {
      ...state,
      topics,
    };
  }

  if (type === TOPIC_UNSUBSCRIBED) {
    if (action.topic.uri.startsWith('/app')) return state;
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

  if (type === EXITED_ROOM) {
    return {
      ...state,
      currentRoom: null,
    };
  }

  if (type === USER_ENTERED) {
    if (state.currentRoom === null) return state;
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
