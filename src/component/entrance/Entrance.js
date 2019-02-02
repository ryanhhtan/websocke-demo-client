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

  disconnectWS = event => {
    console.log('CLICK');
    this.props.disconnectWS();
  };

  render() {
    const { connectWS, accessToken, isConnected } = this.props;
    const { displayName } = this.state;
    return (
      <div className="entrance">
        <input
          type="text"
          name="displayName"
          value={this.state.displayName}
          onChange={this.editText}
          disabled={!this.isLoggedIn() || isConnected}
          placeholder="Nick name"
        />
        {!isConnected && (
          <button
            disabled={!this.isLoggedIn() || this.state.displayName === ''}
            onClick={() => connectWS(accessToken, displayName)}>
            Start Chatting
          </button>
        )}
        {isConnected && <button onClick={this.disconnectWS}>Leave</button>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isConnected: state.stompReducer.isConnected,
  accessToken: state.authReducer.accessToken,
  stompClient: state.stompReducer.stompClient,
});

const mapDispatchToProps = dispatch => ({
  connectWS: (accessToken, displayName) =>
    dispatch(connectWS(accessToken, displayName)),
  disconnectWS: () => dispatch(disconnectWS()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Entrance);
