import React, { Suspense, lazy, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';

import { ErrorBoundary } from 'client/ui/components/_base/ErrorBoundary';
import { ScrollToTop } from 'client/ui/components/_base/ScrollToTop';
import { Loader } from 'client/ui/components/_base/Loader';
import { Page404 } from 'client/ui/page/common/404';

const Restaurant = lazy(() => import('client/ui/page/front/Restaurant'));

export const Routers = () => {
  const history = useHistory();
  const handleRoute = useCallback((path) => history.push(path), []);

  return (
    <React.Fragment>
      <Helmet>
        <title>
          Digital Carte
        </title>
      </Helmet>
      <ErrorBoundary onClick={() => handleRoute('/restaurant/categories')}>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/restaurant/*" component={Restaurant} />
              <Route path="/404">
                <Page404 onClick={() => handleRoute('/restaurant/categories')} />
              </Route>
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </ErrorBoundary>
    </React.Fragment>
  );
};
