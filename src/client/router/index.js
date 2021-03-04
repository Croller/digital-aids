import React, { Suspense, lazy, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { logo, key } = useSelector(store => store.restaurant);
  const history = useHistory();
  const [t] = useTranslation();
  const handleRoute = useCallback((path = 'categories') => history.push(`/restaurant/${key}/${path}`), []);

  return (
    <React.Fragment>
      <Helmet>
        <title>
          Digital Carte
        </title>
      </Helmet>
      <ErrorBoundary t={t} onClick={handleRoute}>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/restaurant/*" component={Restaurant} />
              <Route path="/404">
                <Page404
                  source={logo}
                  onClick={handleRoute}
                />
              </Route>
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </ErrorBoundary>
    </React.Fragment>
  );
};
