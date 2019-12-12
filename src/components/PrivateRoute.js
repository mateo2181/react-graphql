import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkToken } from '../utils/storage';

let PrivateRoute = ({ logged, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (checkToken()) ?
        (<Component {...props} />)
        :
        (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
    }
  />
);

export default PrivateRoute;