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

const Page404 = lazy(() => import('client/ui/page/404'));
const Main = lazy(() => import('client/ui/page/Main'));

export const Routers = withRouter(() => (
  <ErrorBoundary>
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="*" component={Page404} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  </ErrorBoundary>
));
