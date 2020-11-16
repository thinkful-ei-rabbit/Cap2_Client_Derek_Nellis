import React from 'react';

import { RegistrationRouteProps } from '../../types/component-props.d';
import { AuthApiService } from 'src/services';
import { UserContext } from 'src/context/userContext';
import { RegistrationForm } from 'src/components';

const RegistrationRoute: RegistrationRouteProps = ({
  location,
  history,
}) => {
  const context = React.useContext(UserContext);

  const handleRegistrationSuccess = async (
    username: string,
    password: string,
  ) => {
    const res = await AuthApiService.postLogin({
      username,
      password,
    });

    if ('error' in res) {
      console.error({ error: res.error });
      return;
    }

    if (res.authToken === undefined) {
      console.error({ error: 'Database error' });
      return;
    }

    context && context.processLogin(res.authToken);
    const destination = (location.state || {}).from || '/';
    history.push('/');
  };

  return (
    <section>
      <p style={{ fontStyle: 'italic' }}>
        Practice learning a language with the spaced reptition
        revision technique.
      </p>
      <h2>Sign up</h2>
      <RegistrationForm
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </section>
  );
};

export default RegistrationRoute;
