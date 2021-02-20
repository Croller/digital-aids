import React, { Suspense, lazy } from 'react';
import {
  Redirect,
  browserHistory,
  BrowserRouter,
} from 'react-router-dom';
import { Switch, Route } from 'react-router';

import { Loader } from 'client/ui/components/base/Loader';
import { ErrorBoundary } from 'client/ui/components/base/ErrorBoundary';
import { Layout } from 'client/ui/components/Layout';
import { ScrollToTop } from 'client/ui/components/base/ScrollToTop';

const Page404 = lazy(() => import('client/ui/page/common/404'));
const Main = lazy(() => import('client/ui/page/front/Main'));
const Restaurant = lazy(() => import('client/ui/page/front/Restaurant'));
const RestaurantMenu = lazy(() => import('client/ui/page/front/RestaurantMenu'));

export const Routers = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <ScrollToTop>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Layout>
              <Switch>
                <Route exact path="/" component={Main} />
                {/* <Route path="/restaurant/:restaurantName" component={RestaurantMenu} /> */}
                {/* <Route path="/:restaurantName/info" component={Restaurant} /> */}
                {/* <Redirect to="/404"  /> */}
              </Switch>
            </Layout>
            {/* <Route path="*" component={Page404} /> */}
            <Route component={Page404} />
          </Switch>
        </Suspense>
      </ScrollToTop>
    </BrowserRouter>
  </ErrorBoundary>
);
