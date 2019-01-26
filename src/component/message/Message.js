import React, { Component } from 'react';
import './Message.css';

class Message extends Component {
  render() {
    const { message, extraClass } = this.props;
    return (
      <div className={extraClass + ' message'}>
        <h3>{message.speaker.displayName}</h3>
        <p>{message.content}</p>
      </div>
    );
  }
}

export default Message;
