import {
  // handleChatEvent,
  topicSubscribedAction,
  topicUnsubscribedAction,
} from '../actions/chat.js';

import {
  STOMP_CLIENT_TO_DISCONNECT,
  stompClientDisconnectedAction,
} from '../actions/stomp.js';

export const TO_SUBSCRIBE_TOPIC = 'TO_SUBSCRIBE_TOPIC';
export const TO_UNSUBSCRIBE_TOPIC = 'TO_UNSUBSCRIBE_TOPIC';
export const TO_PUBLISH = 'TO_PUBLISH';

export const subscriptionService = ({
  getState,
  dispatch,
}) => next => action => {
  console.log('subscription middleware trigered.');
  // console.log(getState());
  const { stompClient } = getState().stompReducer;
  const { topics } = getState().chatReducer;
  const { type } = action;

  if (type === TO_SUBSCRIBE_TOPIC) {
    const { topic, handler } = action;
    topic.subscription = stompClient.subscribe(topic.uri, data =>
      handler(dispatch, data),
    );

    // console.log(result);
    dispatch(topicSubscribedAction(topic));
  }

  if (type === TO_UNSUBSCRIBE_TOPIC) {
    if (topics.length === 0) next(action);
    const { topicUri } = action;
    const topic = topics.filter(topic => topic.uri === topicUri)[0];
    console.log('To unsubscribe topic: ');
    console.log(topic);
    topic.subscription.unsubscribe();
    dispatch(topicUnsubscribedAction(topic));
  }

  if (type === TO_PUBLISH) {
    stompClient.publish(action.data);
  }

  if (type === STOMP_CLIENT_TO_DISCONNECT) {
    const { topics } = getState().chatReducer;
    topics.forEach(topic => stompClient.unsubscribe(topic));
    stompClient.deactivate();
    dispatch(stompClientDisconnectedAction);
  }

  next(action);

  /*

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
    case STOMP_CLIENT_TO_DISCONNECT:
      const { topics } = getState().chatReducer;
      topics.forEach(topic => stompClient.unsubscribe(topic));
      stompClient.deactivate();
      dispatch(stompClientDisconnectedAction);
      break;
    default:
      break;
  }
  next(action);
  */
};
