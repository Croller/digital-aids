import React, { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/BackOffice';

const PATH = '/back-office';

const Auth = lazy(() => import('client/ui/modules/BackOffice/Auth'));
const Restaurant = lazy(() => import('client/ui/modules/BackOffice/RestaurantForm'));
const Restaurants = lazy(() => import('client/ui/modules/BackOffice/Restaurants'));
const User = lazy(() => import('client/ui/modules/BackOffice/User'));
const Users = lazy(() => import('client/ui/modules/BackOffice/Users'));
const Category = lazy(() => import('client/ui/modules/BackOffice/Category'));

export const BackOffice = () => {
  const { token } = useSelector(store => store.user.info);

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Layout>
      <Switch>
        {token ? (
          <>
            <Route
              exact
              path={[
                `${PATH}/restaurant/:restaurant/language/:lng/special-deals/archive`,
                `${PATH}/restaurant/:restaurant/language/:lng/special-deals`,
                `${PATH}/restaurant/:restaurant/language/:lng/foodtips/archive`,
                `${PATH}/restaurant/:restaurant/language/:lng/foodtips`,
              ]}
              component={Restaurant}
            />
            <Route
              exact
              path={[
                `${PATH}/restaurant/:restaurant/language/:lng/category/:category/dishes/archive`,
                `${PATH}/restaurant/:restaurant/language/:lng/category/:category/dishes`,
              ]}
              component={Category}
            />
            <Route
              path={[
                `${PATH}/restaurants/archive`,
                `${PATH}/restaurants`,
              ]}
              component={Restaurants}
            />
            <Route
              exact
              path={`${PATH}/restaurant/:restaurant`}
              component={Restaurant}
            />
            <Route
              path={[
                `${PATH}/users/archive`,
                `${PATH}/users`,
              ]}
              component={Users}
            />
            <Route
              path={[
                `${PATH}/user/:user`,
                `${PATH}/profile/:user`,
              ]}
              component={User}
            />
            <Redirect to={`${PATH}/restaurants`} />
          </>
        ) : (
          <>
            <Route path={`${PATH}/auth`} component={Auth} />
            <Redirect to={`${PATH}/auth`} />
          </>
        )}
      </Switch>
    </Layout>
  
  );
};

export default BackOffice;
