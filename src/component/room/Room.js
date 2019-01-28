import React, { Component } from 'react';
import './Room.css';

class Room extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.room.name}</h1>
      </div>
    );
  }
}

export default Room;
