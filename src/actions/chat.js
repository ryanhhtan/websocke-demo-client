import {
  TOPIC_SUBSCRIBE,
  TOPIC_UNSUBSCRIBE,
} from '../middleware/SubscriptionService';

export const ROOM_FETCH_SUCCEEDED = 'ROOM_FETCH_SUCCEEDED';
const roomFetchSucceededAction = rooms => ({
  type: ROOM_FETCH_SUCCEEDED,
  rooms,
});
const handleGetAllRooms = event => roomFetchSucceededAction(event.rooms);

export const ROOM_CREATED = 'ROOM_CREATED';
const roomCreatedAction = room => ({
  type: ROOM_CREATED,
  room,
});
const handleRoomCreated = event => roomCreatedAction(event.room);

const chatEventHandler = {
  GET_ALL_ROOMS: handleGetAllRooms,
  ROOM_CREATED: handleRoomCreated,
};

export const handleChatEvent = (dispatch, data) => {
  // console.log(data);
  const event = JSON.parse(data.body);
  // console.log(chatEventHandler[event.type]);
  dispatch(chatEventHandler[event.type](event));
};

const topicSubscribeAction = (topic, handler) => ({
  type: TOPIC_SUBSCRIBE,
  topic,
  handler,
});

export const CHAT_MESSAGE_RECEIVED = 'CHAT_MESSAGE_RECEIVED';
const chatMessageReceivedAction = message => ({
  type: CHAT_MESSAGE_RECEIVED,
  message,
});
export const handleChatMessage = (dispatch, data) => {
  const message = JSON.parse(data.body);
  console.log(message);
  dispatch(chatMessageReceivedAction(message));
};

export const subscribeTopic = (topic, handler = handleChatEvent) => dispatch =>
  dispatch(topicSubscribeAction(topic, handler));

const topicUnsubscribAction = topic => ({
  type: TOPIC_UNSUBSCRIBE,
  topic,
});
export const unsubscribeTopic = topic => dispatch =>
  dispatch(topicUnsubscribAction(topic));

export const TOPIC_SUBSCRIBED = 'TOPIC_SUBSCRIBED';
export const topicSubscribedAction = topic => ({
  type: TOPIC_SUBSCRIBED,
  topic,
});

export const TOPIC_UNSUBSCRIBED = 'TOPIC_UNSUBSCRIBED';
export const topicUnsubscribedAction = topic => ({
  type: TOPIC_UNSUBSCRIBED,
  topic,
});

export const ENTERING_ROOM = 'ENTERING_ROOM';
const enteringRoomAction = {
  type: ENTERING_ROOM,
};
export const ENTERED_ROOM = 'ENTERED_ROOM';
const enteredrRoomAction = room => ({
  type: ENTERED_ROOM,
  room,
});

export const enterRoom = room => dispatch => {
  // console.log(room);
  dispatch(enteringRoomAction);
  dispatch(subscribeTopic(`/topic/${room.id}`, handleChatMessage));
  dispatch(enteredrRoomAction(room));
};

export const EXITING_ROOM = 'EXITING_ROOM';
const exitingRoomAction = {
  type: EXITING_ROOM,
};

export const EXITED_ROOM = 'EXITED_ROOM';
const exitedRoomAction = room => ({
  type: EXITED_ROOM,
  room,
});

export const exitRoom = room => dispatch => {
  dispatch(exitingRoomAction);
  dispatch(unsubscribeTopic(`/topic/room/${room.id}`));
  dispatch(exitedRoomAction(room));
};
