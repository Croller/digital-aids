import React, { lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/Present';

const Main = lazy(() => import('client/ui/modules/front/Present/Main'));
const Tutorial = lazy(() => import('client/ui/modules/front/Present/Tutorial'));
const PrivacyPolicy = lazy(() => import('client/ui/modules/front/Present/PrivacyPolicy'));

export const Present = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/tutorial" component={Tutorial} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/*" component={Main} />
      </Switch>
    </Layout>
  );
};

export default Present;
