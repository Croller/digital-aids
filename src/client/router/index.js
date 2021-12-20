import React, {
  Suspense,
  lazy,
} from 'react';
import { Helmet } from 'react-helmet';
import {
  Route,
  Switch,
} from 'react-router-dom';

// const BackOffice = lazy(() => import('client/ui/page/BackOffice'));

export const Routers = () => (
  <React.Fragment>
    <Helmet>
      <title>
        Boilerplate Client
      </title>
    </Helmet>
    <Suspense fallback>
      <Switch>
        {/* <Route path="/verify" component={Verify} /> */}
      </Switch>
    </Suspense>
  </React.Fragment>
);
