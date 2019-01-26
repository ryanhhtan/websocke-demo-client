import React, { Component } from 'react';
import { login, logout } from '../../actions/auth';
import { connect } from 'react-redux';
import LoadingSpinner from '../wigets/LoadingSpinner';
import './Login.css';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  editText = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  isLoggedIn = () => {
    const { accessToken } = this.props;
    // console.log(accessToken);
    return accessToken && accessToken.length > 0;
  };

  render() {
    const { isLoading, login, logout } = this.props;
    const { email, password } = this.state;
    // console.log(`email: ${email}, password: ${password}`);
    return (
      <div className="login">
        {isLoading && <LoadingSpinner />}
        {!this.isLoggedIn() && (
          <div>
            <input
              type="text"
              name="email"
              onChange={this.editText}
              placeholder="user@example.com"
              value={email}
            />
            <input
              type="password"
              name="password"
              onChange={this.editText}
              placeholder="Enter password"
            />
            <button onClick={() => login(email, password)}>Login</button>
          </div>
        )}
        {this.isLoggedIn() && (
          <div>
            <button onClick={() => logout()}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading,
  accessToken: state.authReducer.accessToken,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
