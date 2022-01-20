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
} from 'react-router-dom';

import { ErrorBoundary } from 'client/ui/components/_base/ErrorBoundary';
import { ScrollToTop } from 'client/ui/components/_base/ScrollToTop';
import { Loader } from 'client/ui/components/_ui/Loader';

export const Routers = () => {
  const history = useHistory();
  const [t] = useTranslation();
  const handleRoute = useCallback(() => history.push('/'), []);

  return (
    <>
      <Helmet>
        <title>
          TemplateProject
        </title>
      </Helmet>
      <ErrorBoundary t={t} onClick={handleRoute}>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
   
              {/* <Route path="/404">
                <Page404 onClick={handleRoute} />
              </Route>
              <Route path="*" component={Present} />
              <Redirect to="/404" /> */}
            </Switch>
          </Suspense>
        </ScrollToTop>
      </ErrorBoundary>
    </>
  );
};
