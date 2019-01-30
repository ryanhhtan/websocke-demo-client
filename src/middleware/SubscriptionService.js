import {
  // handleChatEvent,
  topicSubscribedAction,
  topicUnsubscribedAction,
} from '../actions/chat.js';

import {
  STOMP_CLIENT_TO_BE_DISCONNECTED,
  stompClientDisconnectedAction,
} from '../actions/stomp.js';

export const TOPIC_SUBSCRIBE = 'TOPIC_SUBSCRIBE';
export const TOPIC_UNSUBSCRIBE = 'TOPIC_UNSUBSCRIBE';

export const subscriptionService = ({
  getState,
  dispatch,
}) => next => action => {
  console.log('subscription middleware trigered.');
  // console.log(getState());
  const { stompClient } = getState().stompReducer;
  switch (action.type) {
    case TOPIC_SUBSCRIBE:
      const { topic, handler } = action;
      stompClient.subscribe(topic, data => handler(dispatch, data));
      dispatch(topicSubscribedAction(action.topic));
      break;
    case TOPIC_UNSUBSCRIBE:
      stompClient.unsubscribe(action.topic);
      dispatch(topicUnsubscribedAction(action.topic));
      break;
    case STOMP_CLIENT_TO_BE_DISCONNECTED:
      const { topics } = getState().chatReducer;
      topics.forEach(topic => stompClient.unsubscribe(topic));
      stompClient.deactivate();
      dispatch(stompClientDisconnectedAction);
      break;

    default:
      break;
  }
  next(action);
};
