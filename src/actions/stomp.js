import { Client } from '@stomp/stompjs';
// import { chatService } from '../services/ChatService';

export const STOMP_CLIENT_CONNECTED = 'STOMP_CLIENT_CONNECTED';
const stompClientConnectedAction = stompClient => ({
  type: STOMP_CLIENT_CONNECTED,
  stompClient,
});
export const STOMP_CLIENT_CONNECT_FAILED = 'STOMP_CLIENT_CONNECT_FAILED';
const stompClientConnectFailedAction = {
  type: STOMP_CLIENT_CONNECT_FAILED,
};
export const connectWS = (accessToken, displayName) => dispatch => {
  const stompClient = new Client({
    brokerURL: 'ws://devserver.my:8080/wsdemo',
    connectHeaders: {
      displayName,
      accessToken,
    },
    debug: function(str) {
      console.log(str);
    },
    reconnectDelay: 0,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  stompClient.onConnect = frame => {
    dispatch(stompClientConnectedAction(stompClient));
  };
  stompClient.onDisconnect = frame => {
    dispatch(stompClientDisconnectedAction);
  };
  stompClient.onError = frame => {
    console.log(`Broker reported error: ${frame.headers['message']}`);
    console.log(`Additional details: ${frame.body}`);
    dispatch(stompClientConnectFailedAction);
  };
  stompClient.activate();
};

export const STOMP_CLIENT_DISCONNECTED = 'STOMP_CLIENT_DISCONNECTED';
export const stompClientDisconnectedAction = {
  type: STOMP_CLIENT_DISCONNECTED,
  stompClient: null,
};
export const STOMP_CLIENT_TO_BE_DISCONNECTED =
  'STOMP_CLIENT_TO_BE_DISCONNECTED';
const stompClientToBeDisconnectAction = {
  type: STOMP_CLIENT_TO_BE_DISCONNECTED,
};
export const disconnectWS = () => dispatch => {
  dispatch(stompClientToBeDisconnectAction);
};
