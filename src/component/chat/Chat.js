import React, { Component } from 'react';
import Login from '../login/Login';
import Room from '../room/Room';
import Dialog from '../dialog/Dialog';
import './Chat.css';

class Chat extends Component {
  render() {
    return (
      <div className="chat">
        <div className="login-pane">
          <Login />
        </div>
        <div className="room-pane">
          <Room />
        </div>
        <div className="dialog-pane">
          <Dialog />
        </div>
      </div>
    );
  }
}

export default Chat;
