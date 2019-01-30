import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { subscriptionService } from './middleware/SubscriptionService';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, subscriptionService)),
);

export default store;
