import React, { lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/Present';

const Main = lazy(() => import('client/ui/modules/front/Present/Main'));

export const Present = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path={'/*'} component={Main} />
      </Switch>
    </Layout>
  
  );
};

export default Present;
