import { createCancelToken } from '../../api';
import AuthService from '../../api/AuthService';
import storage from '../../storage';
import { actions as loaderActions } from '../loader';

let authService = new AuthService();

export const types = {
  LOGOUT: 'LOGOUT',
  SET_TOKEN: 'SET_TOKEN',
  SET_USER_ROLES: 'SET_USER_ROLES',
  LOGIN_ERROR: 'LOGIN_ERROR'
};

/**
 * token regenerate events
 */
let listeningAPIEvents = false;

const onRegenerateTokenSuccess =
  (dispatch) =>
  ({ detail: data }) => {
    const { token, refresh_token } = data;
    const rememberMe = storage.get('rememberMe') === 'true';

    dispatch(setToken(token, rememberMe && refresh_token));
  };

const onRegenerateTokenFailure = (dispatch) => () => {
  dispatch(logout());
};

/**
 * Actions
 */

const setToken = (token, refreshToken) => {
  storage.set('token', token);
  refreshToken && storage.set('refreshToken', refreshToken);

  authService.setToken(token, refreshToken);

  return {
    type: types.SET_TOKEN,
    payload: { token, refreshToken },
  };
};

const setRoles = (roles) => ({
  type: types.SET_USER_ROLES,
  payload: roles,
});

export const init = () => (dispatch) => {
  const token = storage.get('token');
  const refreshToken = storage.get('refreshToken');
  const rememberMe = storage.get('rememberMe') === 'true';

  if (!listeningAPIEvents) {
    authService.listen('regenerate_success', onRegenerateTokenSuccess(dispatch));
    authService.listen('regenerate_failure', onRegenerateTokenFailure(dispatch));
    listeningAPIEvents = true;
  }

  if (!token || (rememberMe && !refreshToken)) {
    storage.clear();
    return;
  }

  dispatch(setToken(token, rememberMe && refreshToken));

  return dispatch(userDetails());
};

const setLoginError = (error) => ({
  type: types.LOGIN_ERROR,
  payload: error,
});

export const login = (username, password, rememberMe) => (dispatch) => {
  let canceller = createCancelToken();

  storage.set('rememberMe', rememberMe);

  dispatch(loaderActions.setLoading(true));
  dispatch(setLoginError(null));

  authService.login(username, password, canceller)
    .then(({ data }) => {
      const { token, refresh_token } = data;
      
      dispatch(setToken(token, rememberMe && refresh_token));
      dispatch(userDetails(canceller));
    })
    .catch(({ response }) => {
      dispatch(
        setLoginError({
          message: response?.data?.message || 'Something wrong',
          status: response?.status || 500,
        })
      );
    })
    .finally(() => {
      dispatch(loaderActions.setLoading(false));
    });

  return canceller;
};

export const logout = () => (dispatch) => {
  storage.clear();
  dispatch({ type: types.LOGOUT });
};

export const userDetails =
  (cancelToken = null) =>
  (dispatch) => {
    const canceller = cancelToken || createCancelToken();

    dispatch(loaderActions.setLoading(true));

    authService.userDetails(canceller)
      .then(({ data }) => {
        const { roles } = data;
        if (!roles || roles.length === 0) {
          throw new Error("User doesn't have roles");
        }
        
        dispatch(setRoles(roles));
      })
      .catch((error) => {
        dispatch(logout());
      })
      .finally(() => {
        canceller.cancel();
        dispatch(loaderActions.setLoading(false));
      });

    return canceller;
  };
