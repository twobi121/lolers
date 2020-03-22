import {ActionTypes} from './users/actions';

export const clearState = (reducer) => {
  return (state, action) => {
    if (action.type === ActionTypes.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
};
