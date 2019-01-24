import React, { Component } from 'react';
import './Chat.css';
import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';

class Chat extends Component {
  state = {
    accessToken: '',
    email: '',
    password: '',
    wsConnected: false,
    messageToSend: '',
    messages: [],
  };

  editText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isLoggedIn = () => {
    const { accessToken } = this.state;
    // console.log(accessToken);
    return accessToken && accessToken !== '';
  };

  connectWS = () => {
    const { wsConnected } = this.state;
    if (wsConnected) return;
    const stompClient = new Client({
      // webSocketFactory: () => new WebSocket('ws://devserver.my:8080/wsdemo'),
      // webSocketFactory: () => new SockJS('http://devserver.my:8080/wsdemo'),
      brokerURL: 'ws://devserver.my:8080/wsdemo',
      connectHeaders: {
        Authorization: `Bearer ${this.state.accessToken}`,
      },
      debug: function(str) {
        console.log(str);
      },
      reconnectDelay: 0,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    stompClient.onConnect = frame => {
      stompClient.subscribe('/topic/chat', data => {
        const { messages } = this.state;
        const message = JSON.parse(data.body);
        messages.push(message);
        this.setState({
          messages,
        });
      });
      this.setState({
        wsConnected: true,
        stompClient,
      });
    };
    stompClient.onError = frame => {
      console.log(`Broker reported error: ${frame.headers['message']}`);
      console.log(`Additional details: ${frame.body}`);
    };
    stompClient.activate();
  };

  disconnectWS = () => {
    const { wsConnected, stompClient } = this.state;
    if (!wsConnected) return;
    stompClient.deactive();
    this.setState({
      wsConnected: false,
      stompClient: null,
    });
  };

  fetchToken = async (email, password) => {
    const url = 'https://auth.lasfu.roro3.com/login';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Basic bG9uZ3Rlcm1fY2xpZW50OmFjbWVzZWNyZXQ=',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();
    if (result.tokens.accessToken) {
      localStorage.setItem('accessToken', result.tokens.accessToken);
      this.setState({
        accessToken: result.tokens.accessToken,
      });
    }
  };

  login = async () => {
    if (this.isLoggedIn()) return;
    const { email, password } = this.state;
    await this.fetchToken(email, password);
    this.connectWS();
  };

  logout = () => {
    this.disconnectWS();
    localStorage.removeItem('accessToken');
    this.setState({
      accessToken: '',
    });
  };

  sendMessage = () => {
    const { wsConnected, messageToSend, stompClient } = this.state;
    if (!wsConnected || messageToSend.length === 0) return;
    stompClient.publish({
      destination: '/app/message',
      body: JSON.stringify({ message: messageToSend }),
    });
    this.setState({
      messageToSend: '',
    });
  };

  componentWillMount() {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      this.setState({
        accessToken: storedToken,
      });
    }
  }

  componentDidMount() {
    if (this.isLoggedIn() && !this.state.wsConnected) {
      this.connectWS();
    }
  }

  componentWillUnmount() {
    console.log('Disconnect WS and Exit.');
    this.disconnectWS();
  }
  render() {
    const { messages, wsConnected, messageToSend, email } = this.state;
    let i = 0;
    return (
      <div>
        <h1>Websocket Demo</h1>
        {!this.isLoggedIn() && (
          <div>
            <input
              type="text"
              name="email"
              onChange={this.editText}
              placeholder="user@example.com"
              value={email}
              disabled={this.isLoggedIn()}
            />
            <input
              type="password"
              name="password"
              onChange={this.editText}
              placeholder="Enter password"
            />
            <button onClick={this.login} disabled={this.isLoggedIn()}>
              Login
            </button>
          </div>
        )}
        {this.isLoggedIn() && <button onClick={this.logout}>Logout</button>}
        <div className="message-area">
          {messages.length > 0 &&
            messages.map(m => <div key={i++}>{m.message}</div>)}
        </div>
        <div className="control-area">
          <input
            name="messageToSend"
            type="text"
            placeholder="Enter message"
            value={messageToSend}
            onChange={this.editText}
          />
          <button
            onClick={this.sendMessage}
            disabled={!wsConnected || messageToSend.length === 0}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Chat;
