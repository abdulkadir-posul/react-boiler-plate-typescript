import produce from 'immer';
import { types as actionTypes } from './actions';

const reducersMap = {
  [actionTypes.SET_LOADING]: (state, isLoading) => {
    state.inProcess += isLoading ? 1 : -1;

    if (state.inProcess <= 0) {
      state.loading = false;
      state.inProcess = 0;
    } else {
      state.loading = true;
    }

    return state;
  },
};

const initialState = {
  loading: false,
  inProcess: 0,
};

const exportedFunction =  (state = initialState, { type: actionType, payload }) =>
  produce(state, (draft) => (actionType in reducersMap && reducersMap[actionType](draft, payload)) || state);

export default exportedFunction;
