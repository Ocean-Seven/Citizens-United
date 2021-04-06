import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => (
        currentUser
          ? <Component {...props} user={user} />
          : <Redirect to="/home" />
      )}
    />
  );
}

export default PrivateRoute;