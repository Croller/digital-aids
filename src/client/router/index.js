import React, {
  Suspense,
  lazy,
  useCallback,
} from 'react';
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
import { Loader } from 'client/ui/components/_block/Loader';

const BackOffice = lazy(() => import('client/ui/page/BackOffice'));
const Restaurant = lazy(() => import('client/ui/page/Restaurant'));
const Present = lazy(() => import('client/ui/page/Present'));
const Page404 = lazy(() => import('client/ui/page/404'));

export const Routers = () => {
  const { logo, key } = useSelector(store => store.restaurant.info);
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
              <Route path="/back-office" component={BackOffice} />
              <Route path="/restaurant/:restaurant" component={Restaurant} />
              <Route path="*" component={Present} />
              <Route path="/404">
                <Page404 source={logo} onClick={handleRoute} />
              </Route>
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </ErrorBoundary>
    </React.Fragment>
  );
};
