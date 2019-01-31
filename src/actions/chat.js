import {
  TOPIC_SUBSCRIBE,
  TOPIC_UNSUBSCRIBE,
} from '../middleware/SubscriptionService';

export const ALL_ROOMS_FETCHED = 'ALL_ROOMS_FETCHED';
const allRoomsFetchedAction = rooms => ({
  type: ALL_ROOMS_FETCHED,
  rooms,
});
const handleAllRoomsFetched = event => allRoomsFetchedAction(event.rooms);

export const ROOM_DETAILS_FETCHED = 'ROOM_DETAILS_FETCHED';
const roomDetailsFetched = room => ({
  type: ROOM_DETAILS_FETCHED,
  room,
});
const handleRoomDetailsFetched = event => roomDetailsFetched(event.room);

export const ROOM_CREATED = 'ROOM_CREATED';
const roomCreatedAction = room => ({
  type: ROOM_CREATED,
  room,
});
const handleRoomCreated = event => roomCreatedAction(event.room);

export const USER_ENTERED = 'USER_ENTERED';
const userEnteredAction = user => ({
  type: USER_ENTERED,
  user,
});
const handleUserEntered = event => userEnteredAction(event.roomId, event.user);

export const USER_EXITED = 'USER_EXITED';
const userExitRoomAction = user => ({
  type: USER_EXITED,
  user,
});
const handleUserExited = event => userExitRoomAction(event.roomId, event.user);

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

const topicSubscribeAction = (topic, handler) => ({
  type: TOPIC_SUBSCRIBE,
  topic,
  handler,
});
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
  dispatch(subscribeTopic(`/topic/room.${room.id}`, handleChatEvent));
  dispatch(subscribeTopic(`/app/room.${room.id}.details`, handleChatEvent));
  dispatch(subscribeTopic(`/app/room.${room.id}.enter`, handleChatEvent));
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
  dispatch(unsubscribeTopic(`/topic/room.${room.id}`));
  dispatch(exitedRoomAction(room));
};

/**
 * map event handler to type.
 * !!! BESURE THE ACTUAL HANDLER IS DEFINED BEFORE THIS MAP.
 */
const chatEventHandler = {
  ALL_ROOMS_FETCHED: handleAllRoomsFetched,
  ROOM_CREATED: handleRoomCreated,
  ROOM_DETAILS_FETCHED: handleRoomDetailsFetched,
  USER_ENTERED: handleUserEntered,
  USER_EXITED: handleUserExited,
};

export const handleChatEvent = (dispatch, data) => {
  // console.log(data);
  const event = JSON.parse(data.body);
  console.log(event);
  dispatch(chatEventHandler[event.type](event));
};
