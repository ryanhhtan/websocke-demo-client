import React, { Component } from 'react';
import './Room.css';

class Room extends Component {
  render() {
    return (
      <div>
        <p>{this.props.room.name}</p>
      </div>
    );
  }
}

export default Room;
