import React from 'react';

import { NotFoundRouteProps } from 'src/types/component-props';

const NotFoundRoute: NotFoundRouteProps = () => {
  return (
    <section>
      <h2>404 - Page not found</h2>
      <p>Try going back to your previous page.</p>
    </section>
  );
};

export default NotFoundRoute;
