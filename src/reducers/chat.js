import {
  ACTIVE_PANE,
  ALL_ROOMS_FETCHED,
  CHAT_MESSAGE,
  EXITED_ROOM,
  FETCHED_ME,
  ROOM_DETAILS_FETCHED,
  ROOM_CREATED,
  SELECTED_USER,
  TOPIC_SUBSCRIBED,
  TOPIC_UNSUBSCRIBED,
  USER_ENTERED,
  USER_EXITED,
  CONNECTED_LOCAL_MEDIA,
} from '../actions/chat';

import { STOMP_CLIENT_WILL_DISCONNECT } from '../actions/stomp';

const initState = {
  currentRoom: null,
  me: null,
  rooms: [],
  speakingTo: null,
  topics: [],
  userMessages: {},
  roomMessages: {},
  newMessageNotifications: {},
  activePane: 'message',
  localMedia: null,
  remoteMedia: null,
  peerConnection: null,
};

export const chatReducer = (state = initState, action) => {
  const { type } = action;

  if (type === STOMP_CLIENT_WILL_DISCONNECT) return initState;

  if (type === CHAT_MESSAGE) {
    const { to, from } = action.message;
    const newMessageNotifications = { ...state.newMessageNotifications };
    if (typeof to === 'object' && to !== null) {
      const userMessages = { ...state.userMessages };
      if (
        state.speakingTo === null ||
        (from.user.id !== state.me && from.user.id !== state.speakingTo.user.id)
      )
        newMessageNotifications[from.user.id] = true;
      const key = to.user.id === state.me ? from.user.id : to.user.id;
      if (typeof userMessages[key] === 'undefined') {
        userMessages[key] = [];
      }
      userMessages[key].push(action.message);
      return {
        ...state,
        userMessages,
        newMessageNotifications,
      };
    }
    const roomMessages = { ...state.roomMessages };
    const key = state.currentRoom.id;
    if (typeof roomMessages[key] === 'undefined') {
      roomMessages[key] = [];
    }
    if (state.speakingTo !== null) newMessageNotifications.public = true;
    roomMessages[key].push(action.message);
    return {
      ...state,
      newMessageNotifications,
      roomMessages,
    };
  }

  if (type === SELECTED_USER) {
    const userId =
      action.attendee === null ? 'public' : action.attendee.user.id;
    const newMessageNotifications = state.newMessageNotifications;
    delete newMessageNotifications[userId];
    return {
      ...state,
      speakingTo: action.attendee,
      newMessageNotifications,
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
    // const topics = state.topics.slice();
    // topics.push(action.topic);
    const topics = [...state.topics, action.topic];
    return {
      ...state,
      topics,
    };
  }

  if (type === TOPIC_UNSUBSCRIBED) {
    if (action.topic.uri.startsWith('/app')) return state;
    const topics = [...state.topics];
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
    // const rooms = state.rooms.slice();
    // rooms.push(action.room);
    return {
      ...state,
      rooms: [...state.rooms, action.room],
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
    const currentRoom = { ...state.currentRoom };
    currentRoom.attendees.push(action.attendee);
    return {
      ...state,
      currentRoom,
    };
  }

  if (type === USER_EXITED) {
    if (state.currentRoom == null) return state;
    const currentRoom = { ...state.currentRoom };
    const attendees = currentRoom.attendees;
    const index = attendees.indexOf(action.attendee);
    currentRoom.attendees = attendees.splice(index, 1);
    return {
      ...state,
      currentRoom,
    };
  }

  if (type === ACTIVE_PANE) {
    return {
      ...state,
      activePane: action.pane,
    };
  }

  if (type === CONNECTED_LOCAL_MEDIA) {
    return {
      ...state,
      localMedia: action.media,
    };
  }

  // Add more cases before the next line

  return state;
};
