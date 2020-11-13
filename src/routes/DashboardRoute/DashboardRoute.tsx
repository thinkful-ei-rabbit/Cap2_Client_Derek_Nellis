import React from 'react';

import { DashboardRouteProps } from 'src/types/component-props';
import { ChooseLang } from 'src/components';

const DashboardRoute: DashboardRouteProps = () => {
  return (
    <>
      <ChooseLang />
    </>
  );
};

export default DashboardRoute;
