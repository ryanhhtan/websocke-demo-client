import {
  STOMP_CLIENT_CONNECTED,
  STOMP_CLIENT_DISCONNECTED,
} from '../actions/stomp';
const initState = {
  stompClient: null,
};

export const stompReducer = (state = initState, action) => {
  switch (action.type) {
    case STOMP_CLIENT_CONNECTED:
      return {
        ...state,
        stompClient: action.stompClient,
      };
    case STOMP_CLIENT_DISCONNECTED:
      return {
        ...state,
        stompClient: null,
      };
    default:
      return state;
  }
};
