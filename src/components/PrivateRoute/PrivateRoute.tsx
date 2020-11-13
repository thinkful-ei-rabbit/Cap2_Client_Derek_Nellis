import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { PrivatePublicRouteProps } from 'src/types/component-props';
import { UserContext } from 'src/context/userContext';
import LangProvider from 'src/context/langContext';

const PrivateRoute: PrivatePublicRouteProps = ({
  component,
  path,
  lang,
}) => {
  const Context = React.useContext(UserContext);
  const Component = component;
  const wrappedComponent = (routeProps: RouteProps) => (
    <LangProvider idle={Context?.idle}>
      <Component {...routeProps} />
    </LangProvider>
  );

  return (
    <Route
      path={path}
      render={(routeProps) => (
        <>
          {Context && Context.user && Context.user.id ? (
            lang ? (
              wrappedComponent(routeProps)
            ) : (
              <Component {...routeProps} />
            )
          ) : (
            <Redirect
              to={{
                pathname:
                  Context && Context.idle ? '/login' : '/register',
                state: { from: routeProps.location },
              }}
            />
          )}
        </>
      )}
    />
  );
};

export default PrivateRoute;
