import React from 'react';

import './LoginForm.scss';

import { LoginFormProps } from 'src/types/component-props';
import { AuthApiService } from 'src/services';
import { UserContext } from 'src/context/userContext';
import { Input, Label, Button } from 'src/components';

const LoginForm: LoginFormProps = ({ onLoginSuccess }) => {
  const [error, setError] = React.useState<{ error: string } | null>(
    null,
  );
  const context = React.useContext(UserContext);
  const firstInput = React.createRef<HTMLInputElement>();

  React.useEffect(() => {
    if (firstInput && firstInput.current) {
      firstInput.current.focus();
    }
  }, [firstInput]);

  const handleSubmit = async (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    const target = ev.target as typeof ev.target & {
        username: { value: string };
        password: { value: string };
      },
      { username, password } = target;

    setError(null);

    const res = await AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    });

    if ('error' in res) {
      setError({ error: res.error });
      return;
    }

    if (res.authToken === undefined) {
      setError({ error: 'Database error' });
      return;
    }

    username.value = '';
    password.value = '';
    context && context.processLogin(res.authToken);
    onLoginSuccess();
  };

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <div role="alert">
        <p>{error && error.error}</p>
      </div>
      <div>
        <Label htmlFor="login-username-input">Username</Label>
        <Input
          ref={firstInput}
          id="login-username-input"
          name="username"
          required
        />
      </div>
      <div>
        <Label htmlFor="login-password-input">Password</Label>
        <Input
          id="login-password-input"
          name="password"
          type="password"
          required
        />
      </div>
      <footer>
        <Button type="submit">Login</Button>
      </footer>
    </form>
  );
};

export default LoginForm;
