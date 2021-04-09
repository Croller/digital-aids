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
              path={[
                `${PATH}/restaurant/:restaurant/special-deals/archive`,
                `${PATH}/restaurant/:restaurant/special-deals`,
                `${PATH}/restaurant/:restaurant/foodtips/archive`,
                `${PATH}/restaurant/:restaurant/foodtips`,
              ]}
              component={Restaurant}
            />
            <Route
              path={[
                `${PATH}/restaurant/:restaurant/category/:category/archive`,
                `${PATH}/restaurant/:restaurant/category/:category`,
                `${PATH}/restaurant/:restaurant/category`,
              ]}
              component={Restaurant}
            />
            <Route
              path={[
                `${PATH}/restaurants/archive`,
                `${PATH}/restaurants`,
              ]}
              component={Restaurants}
            />
            <Route
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
