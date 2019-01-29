import React, { Component } from 'react';
import RoomList from '../room/RoomList';
import Dialog from '../dialog/Dialog';
import { connect } from 'react-redux';
import { subscribe } from '../../actions/chat';

import './ChatPane.css';

class ChatPane extends Component {
  componentDidMount() {
    const { stompClient, subscribe, unsubscribe } = this.props;

    subscribe('/user/queue/events');
    subscribe('/topic/events');

    stompClient.publish({
      destination: '/app/room.showall',
    });
  }

  // componentWillUnmount() {
  //   const { stompClient } = this.props;
  //   stompClient.unsubscribe('/user/queue/events');
  //   stompClient.unsubscribe('/topic/events');
  // }

  isConnected = () => {
    const { stompClient } = this.props;
    return stompClient !== null;
  };

  render() {
    return (
      <div className="chat-area">
        {this.isConnected() && (
          <div className="room-pane">
            <RoomList />
          </div>
        )}
        <div className="dialog-pane">
          <Dialog />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stompClient: state.stompReducer.stompClient,
});

const mapDispatchToProps = dispatch => ({
  subscribe: topic => dispatch(subscribe(topic)),
  unsubscribe: topic => dispatch(unsubscribe(topic)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatPane);
