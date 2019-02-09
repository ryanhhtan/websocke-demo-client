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
import PaneTab from '../wigets/PaneTab';
import MessageTab from '../tab/MessageTab';
import VideoTab from '../tab/VideoTab';
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

  unselectUser = event => {
    const { speakingTo, selectUser } = this.props;
    if (speakingTo === null) return;
    selectUser(null);
  };

  hasNotification = () => {
    const { newMessageNotifications } = this.props;
    return newMessageNotifications.public;
  };

  render() {
    const { room, me } = this.props;
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
              {this.hasNotification() && <span className="alert-new-message" />}
            </div>
            {attendees.length > 0 &&
              attendees
                .filter(a => a.user.id !== me)
                .map(attendee => (
                  <User attendee={attendee} key={attendee.user.id} />
                ))}
          </div>

          <div className="message-pane">
            <div className="tab-control">
              <PaneTab pane="message" />
              <PaneTab pane="video" />
            </div>
            {this.props.activePane === 'message' && <MessageTab />}
            {this.props.activePane === 'video' && <VideoTab />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.chatReducer.me,
  newMessageNotifications: state.chatReducer.newMessageNotifications,
  activePane: state.chatReducer.activePane,
  speakingTo: state.chatReducer.speakingTo,
  room: state.chatReducer.currentRoom,
  // roomMessages: state.chatReducer.roomMessages,
  // userMessages: state.chatReducer.userMessages,
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
