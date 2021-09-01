import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

import AuthenticatedRoute from './AuthenticatedRoute';

const CATCH_ALL_ROUTE = '*';

export default function Routing({ routes, ...extraProps }) {
  let { path: matchedPath } = useRouteMatch();

  let IndexRoute = useRef(null);
  const Routes = useMemo(
    () =>
      routes.map((route, key) => {
        const { private: isPrivate, index, path, ...props } = route;
        const RouteType = isPrivate ? AuthenticatedRoute : Route;

        const trimmedMatchedPath = matchedPath.replace(/^\/$/, '');
        const trimmedPath = path.replace(/^\/$/, '');
        const realPath = path === CATCH_ALL_ROUTE ? path : `${trimmedMatchedPath}${trimmedPath}`;

        // Setup Index
        if (index && matchedPath !== realPath && realPath !== CATCH_ALL_ROUTE) {
          const { component: OrigComponent } = props;
          const render = () => (index === 'redirect' ? <Redirect to={{ pathname: realPath }} /> : <OrigComponent />);
          IndexRoute.current = <Route exact path={matchedPath} render={render} />;
        }

        return <RouteType {...props} {...extraProps} key={key} path={realPath} />;
      }),
    [routes, extraProps, matchedPath]
  );

  return (
    <Switch>
      {IndexRoute.current}
      {Routes}
    </Switch>
  );
}

Routing.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  loginPath: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
