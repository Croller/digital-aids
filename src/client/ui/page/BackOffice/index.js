import React, { lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/BackOffice';

const PATH = '/back-office';

const Auth = lazy(() => import('client/ui/modules/BackOffice/Auth'));

export const BackOffice = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path={`${PATH}/auth`} component={Auth} />
      </Switch>
    </Layout>
  
  );
};

export default BackOffice;
