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

  hasNotification = () => {
    const { newMessageNotifications, attendee } = this.props;
    return newMessageNotifications[attendee.user.id];
  };

  render() {
    const { attendee, speakingTo } = this.props;
    const selectedClass = attendee === speakingTo ? ' selected' : '';
    return (
      <div className={'user-card' + selectedClass} onClick={this.selectUser}>
        <span>{attendee.displayName}</span>
        {this.hasNotification() && <span className="alert-new-message" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  speakingTo: state.chatReducer.speakingTo,
  newMessageNotifications: state.chatReducer.newMessageNotifications,
});

const mapDispatchToProps = dispatch => ({
  selectUser: attendee => dispatch(selectUser(attendee)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);
