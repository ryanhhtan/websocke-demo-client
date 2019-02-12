import { Client } from '@stomp/stompjs';
// import { chatService } from '../services/ChatService';

import { fetchedMe } from './chat';

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
    brokerURL: 'wss://dev.devserver.my/wsdemo',
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
    console.log(frame);
    dispatch(fetchedMe(frame.headers['user-name']));
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

export const STOMP_CLIENT_WILL_DISCONNECT = 'STOMP_CLIENT_WILL_DISCONNECT';
const stompClientWillDisconnectAction = {
  type: STOMP_CLIENT_WILL_DISCONNECT,
};

export const STOMP_CLIENT_TO_DISCONNECT = 'STOMP_CLIENT_TO_DISCONNECT';
const stompClientToDisconnectAction = {
  type: STOMP_CLIENT_TO_DISCONNECT,
};
export const disconnectWS = () => dispatch => {
  dispatch(stompClientWillDisconnectAction);
  dispatch(stompClientToDisconnectAction);
};
