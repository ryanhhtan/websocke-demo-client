import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from '../actions/auth';
import { getStoredAccessToken } from '../services/AuthService';

const initState = {
  isLoading: false,
  accessToken: getStoredAccessToken(),
};

export const authReducer = (state = initState, action) => {
  const { type } = action;
  if (type === LOGIN_REQUESTING) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (type === LOGIN_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      accessToken: action.accessToken,
    };
  }

  if (type === LOGIN_FAILED) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (type === LOGOUT) {
    return {
      ...state,
      accessToken: null,
    };
  }

  return state;
};
