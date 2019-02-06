import React, { Component } from 'react';
import './Message.css';
import { connect } from 'react-redux';

class Message extends Component {
  render() {
    const { message, me } = this.props;
    const extraClass = message.from.user.id === me ? ' self' : ' peer';
    return (
      <div className={'message' + extraClass}>
        <span>{message.from.displayName} says </span>
        <span>{message.timeStamp}</span>
        <p>{message.content}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.chatReducer.me,
});

export default connect(mapStateToProps)(Message);
