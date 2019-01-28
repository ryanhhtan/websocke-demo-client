export const ROOM_FETCH_SUCCEEDED = 'ROOM_FETCH_SUCCEEDED';
const roomFetchSucceededAction = rooms => ({
  type: ROOM_FETCH_SUCCEEDED,
  updateState: {
    rooms,
  },
});
