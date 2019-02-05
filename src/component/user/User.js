import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../../actions/chat';
import './User.css';

class User extends Component {
  selectUser = event => {
    const { attendee, selectUser, speakingTo } = this.props;
    if (attendee === speakingTo) return;
    selectUser(attendee);
  };
  render() {
    const { attendee, speakingTo } = this.props;
    const selectedClass = attendee === speakingTo ? ' selected' : '';
    return (
      <div className={'user-card' + selectedClass} onClick={this.selectUser}>
        <span>{attendee.displayName}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  speakingTo: state.chatReducer.speakingTo,
});

const mapDispatchToProps = dispatch => ({
  selectUser: attendee => dispatch(selectUser(attendee)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
