import React from 'react';

import { LoginRouteProps } from 'src/types/component-props';
import { LoginForm } from 'src/components';

const LoginRoute: LoginRouteProps = ({ location, history }) => {
  const handleLoginSuccess = () => {
    const destination = (location.state || {}).from || '/';
    history.push(destination);
  };

  return (
    <section>
      <h2>Login</h2>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </section>
  );
};

export default LoginRoute;
