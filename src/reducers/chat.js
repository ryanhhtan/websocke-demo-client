import {
  ROOM_FETCH_SUCCEEDED,
  ROOM_CREATED,
  TOPIC_SUBSCRIBED,
  TOPIC_UNSUBSCRIBED,
} from '../actions/chat';

const initState = {
  rooms: [],
  subscriptions: [],
  myRoomId: null,
};

export const chatReducer = (state = initState, action) => {
  switch (action.type) {
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
    case TOPIC_SUBSCRIBED:
      let subscriptions = state.subscriptions.slice();
      subscriptions.push(action.topic);
      return {
        ...state,
        subscriptions,
      };
    case TOPIC_UNSUBSCRIBED:
      subscriptions = state.subscriptions.slice();
      const index = subscriptions.indexOf(action.topic);
      subscriptions.splice(index, 1);

      return {
        ...state,
        subscriptions,
      };

    default:
      return state;
  }
};
