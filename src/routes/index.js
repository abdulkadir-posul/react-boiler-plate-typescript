import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Routing from './Routing';
import { LoginPage, SamplePage, NotFoundPage } from '../pages';
import { actions as userActions } from '../store/user';
import NewPage from '../pages/NewPage';

const loginPath = '/login';

function Logout() {
  const dispatch = useDispatch();
  dispatch(userActions.logout());
  return <Redirect to={{ pathname: loginPath }} />;
}

const routes = [
  {
    path: '/logout',
    component: Logout,
    exact: true,
  },
  {
    path: '/login',
    component: LoginPage,
    exact: true,
  },
  {
    private: true,
    index: 'redirect',
    path: '/sample',
    component: SamplePage,
    exact: true,
  },
  {
    private: true,
    path: '/newPage',
    component: NewPage,
    exact: true
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default function AppRoutes() {
  const isAuthenticated = useSelector((state) => state.user.logged);
  const props = {
    isAuthenticated,
    loginPath,
  };

  return <Routing routes={routes} {...props} />;
}
