import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { stompReducer } from './stomp';
import { chatReducer } from './chat';

export const rootReducer = combineReducers({
  authReducer,
  stompReducer,
  chatReducer,
});

/*
 * A reducer for actions in template:
 * {
 * type: TYPE,
 * updates: [
 *   {
 *     target: String
 *     value: target_value,
 *     operation:'set'/'add'/'delete'
 *   },
 *   ...
 *   ]
 * }
 */

// export function genericReducer(state, action) {
//   const { updates } = action;
//   if (typeof updates === 'undefined') return state;

//   const newState = updates.reduce((accumulate, current) => {
//     console.log(current);
//     switch (current.operation) {
//       case 'set':
//         return {
//           ...accumulate,
//           [current.target]: current.value,
//         };
//       case 'add':
//         const target = state[current.target].slice();
//         target.push(current.value);
//         return {
//           ...accumulate,
//           [current.target]: target,
//         };
//       case 'remove':
//         const index = state.indexOf(current.value);
//         return {
//           ...accumulate,
//           [current.target]: state[current.target].splice(index, 1),
//         };
//       default:
//         return accumulate;
//     }
//   }, {});

//   console.log(newState);
//   return {
//     ...state,
//     ...newState,
//   };
// }
