import React, { Component } from 'react';
import './RoomList.css';
import { connect } from 'react-redux';
import Room from './Room';

class RoomList extends Component {
  state = {
    name: '',
  };

  editText = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  createRoom = event => {
    const { stompClient } = this.props;
    const { name } = this.state;
    stompClient.publish({
      destination: '/app/room.create',
      body: JSON.stringify({ name }),
    });
  };

  render() {
    const { rooms } = this.props;
    console.log(rooms);
    return (
      <div className="room-list">
        <ul>
          {rooms.length > 0 &&
            rooms.map(room => (
              <li key={room.id}>
                {' '}
                <Room room={room} />
              </li>
            ))}
        </ul>
        <input
          type="text"
          name="name"
          onChange={this.editText}
          value={this.state.name}
        />
        <button onClick={this.createRoom}>Create Room</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.chatReducer.rooms,
  stompClient: state.stompReducer.stompClient,
});

export default connect(mapStateToProps)(RoomList);
