import React, { Component } from 'react';
import { enterRoom } from '../../actions/chat';
import { connect } from 'react-redux';

import './RoomCard.css';

class RoomCard extends Component {
  state = {
    isSelected: false,
  };

  select = event => {
    this.setState({ isSelected: true });
  };
  unselect = event => {
    this.setState({ isSelected: false });
  };

  enterRoom = () => {
    console.log('CLICKED');
    this.props.enterRoom(this.props.room);
  };

  render() {
    const { room } = this.props;
    return (
      <div
        className="room-card"
        onMouseOver={this.select}
        onMouseOut={this.unselect}>
        <h3>{room.name}</h3>
        <div>
          <span className="caption">Current: </span>
          <span>{room.totalAttendees} attendees.</span>
        </div>
        <button
          className={this.state.isSelected ? 'hovering' : ''}
          onClick={this.enterRoom}>
          Enter
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  enterRoom: room => dispatch(enterRoom(room)),
});

export default connect(
  null,
  mapDispatchToProps,
)(RoomCard);
