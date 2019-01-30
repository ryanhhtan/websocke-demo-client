import {
  ROOM_FETCH_SUCCEEDED,
  ROOM_CREATED,
  TOPIC_SUBSCRIBED,
  TOPIC_UNSUBSCRIBED,
  ENTERED_ROOM,
  EXITED_ROOM,
} from '../actions/chat';

const initState = {
  rooms: [],
  topics: [],
  myRoomId: null,
};

export const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case TOPIC_SUBSCRIBED:
      let topics = state.topics.slice();
      topics.push(action.topic);
      return {
        ...state,
        topics,
      };

    case TOPIC_UNSUBSCRIBED:
      topics = state.topics.slice();
      const index = topics.indexOf(action.topic);
      if (index >= 0) topics.splice(index, 1);
      return {
        ...state,
        topics,
      };

    case ROOM_FETCH_SUCCEEDED:
      return {
        ...state,
        rooms: action.rooms,
      };

    case ROOM_CREATED:
      const rooms = state.rooms.slice();
      rooms.push(action.room);
      return {
        ...state,
        rooms,
      };
    case ENTERED_ROOM:
      return {
        ...state,
        myRoomId: action.room.id,
      };
    case EXITED_ROOM:
      return {
        ...state,
        myRoomId: null,
      };
    default:
      return state;
  }
};
