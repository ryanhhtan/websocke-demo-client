import React, { Component } from 'react';
import './Chat.css';
import { Stomp } from '@stomp/stompjs';

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
    const url = 'ws://devserver.my:8080/wsdemo';
    const stompClient = Stomp.client(url);
    stompClient.connect(
      {},
      frame => {
        stompClient.subscribe('/topic/chat', data => {
          console.log(data);
          const { messages } = this.state;
          const message = JSON.parse(data.body);
          console.log(message);
          messages.push(message);
          this.setState({
            messages,
          });
        });
        this.setState({
          wsConnected: true,
          stompClient,
        });
      },
    );
  };

  disconnectWS = () => {
    const { wsConnected, stompClient } = this.state;
    if (!wsConnected) return;
    stompClient.disconnect(() => {
      this.setState({
        wsConnected: false,
        stompClient: null,
      });
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
    stompClient.send(
      '/app/message',
      {},
      JSON.stringify({ message: messageToSend }),
    );
    this.setState({
      messageToSend: '',
    });
  };

  componentDidMount() {
    if (this.isLoggedIn() && !this.state.wsConnected) {
      this.connectWS();
    }
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      this.setState({
        accessToken: storedToken,
      });
    }
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
