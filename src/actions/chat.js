export const ROOM_FETCH_SUCCEEDED = 'ROOM_FETCH_SUCCEEDED';
const roomFetchSucceededAction = rooms => ({
  type: ROOM_FETCH_SUCCEEDED,
  rooms,
});

const handleRoomFectchSucceeded = event => dispatch =>
  dispatch(roomFetchSucceededAction(event.rooms));

export const ROOM_CREATED = 'ROOM_CREATED';
const roomCreatedAction = room => ({
  type: ROOM_CREATED,
  room,
});
const handleRoomCreated = event => dispatch =>
  dispatch(roomCreatedAction(event.room));

export const handleChatEvent = data => dispatch => {
  // console.log(data);
  const event = JSON.parse(data.body);
  // console.log(event);
  dispatch(chatEventHandler[event.type](event));
};

const chatEventHandler = {
  GET_ALL_ROOMS: handleRoomFectchSucceeded,
  ROOM_CREATED: handleRoomCreated,
};

export const TOPIC_SUBSCRIBED = 'TOPIC_SUBSCRIBED';
const topicSubscribedAction = topic => ({
  type: TOPIC_SUBSCRIBED,
  topic,
});
export const subscribe = topic => dispatch =>
  dispatch(topicSubscribedAction(topic));

export const TOPIC_UNSUBSCRIBED = 'TOPIC_UNSUBSCRIBED';
const topicUnsubscribedAction = topic => ({
  type: TOPIC_UNSUBSCRIBED,
  topic,
});
export const unsubscribe = topic => dispatch =>
  dispatch(topicUnsubscribedAction(topic));
