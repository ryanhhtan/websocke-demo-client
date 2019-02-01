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
    const attendees = room.attendees;
    return (
      <div className="room">
        <h1>Room: {room.name}</h1>
        <button onClick={this.exitRoom}>Exit</button>
        <div>
          <div className="user-pane">
            {attendees.length > 0 &&
              attendees.map(attendee => (
                <User user={attendee.user} key={attendee.sessionId} />
              ))}
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
  room: state.chatReducer.currentRoom,
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
