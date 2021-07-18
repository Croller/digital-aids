import React, {
  Suspense,
  lazy,
  useCallback,
} from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { ErrorBoundary } from 'client/ui/components/_base/ErrorBoundary';
import { ScrollToTop } from 'client/ui/components/_base/ScrollToTop';
import { Loader } from 'client/ui/components/_block/Loader';

const BackOffice = lazy(() => import('client/ui/page/BackOffice'));
const Restaurant = lazy(() => import('client/ui/page/Restaurant'));
const Verify = lazy(() => import('client/ui/page/Verify'));
const Page404 = lazy(() => import('client/ui/page/404'));
const Present = lazy(() => import('client/ui/page/Present'));

export const Routers = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [t] = useTranslation();
  console.log('pathname', pathname);
  const handleRoute = useCallback(() => history.push(pathname.split('/').slice(0, -1).join('/')), []);

  return (
    <React.Fragment>
      <Helmet>
        <title>
          Digital Aids
        </title>
      </Helmet>
      <ErrorBoundary t={t} onClick={handleRoute}>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path="/verify" component={Verify} />
              <Route path="/back-office" component={BackOffice} />
              <Route path="/restaurant" component={Restaurant} />
              <Route path="/404">
                <Page404 onClick={handleRoute} />
              </Route>
              <Route path="*" component={Present} />
              <Redirect to="/404" />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </ErrorBoundary>
    </React.Fragment>
  );
};
