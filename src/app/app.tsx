import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppProps } from 'src/types/component-props';
import {
  Header,
  PrivateRoute,
  PublicOnlyRoute,
} from 'src/components';

import {
  DashboardRoute,
  LearningRoute,
  RegistrationRoute,
  LoginRoute,
  NotFoundRoute,
} from 'src/routes';

const App: AppProps = () => {
  // const [hasError, setHasError] = React.useState<boolean>(false);

  // const getDerivedStateFromError = (error) => {
  //   console.error(error);
  //   return { hasError: true };
  // };

  return (
    <div className="App">
      <Header />
      <main>
        {/* <aside>{hasError && 'There was an error! Oh no!'}</aside> */}
        <Switch>
          <PrivateRoute
            exact
            path={'/'}
            lang={true}
            component={DashboardRoute}
          />
          <PrivateRoute
            path="/learn"
            lang={true}
            component={LearningRoute}
          />
          <PublicOnlyRoute
            path={'/register'}
            component={RegistrationRoute}
          />
          <PublicOnlyRoute path={'/login'} component={LoginRoute} />
          <Route component={NotFoundRoute} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
