import React, {
  Suspense,
  lazy,
} from 'react';
import { Helmet } from 'react-helmet';
import {
  Route,
  Switch,
} from 'react-router-dom';

const PageBuilder = lazy(() => import('client/ui/page/PageBuilder'));

export const Routers = () => (
  <React.Fragment>
    <Helmet>
      <title>
        Boilerplate Client
      </title>
    </Helmet>
    <Suspense fallback>
      <Switch>
        <Route path="/" component={PageBuilder} />
      </Switch>
    </Suspense>
  </React.Fragment>
);
