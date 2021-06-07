import React, { lazy, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/Present';

const Main = lazy(() => import('client/ui/modules/Present/Main'));
const Tutorial = lazy(() => import('client/ui/modules/Present/Tutorial'));
const PrivacyPolicy = lazy(() => import('client/ui/modules/Present/PrivacyPolicy'));
const Search = lazy(() => import('client/ui/modules/Present/Search'));

export const Present = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Layout>
      <Switch>
        <Route exac path="/tutorial" component={Tutorial} />
        <Route exac path="/privacy-policy" component={PrivacyPolicy} />
        <Route exac path="/restaurants/search" component={Search} />
        <Route path="*" component={Main} />
        <Redirect to="*" />
      </Switch>
    </Layout>
  );
};

export default Present;
