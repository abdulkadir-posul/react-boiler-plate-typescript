import produce from 'immer';
import { types as actionTypes } from './actions';

interface rolesStates {
  logged: boolean,
  roles: string[]
}

const setRoles = (state: rolesStates, roles: string[]) => {
  state.logged = true;
  state.roles = roles;

  return state;
};

interface tokenState {
  token: string,
  refreshToken: boolean
}
const setToken = (state: tokenState, { token, refreshToken = true }: tokenState) => {
  state.token = token;
  refreshToken && (state.refreshToken = refreshToken);

  return state;
};

const logout = () => {
  return initialState;
};

interface loginErrorState {
  error: string
}
const loginError = (state:loginErrorState, error:string) => {
  state.error = error;
  return state;
};

const reducersMap = {
  [actionTypes.SET_TOKEN]: setToken,
  [actionTypes.LOGOUT]: logout,
  [actionTypes.SET_USER_ROLES]: setRoles,
  [actionTypes.LOGIN_ERROR]: loginError
};



interface initialStateInterface {
  logged: boolean,
  token: string,
  refreshToken: true,
  roles: string[],
  error: string ,
  filters: any
}

const initialState: initialStateInterface = {
  logged: false,
  token: "",
  refreshToken: true,
  roles: [],
  error: "",
  filters: {
    dateFrom: '',
    dateTo: '',
    id: '',
    pickUpStations: [],
    dropOffStations: [],
  },
};

const exportedFunction =  (state:initialStateInterface = initialState, { type: actionType, payload }: any) => {
  return produce(state, (draft) => (actionType in reducersMap && reducersMap[actionType](draft, payload)) || state);
};

export default exportedFunction;
