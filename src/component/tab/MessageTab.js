import React, { Component } from 'react';
import Message from '../message/Message';
import { publish, activatePane, videoCall } from '../../actions/chat';
import { connect } from 'react-redux';
import './MessageTab.css';

class MessageTab extends Component {
  state = {
    message: '',
  };

  videoCall = () => {
    console.log('video call');
    this.props.activatePane('video');
    this.props.videoCall();
  };

  editText = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  keyPress = event => {
    if (event.charCode === 13) this.sendMessage();
  };

  sendMessage = () => {
    const { publish, speakingTo, room } = this.props;
    const { message } = this.state;
    if (message === '') return;

    if (speakingTo === null) {
      publish(`/app/room.${room.id}.message`, { message });
    } else {
      publish(`/app/user.${speakingTo.sessionId}.message`, { message });
    }
    this.setState({ message: '' });
  };

  render() {
    const { room, speakingTo, roomMessages, userMessages } = this.props;
    const messages =
      speakingTo === null
        ? roomMessages[room.id]
        : userMessages[speakingTo.user.id];
    return (
      <div className="tab-pane">
        <div className="message-display">
          {messages &&
            messages.length > 0 &&
            messages.map(m => <Message message={m} key={m.timeStamp} />)}
        </div>
        <div className="message-enter">
          <div>
            <span>Speaking to: </span>
            <span>
              {speakingTo === null ? 'public' : speakingTo.displayName}
            </span>
          </div>
          <div>
            <textarea
              className="message-input"
              rows="5"
              name="message"
              value={this.state.message}
              type="text"
              onKeyPress={this.keyPress}
              onChange={this.editText}
              placeholder="Input message"
            />
          </div>
          <div>
            <button
              onClick={this.sendMessage}
              disabled={this.state.message === ''}>
              Send
            </button>
            {this.props.speakingTo !== null && (
              <button onClick={this.videoCall}>Video Call</button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  room: state.chatReducer.currentRoom,
  activePane: state.chatReducer.activePane,
  speakingTo: state.chatReducer.speakingTo,
  roomMessages: state.chatReducer.roomMessages,
  userMessages: state.chatReducer.userMessages,
  stompClient: state.stompReducer.stompClient,
});

const mapDispatchToProps = dispatch => ({
  videoCall: () => dispatch(videoCall()),
  publish: (destination, content) => dispatch(publish(destination, content)),
  activatePane: pane => dispatch(activatePane(pane)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageTab);
