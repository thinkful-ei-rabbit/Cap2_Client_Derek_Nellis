import React from 'react';

import {
  AuthApiService,
  IdleService,
  TokenService,
} from 'src/services';

export const UserContext = React.createContext<UC.UserContextValue | null>(
  null,
);

const UserProvider: UC.UserProviderProps = ({ children }) => {
  const jwtPayload = TokenService.parseAuthToken();
  const [dbUser, setDbUser] = React.useState<UC.UserState>(
    jwtPayload
      ? {
          user: {
            id: jwtPayload.user_id,
            name: jwtPayload.name,
            username: jwtPayload.sub,
          },
          error: null,
          idle: false,
        }
      : { user: null, error: null, idle: false },
  );

  const fetchRefreshToken = React.useCallback(async () => {
    const res = await AuthApiService.refreshToken();

    if ('error' in res) {
      setDbUser({ ...dbUser, error: res.error });
      return;
    }

    TokenService.saveAuthToken(res.authToken);
    TokenService.queueCallbackBeforeExpiry(() => {
      fetchRefreshToken();
    });
  }, [dbUser]);

  const logoutBecauseIdle = React.useCallback(() => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    setDbUser({ ...dbUser, user: null, idle: true });
  }, [dbUser]);

  React.useEffect(() => {
    IdleService.setIdleCallback(logoutBecauseIdle);

    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        fetchRefreshToken();
      });
    } else {
      IdleService.unRegisterIdleResets();
      TokenService.clearCallbackBeforeExpiry();
    }
  }, [dbUser, fetchRefreshToken, logoutBecauseIdle]);

  const setError = (error: string) => {
    console.error(error);
    setDbUser({ ...dbUser, error });
  };

  const clearError = () => {
    setDbUser({ ...dbUser, error: null });
  };

  const setUser = (user: UC.User | null) => {
    setDbUser({ ...dbUser, user });
  };

  const processLogin = (authToken: string) => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload) {
      setUser({
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      });
    }

    IdleService.regiserIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      fetchRefreshToken();
    });
  };

  const processLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    setUser(null);
  };

  const value: UC.UserContextValue = {
    user: dbUser.user,
    error: dbUser.error,
    idle: dbUser.idle,
    setError,
    clearError,
    setUser,
    processLogin,
    processLogout,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
