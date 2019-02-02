import React, { Component } from 'react';
import './RoomList.css';
import { connect } from 'react-redux';
import RoomCard from './RoomCard';

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
    this.setState({
      name: '',
    });
  };

  render() {
    const { rooms } = this.props;
    console.log(rooms);
    return (
      <div>
        <h2>Rooms</h2>
        <div>
          <div>Create a room</div>
          <input
            type="text"
            name="name"
            onChange={this.editText}
            value={this.state.name}
          />
          <button onClick={this.createRoom} disabled={this.state.name === ''}>
            Create
          </button>
        </div>
        {rooms.length === 0 && <p>No body is chatting now.</p>}
        <div className="room-list">
          {rooms.length > 0 &&
            rooms.map(room => <RoomCard key={room.id} room={room} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rooms: state.chatReducer.rooms,
  stompClient: state.stompReducer.stompClient,
});
export default connect(mapStateToProps)(RoomList);
