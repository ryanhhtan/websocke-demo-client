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
    const { room, me } = this.props;
    const attendees = room.attendees;
    return (
      <div className="room">
        <h1>Room: {room.name}</h1>
        <button onClick={this.exitRoom}>Exit</button>
        <div className="room-pane">
          <div className="user-pane">
            {attendees.length > 0 &&
              attendees
                .filter(a => a.user.id !== me)
                .map(attendee => (
                  <User attendee={attendee} key={attendee.user.id} />
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
  me: state.chatReducer.me,
  speakingTo: state.chatReducer.speakingTo,
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
