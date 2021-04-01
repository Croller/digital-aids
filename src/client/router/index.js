import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
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
import {
  setLocalStorage,
  removeLocalStorage,
} from 'client/utils/localStorage';

import { ErrorBoundary } from 'client/ui/components/_base/ErrorBoundary';
import { ScrollToTop } from 'client/ui/components/_base/ScrollToTop';
import { Loader } from 'client/ui/components/_base/Loader';

const BackOffice = lazy(() => import('client/ui/page/BackOffice'));
const Restaurant = lazy(() => import('client/ui/page/Restaurant'));
const Present = lazy(() => import('client/ui/page/Present'));
const Page404 = lazy(() => import('client/ui/page/404'));

export const Routers = () => {
  const localKey = 'DigitalCarte';
  const { logo, key } = useSelector(store => store.restaurant.info);
  const history = useHistory();
  const [t] = useTranslation();

  const handleRoute = useCallback((path = 'categories') => history.push(`/restaurant/${key}/${path}`), []);

  const initLocalStorage = () => {
    removeLocalStorage(localKey);
    setLocalStorage(localKey, {
      user: {},
      restaurant: {},
      offersViewed: [],
      cookies: false,
    });
  };

  useEffect(() => {
    initLocalStorage();
    
    return () => {
      removeLocalStorage(localKey);
    };
  }, []);

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
              <Route exact path="/back-office/*" component={BackOffice} />
              <Route exact path="/restaurant/*" component={Restaurant} />
              <Route exact component={Present} />
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
