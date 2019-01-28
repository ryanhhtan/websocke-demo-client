import React, { Component } from 'react';
import Login from '../login/Login';
import RoomList from '../room/RoomList';
import Entrance from '../entrance/Entrance';
import Dialog from '../dialog/Dialog';
import { connect } from 'react-redux';
import './Chat.css';

class Chat extends Component {
  isConnected = () => {
    const { stompClient } = this.props;
    return stompClient !== null;
  };
  render() {
    return (
      <div className="chat">
        <h1>Websocket Chat Demo</h1>
        <div className="identity-area">
          <div className="entrance-pane">
            <Entrance />
          </div>
          <div className="login-pane">
            <Login />
          </div>
        </div>
        {this.isConnected() && (
          <div className="chat-area">
            <div className="room-pane">
              <RoomList />
            </div>
            <div className="dialog-pane">
              <Dialog />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stompClient: state.stompReducer.stompClient,
});

export default connect(mapStateToProps)(Chat);
