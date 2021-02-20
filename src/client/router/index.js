import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Loader } from 'client/ui/components/base/Loader';
import { ErrorBoundary } from 'client/ui/components/base/ErrorBoundary';
import { ScrollToTop } from 'client/ui/components/base/ScrollToTop';

const Page404 = lazy(() => import('client/ui/page/common/404'));
const Restaurant = lazy(() => import('client/ui/page/front/Restaurant'));

export const Routers = () => (
  <React.Fragment>
    <Helmet>
      <title>
        Digital Carte
      </title>
    </Helmet>
    <ErrorBoundary>
      <Router>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/restaurant/*" component={Restaurant} />
              <Route path="/404" component={Page404} />
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Router>
    </ErrorBoundary>
  </React.Fragment>
);
