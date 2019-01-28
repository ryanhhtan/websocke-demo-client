import { STOMP_CLIENT_CONNECTED } from '../actions/stomp';
const initState = {
  stompClient: null,
};

export const stompReducer = (state = initState, action) => {
  const { type } = action;

  if (type === STOMP_CLIENT_CONNECTED) {
    return {
      ...state,
      stompClient: action.stompClient,
    };
  }

  return {
    ...state,
    stompClient: null,
  };
};
