export const ROOM_FETCH_SUCCEEDED = 'ROOM_FETCH_SUCCEEDED';
const roomFetchSucceededAction = rooms => ({
  type: ROOM_FETCH_SUCCEEDED,
  updates: [
    {
      target: 'rooms',
      operation: 'set',
      value: rooms,
    },
  ],
});

export const ROOM_CREATED = 'ROOM_CREATED';
const roomCreatedAction = room => ({
  type: ROOM_CREATED,
  updates: [
    {
      target: 'rooms',
      operation: 'add',
      value: room,
    },
  ],
});

export const handleChatEvent = data => dispatch => {
  console.log(data);
  const event = JSON.parse(data.body);
  console.log(event);
  dispatch(chatEventHandler[event.type](event));
};

const chatEventHandler = {
  GET_ALL_ROOMS: roomFetchSucceededAction,
  ROOM_CREATED: roomCreatedAction,
};
