const initState = {
  isLoading: false,
  rooms: [],
  inRoom: null,
};

export const chatReducer = (state = initState, action) => {
  const { updates } = action;
  if (typeof updates === 'undefined') return state;

  const newState = updates.reduce((accumulate, current) => {
    switch (current.operation) {
      case 'set':
        console.log('set value to state');
        return {
          ...accumulate,
          [current.target]: current.value,
        };
      case 'add':
        return {
          ...accumulate,
          [current.target]: state[current.target].push(current.value),
        };
      case 'remove':
        const index = state.indexOf(current.value);
        return {
          ...accumulate,
          [current.target]: state[current.target].splice(index, 1),
        };
      default:
        return accumulate;
    }
  }, {});

  console.log(newState);
  return {
    ...state,
    ...newState,
  };
};
