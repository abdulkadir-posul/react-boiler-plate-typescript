import produce from 'immer';
import { types as actionTypes } from './actions';


interface IState {
  inProcess: number,
  loading: boolean
}

const reducersMap = {
  [actionTypes.SET_LOADING]: (state: IState, isLoading: boolean) => {
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

const exportedFunction =  (state: IState = initialState, { type: actionType, payload }: any) =>
  produce(state, (draft) => (actionType in reducersMap && reducersMap[actionType](draft, payload)) || state);

export default exportedFunction;
