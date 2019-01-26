import {
  fetchToken,
  saveAccessToken,
  removeAccessToken,
} from '../services/AuthService';

export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
const loginRequestingAction = {
  type: LOGIN_REQUESTING,
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS ';
export const LOGIN_FAILED = 'LOGIN_FAILED';
const loginSucceedAction = accessToken => ({
  type: LOGIN_SUCCESS,
  accessToken,
});
const loginFailedAction = {
  type: LOGIN_FAILED,
};

export const login = (email, password) => async dispatch => {
  dispatch(loginRequestingAction);
  try {
    const tokens = await fetchToken(email, password);
    const accessToken = tokens.accessToken;
    saveAccessToken(accessToken);
    dispatch(loginSucceedAction(accessToken));
  } catch (e) {
    /* handle error */
    console.error(e);
    dispatch(loginFailedAction);
  }
};

export const LOGOUT = 'LOGOUT';
const logoutAction = {
  type: LOGOUT,
};

export const logout = () => dispatch => {
  removeAccessToken();
  dispatch(logoutAction);
};
