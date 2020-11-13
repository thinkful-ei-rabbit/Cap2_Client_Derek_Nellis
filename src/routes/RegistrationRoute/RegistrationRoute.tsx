import React from 'react';

import { RegistrationRouteProps } from '../../types/component-props.d';
import { RegistrationForm } from 'src/components';

const RegistrationRoute: RegistrationRouteProps = ({ history }) => {
  const handleRegistrationSuccess = () => {
    history.push('/login');
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
