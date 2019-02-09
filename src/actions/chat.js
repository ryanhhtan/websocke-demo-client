import {
  TO_SUBSCRIBE_TOPIC,
  TO_UNSUBSCRIBE_TOPIC,
  TO_PUBLISH,
} from '../middleware/SubscriptionService';

import { disconnectWS } from '../actions/stomp';

const subscribeTopicAction = (topic, handler) => ({
  type: TO_SUBSCRIBE_TOPIC,
  topic,
  handler,
});
export const subscribeTopic = (topic, handler = handleChatEvent) => dispatch =>
  dispatch(subscribeTopicAction(topic, handler));

const unsubscribeTopicAction = topicUri => ({
  type: TO_UNSUBSCRIBE_TOPIC,
  topicUri,
});
export const unsubscribeTopic = topicUri => dispatch =>
  dispatch(unsubscribeTopicAction(topicUri));

const toPublishAction = (destination, content = {}) => ({
  type: TO_PUBLISH,
  data: {
    destination,
    body: JSON.stringify(content),
  },
});
export const publish = (destination, content) => dispatch =>
  dispatch(toPublishAction(destination, content));

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
// export const ENTERED_ROOM = 'ENTERED_ROOM';
// const enteredRoomAction = {
//   type: ENTERED_ROOM,
// };

export const enterRoom = room => dispatch => {
  // console.log(room);
  dispatch(enteringRoomAction);
  dispatch(subscribeTopic({ uri: `/topic/room.${room.id}` }, handleChatEvent));
  dispatch(publish(`/app/room.${room.id}.details`, {}));
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
  dispatch(publish(`/app/room.${room.id}.exit`, {}));
  dispatch(unsubscribeTopic(`/topic/room.${room.id}`));
  dispatch(exitedRoomAction(room));
  // refresh all rooms
  dispatch(publish('/app/room.showall'));
};

export const SELECTED_USER = 'SELECTED_USER';
const selectedUserAction = attendee => ({
  type: SELECTED_USER,
  attendee,
});

export const selectUser = attendee => dispatch => {
  dispatch(selectedUserAction(attendee));
};

export const FETCHED_ME = 'FETCHED_ME';
const fetchedMeAction = me => ({
  type: FETCHED_ME,
  me,
});

export const fetchedMe = me => dispatch => {
  dispatch(fetchedMeAction(me));
};

export const ACTIVE_PANE = 'ACTIVE_PANE ';
const activatePaneAction = pane => ({
  type: ACTIVE_PANE,
  pane,
});
export const activatePane = pane => dispatch =>
  dispatch(activatePaneAction(pane));

export const CONNECTED_LOCAL_MEDIA = 'CONNECTED_LOCAL_MEDIA';
const connectedLocalMedia = media => ({
  type: CONNECTED_LOCAL_MEDIA,
  media,
});

export const videoCall = () => async dispatch => {
  const constrains = { video: true };
  const localMedia = await navigator.mediaDevices.getUserMedia(constrains);
  dispatch(connectedLocalMedia(localMedia));
};

/*************************************************************************/
/* handlers for stomp messages */
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
const handleRoomDetailsFetched = event => dispatch => {
  dispatch(roomDetailsFetched(event.room));
  dispatch(publish(`/app/room.${event.room.id}.enter`, {}));
};

export const ROOM_CREATED = 'ROOM_CREATED';
const roomCreatedAction = room => ({
  type: ROOM_CREATED,
  room,
});
const handleRoomCreated = event => roomCreatedAction(event.room);

export const USER_ENTERED = 'USER_ENTERED';
const userEnteredAction = attendee => ({
  type: USER_ENTERED,
  attendee,
});
const handleUserEntered = event => userEnteredAction(event.attendee);

export const USER_EXITED = 'USER_EXITED';
const userExitRoomAction = attendee => ({
  type: USER_EXITED,
  attendee,
});
const handleUserExited = event =>
  userExitRoomAction(event.roomId, event.attendee);

export const CHAT_MESSAGE = 'CHAT_MESSAGE';
const chatMessageAction = message => ({
  type: CHAT_MESSAGE,
  message,
});
export const handleChatMessage = event => dispatch => {
  dispatch(chatMessageAction(event.message));
};

export const USER_CONNECTED = 'USER_CONNECTED';
const handleUserConnected = event => dispatch => {
  dispatch(disconnectWS());
  // console.log(event);
};

export const WEBRTC_SIGNALING = 'WEBRTC_SIGNALING';
const handleWebrtcSginal = event => {
  console.log(event.signal);
};

/**
 * map event handler to type.
 * !!! BESURE THE ACTUAL HANDLERS ARE DEFINED BEFORE THIS MAP.
 */
const chatEventHandler = {
  ALL_ROOMS_FETCHED: handleAllRoomsFetched,
  CHAT_MESSAGE: handleChatMessage,
  ROOM_CREATED: handleRoomCreated,
  ROOM_DETAILS_FETCHED: handleRoomDetailsFetched,
  USER_ENTERED: handleUserEntered,
  USER_EXITED: handleUserExited,
  USER_CONNECTED: handleUserConnected,
  WEBRTC_SIGNALE: handleWebrtcSginal,
};

export const handleChatEvent = (dispatch, data) => {
  console.log(data.body);
  const event = JSON.parse(data.body);
  dispatch(chatEventHandler[event.type](event));
};
