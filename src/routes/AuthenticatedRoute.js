import React from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory, useLocation } from 'react-router-dom';

export default function AuthenticatedRoute({ isAuthenticated, loginPath, ...props }) {
  const history = useHistory();
  const location = useLocation();

  if (!isAuthenticated) {
    setTimeout(() => history.replace(loginPath, { from: location }), 0);
    return null;
  }

  return <Route {...props} />;
}

AuthenticatedRoute.propTypes = {
  loginPath: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
