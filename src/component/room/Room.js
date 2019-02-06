import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  exitRoom,
  subscribeTopic,
  unsubscribeTopic,
  selectUser,
  publish,
} from '../../actions/chat';
import User from '../user/User';
import Message from '../message/Message';
import './Room.css';

class Room extends Component {
  state = {
    message: '',
  };

  exitRoom = () => {
    const { exitRoom, room } = this.props;
    exitRoom(room);
  };

  ComponentDidMount() {
    const { room, subscribe } = this.props;
    subscribe(`/app/${room.id}/enter`);
  }

  unselectUser = event => {
    const { speakingTo, selectUser } = this.props;
    if (speakingTo === null) return;
    selectUser(null);
  };

  editText = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  sendMessage = event => {
    const { publish, speakingTo, room } = this.props;
    const { message } = this.state;

    if (speakingTo === null) {
      publish(`/app/room.${room.id}.message`, { message });
    } else {
      publish(`/app/user.${speakingTo.sessionId}.message`, { message });
    }
    this.setState({ message: '' });
  };

  render() {
    const { room, me, speakingTo, roomMessages, userMessages } = this.props;
    const messages =
      speakingTo === null
        ? roomMessages[room.id]
        : userMessages[speakingTo.user.id];
    const attendees = room.attendees;
    return (
      <div className="room">
        <div className="room-control">
          <span className="room-caption">Room: {room.name}</span>
          <button onClick={this.exitRoom}>Exit</button>
        </div>
        <div className="room-pane">
          <div className="user-pane">
            <h4 className="centered">Users</h4>
            <div className="user-public" onClick={this.unselectUser}>
              <span>public</span>
            </div>
            {attendees.length > 0 &&
              attendees
                .filter(a => a.user.id !== me)
                .map(attendee => (
                  <User attendee={attendee} key={attendee.user.id} />
                ))}
          </div>
          <div className="message-pane">
            <h4 className="centered">messages</h4>
            <div className="message-display">
              {messages && messages.length > 0 ? (
                messages.map(m => <Message message={m} key={m.timeStamp} />)
              ) : (
                <span>No messages for now.</span>
              )}
            </div>
            <div className="message-enter">
              <span>Speaking to: </span>
              <span>
                {speakingTo === null ? 'public' : speakingTo.displayName}
              </span>
              <br />
              <input
                className="message-input"
                name="message"
                value={this.state.message}
                type="text"
                onChange={this.editText}
                placeholder="Input message"
              />
              <button onClick={this.sendMessage}>Send</button>
            </div>
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
  roomMessages: state.chatReducer.roomMessages,
  userMessages: state.chatReducer.userMessages,
  stompClient: state.stompReducer.stompClient,
});

const mapDispatchToProps = dispatch => ({
  exitRoom: room => dispatch(exitRoom(room)),
  subscribe: topic => dispatch(subscribeTopic(topic)),
  unsubscribe: topic => dispatch(unsubscribeTopic(topic)),
  publish: (destination, content) => dispatch(publish(destination, content)),
  selectUser: attendee => dispatch(selectUser(attendee)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);
