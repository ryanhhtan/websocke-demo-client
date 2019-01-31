import React, { Component } from 'react';
import { connect } from 'react-redux';
import { exitRoom, subscribeTopic, unsubscribeTopic } from '../../actions/chat';
import User from '../user/User';
import './Room.css';

class Room extends Component {
  exitRoom = () => {
    const { exitRoom, room } = this.props;
    exitRoom(room);
  };

  ComponentDidMount() {
    const { room, subscribe } = this.props;
    subscribe(`/app/${room.id}/enter`);
  }

  render() {
    const { room } = this.props;
    const users = room.users;
    return (
      <div className="room">
        <h1>Room: {room.name}</h1>
        <button onClick={this.exitRoom}>Exit</button>
        <div>
          <div className="user-pane">
            {users.length > 0 && users.map(user => <User user={user} />)}
          </div>
          <div className="message-pane">
            <h1>MESSAGE PANE</h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentRoom: state.chatReducer.curretRoom,
  stompClient: state.stompReducer.stompClient,
});

const mapDispatchToProps = dispatch => ({
  exitRoom: room => dispatch(exitRoom(room)),
  subscribe: topic => dispatch(subscribeTopic(topic)),
  unsubscribe: topic => dispatch(unsubscribeTopic(topic)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);
