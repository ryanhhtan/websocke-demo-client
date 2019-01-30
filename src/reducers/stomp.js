import {
  STOMP_CLIENT_CONNECTED,
  STOMP_CLIENT_DISCONNECTED,
} from '../actions/stomp';
const initState = {
  stompClient: null,
  isConnected: false,
};

export const stompReducer = (state = initState, action) => {
  switch (action.type) {
    case STOMP_CLIENT_CONNECTED:
      return {
        ...state,
        stompClient: action.stompClient,
        isConnected: true,
      };
    case STOMP_CLIENT_DISCONNECTED:
      return {
        ...state,
        stompClient: null,
        isConnected: false,
      };
    default:
      return state;
  }
};
