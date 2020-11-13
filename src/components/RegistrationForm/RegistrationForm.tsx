import React from 'react';
import { Link } from 'react-router-dom';

import './RegistrationForm.scss';

import { RegistrationFormProps } from 'src/types/component-props';
import { AuthApiService } from 'src/services';
import { Input, Required, Label, Button } from 'src/components';

const RegistrationForm: RegistrationFormProps = ({
  onRegistrationSuccess,
}) => {
  const [error, setError] = React.useState<{ error: string } | null>(
    null,
  );
  const firstInput = React.createRef<HTMLInputElement>();

  React.useEffect(() => {
    if (firstInput && firstInput.current) {
      firstInput.current.focus();
    }
  }, [firstInput]);

  const handleSubmit = async (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    const target = ev.target as typeof ev.target & {
        name: { value: string };
        username: { value: string };
        password: { value: string };
      },
      { name, username, password } = target;

    const res = await AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    });

    if ('error' in res) {
      setError({ error: res.error });
      return;
    }

    name.value = '';
    username.value = '';
    password.value = '';
    onRegistrationSuccess();
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div role="alert">
        <p>{error && error.error}</p>
      </div>
      <div>
        <Label htmlFor="registration-name-input">
          Enter your name
          <Required />
        </Label>
        <Input
          ref={firstInput}
          id="registration-name-input"
          name="name"
          required
        />
      </div>
      <div>
        <Label htmlFor="registration-username-input">
          Choose a username
          <Required />
        </Label>
        <Input
          id="registration-username-input"
          name="username"
          required
        />
      </div>
      <div>
        <Label htmlFor="registration-password-input">
          Choose a password
          <Required />
        </Label>
        <Input
          id="registration-password-input"
          name="password"
          type="password"
          required
        />
      </div>
      <footer>
        <Button type="submit">Sign up</Button>
        <Link to="/login">Already have an account?</Link>
      </footer>
    </form>
  );
};

export default RegistrationForm;
