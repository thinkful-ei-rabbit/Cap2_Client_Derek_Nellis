import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { PrivatePublicRouteProps } from 'src/types/component-props';
import { UserContext } from 'src/context/userContext';

const PublicOnlyRoute: PrivatePublicRouteProps = ({
  component,
  path,
}) => {
  const Context = React.useContext(UserContext);
  const Component = component;

  return (
    <Route
      path={path}
      render={(routeProps) => (
        <>
          {Context && Context.user && Context.user.id ? (
            <Redirect to={'/'} />
          ) : (
            <Component {...routeProps} />
          )}
        </>
      )}
    />
  );
};

export default PublicOnlyRoute;
