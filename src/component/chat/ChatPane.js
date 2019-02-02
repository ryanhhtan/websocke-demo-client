import React, { Component } from 'react';
import RoomList from '../room/RoomList';
import Room from '../room/Room';
import { connect } from 'react-redux';
import { subscribeTopic, publish } from '../../actions/chat';

import './ChatPane.css';

class ChatPane extends Component {
  componentDidMount() {
    const { subscribe, publish } = this.props;
    subscribe('/user/queue/events');
    subscribe('/topic/events');
    publish('/app/room.showall');
  }

  render() {
    const { currentRoom } = this.props;
    return (
      <div className="chat-area">
        {currentRoom === null ? (
          <div className="room-pane">
            <RoomList />
          </div>
        ) : (
          <div className="dialog-pane">
            <Room />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.chatReducer.currentRoom,
  // stompClient: state.stompReducer.stompClient,
  isConnected: state.stompReducer.isConnected,
});

const mapDispatchToProps = dispatch => ({
  subscribe: topic => dispatch(subscribeTopic(topic)),
  publish: (destination, content) => dispatch(publish(destination, content)),
  // unsubscribe: topic => dispatch(unsubscribeTopic(topic)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatPane);
