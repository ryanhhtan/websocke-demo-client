import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { stompReducer } from './stomp';
import { chatReducer } from './chat';

export const rootReducer = combineReducers({
  authReducer,
  stompReducer,
  chatReducer,
});
