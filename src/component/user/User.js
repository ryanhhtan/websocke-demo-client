import React, { Component } from 'react';
import './User.css';

class User extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>{user.name}</h1>
      </div>
    );
  }
}

export default User;
