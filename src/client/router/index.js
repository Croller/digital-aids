import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import { withRouter } from 'react-router';

import { Loader } from 'client/ui/components/base/Loader';
import { ErrorBoundary } from 'client/ui/components/base/ErrorBoundary';
import { Layout } from 'client/ui/components/Layout';

const Page404 = lazy(() => import('client/ui/page/404'));
const Main = lazy(() => import('client/ui/page/Main'));
const Restaurant = lazy(() => import('client/ui/page/Restaurant'));
const RestaurantMenu = lazy(() => import('client/ui/page/RestaurantMenu'));

export const Routers = withRouter(() => (
  <ErrorBoundary>
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Layout>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/:restaurantName" component={RestaurantMenu} />
              <Route exact path="/:restaurantName/info" component={Restaurant} />
            </Switch>
          </Layout>
          <Route path="*" component={Page404} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  </ErrorBoundary>
));
