import produce from 'immer';
import { types as actionTypes } from './actions';

const setRoles = (state, roles) => {
  state.logged = true;
  state.roles = roles;

  return state;
};

const setToken = (state, { token, refreshToken = null }) => {
  state.token = token;
  refreshToken && (state.refreshToken = refreshToken);

  return state;
};

const logout = () => {
  return initialState;
};

const loginError = (state, error) => {
  state.error = error;
  return state;
};

const setFilters = (state, filters) => {
  state.filters = { ...state.filters, ...filters };
  return state;
};

const reducersMap = {
  [actionTypes.SET_TOKEN]: setToken,
  [actionTypes.LOGOUT]: logout,
  [actionTypes.SET_USER_ROLES]: setRoles,
  [actionTypes.LOGIN_ERROR]: loginError,
  [actionTypes.SET_FILTERS]: setFilters,
};

const initialState = {
  logged: false,
  token: null,
  refreshToken: null,
  roles: null,
  error: null,
  filters: {
    dateFrom: '',
    dateTo: '',
    id: '',
    pickUpStations: [],
    dropOffStations: [],
  },
};

const exportedFunction =  (state = initialState, { type: actionType, payload }) => {
  return produce(state, (draft) => (actionType in reducersMap && reducersMap[actionType](draft, payload)) || state);
};

export default exportedFunction;
