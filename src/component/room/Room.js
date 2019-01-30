import React, { Component } from 'react';
import { connect } from 'react-redux';
import { exitRoom } from '../../actions/chat';
import './Room.css';

class Room extends Component {
  exitRoom = () => {
    const { exitRoom, room } = this.props;
    exitRoom(room);
  };
  render() {
    const { room } = this.props;
    return (
      <div className="room">
        <h1>Room: {room.name}</h1>
        <button onClick={this.exitRoom}>Exit</button>
        <div>
          <div className="user-list">
            <ul>
              <li>public</li>
            </ul>
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
  room: state.chatReducer.rooms.filter(
    r => r.id === state.chatReducer.myRoomId,
  )[0],
  stompClient: state.stompReducer.stompClient,
});

const mapDispatchToProps = dispatch => ({
  exitRoom: room => dispatch(exitRoom(room)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);
