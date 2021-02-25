import React, { Suspense, lazy, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from 'react-router-dom';

import { ErrorBoundary } from 'client/ui/components/_base/ErrorBoundary';
import { ScrollToTop } from 'client/ui/components/_base/ScrollToTop';
import { Loader } from 'client/ui/components/_base/Loader';

const Restaurant = lazy(() => import('client/ui/page/front/Restaurant'));
const Page404 = lazy(() => import('client/ui/page/common/404'));

export const Routers = () => {
  const { key } = useSelector(store => store.restaurant);
  const history = useHistory();
  const handleRoute = useCallback(() => history.push(`/restaurant/${key}/categories`), []);

  return (
    <React.Fragment>
      <Helmet>
        <title>
          Digital Carte
        </title>
      </Helmet>
      <ErrorBoundary onClick={handleRoute}>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/restaurant/*" component={Restaurant} />
              <Route path="/404">
                <Page404 onClick={handleRoute} />
              </Route>
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </ErrorBoundary>
    </React.Fragment>
  );
};
