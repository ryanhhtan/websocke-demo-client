import React, { Component } from 'react';
import './Entrance.css';
import { connectWS, disconnectWS } from '../../actions/stomp';
import { connect } from 'react-redux';

class Entrance extends Component {
  state = {
    displayName: '',
  };

  isLoggedIn = () => {
    const { accessToken } = this.props;
    return accessToken && accessToken.length > 0;
  };

  editText = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isConnected = () => {
    return this.props.stompClient !== null;
  };

  disconnectWS = event => {
    console.log('CLICK');
    const { stompClient, disconnectWS } = this.props;
    disconnectWS(stompClient);
  };

  render() {
    const { connectWS, accessToken } = this.props;
    const { displayName } = this.state;
    return (
      <div className="entrance">
        <input
          type="text"
          name="displayName"
          value={this.state.displayName}
          onChange={this.editText}
          disabled={!this.isLoggedIn() || this.isConnected()}
          placeholder="Nick name"
        />
        {!this.isConnected() && (
          <button
            disabled={!this.isLoggedIn() || this.state.displayName === ''}
            onClick={() => connectWS(accessToken, displayName)}>
            Start Chatting
          </button>
        )}
        {this.isConnected() && (
          <button onClick={this.disconnectWS}>Leave</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.authReducer.accessToken,
  stompClient: state.stompReducer.stompClient,
});

const mapDispatchToProps = dispatch => ({
  connectWS: (accessToken, displayName) =>
    dispatch(connectWS(accessToken, displayName)),
  disconnectWS: stompClient => disconnectWS(stompClient),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Entrance);
