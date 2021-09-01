import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { actions as userActions } from '../../store/user';

export default function Login() {
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state) => state.user.logged);
  const [username] = useState('');
  const [password] = useState('');
  const [rememberMe] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  let {
    from: { pathname },
  } = location.state || { from: { pathname: '/' } };
  const cancellerLoginRequest = useRef(null);

  useEffect(() => {
    !isLoggedIn && dispatch(userActions.init());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    return () => {
      cancellerLoginRequest.current && cancellerLoginRequest.current.cancel();
    };
  }, []);

  const doLogin = ({ username, password, rememberMe }) => {
   
    cancellerLoginRequest.current && cancellerLoginRequest.current.cancel();
    cancellerLoginRequest.current = dispatch(userActions.login(username, password, rememberMe));
  };

  if (isLoggedIn) {
    setTimeout(() => history.replace(pathname), 0);
    return null;
  }

  return (
    <div className="login-page">
      <h1>{config.name}</h1>
      <input></input>
      <br></br>
      <br></br>
      <input type="password"></input>
      <br></br>
      <br></br>
      <button onClick={()=>doLogin(username, password, rememberMe)}>{t('Login')}</button>
    </div>
  );
}
