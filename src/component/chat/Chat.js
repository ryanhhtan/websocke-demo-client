import React, { Component } from 'react';
import Login from '../login/Login';
import Entrance from '../entrance/Entrance';
import { connect } from 'react-redux';
import ChatPane from './ChatPane';
import './Chat.css';

class Chat extends Component {
  render() {
    const { isConnected } = this.props;
    return (
      <div className="chat">
        <div className="caption-1">
          <span>Websocket Chat Demo</span>
        </div>
        <div className="identity-area">
          <div className="entrance-pane">
            <Entrance />
          </div>
          <div className="login-pane">
            <Login />
          </div>
        </div>
        {isConnected && (
          <div className="chat-pane">
            <ChatPane />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stompClient: state.stompReducer.stompClient,
  isConnected: state.stompReducer.isConnected,
});

export default connect(mapStateToProps)(Chat);
