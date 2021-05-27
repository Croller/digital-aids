import React, { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/BackOffice';

const PATH = '/back-office';

const Auth = lazy(() => import('client/ui/modules/BackOffice/Auth'));
const Restaurant = lazy(() => import('client/ui/modules/BackOffice/Restaurant'));
const Flayer = lazy(() => import('client/ui/modules/BackOffice/Flayer'));
const Restaurants = lazy(() => import('client/ui/modules/BackOffice/Restaurants'));
const User = lazy(() => import('client/ui/modules/BackOffice/User'));
const Users = lazy(() => import('client/ui/modules/BackOffice/Users'));
const Category = lazy(() => import('client/ui/modules/BackOffice/Category'));
const Mails = lazy(() => import('client/ui/modules/BackOffice/Mails'));

export const BackOffice = () => {
  const { token, roles } = useSelector(store => store.user.info);

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path={`${PATH}/auth`} component={Auth} />
        {token && [1, 2, 3, 4].some(s => roles.some(r => r === s)) && (
          <>
            <Route
              exact
              path={[
                `${PATH}/restaurant/:restaurant/language/:language/special-deals/archive`,
                `${PATH}/restaurant/:restaurant/language/:language/special-deals`,
                `${PATH}/restaurant/:restaurant/language/:language/foodtips/archive`,
                `${PATH}/restaurant/:restaurant/language/:language/foodtips`,
                `${PATH}/restaurant/:restaurant/language/:language/menu/archive`,
                `${PATH}/restaurant/:restaurant/language/:language/menu`,
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
              path={`${PATH}/restaurant/:restaurant/qrcode`}
              component={Flayer}
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
            <Route
              path={[
                `${PATH}/mails`,
              ]}
              component={Mails}
            />
            <Redirect to={`${PATH}/restaurants`} />
          </>
        )}
        <Redirect to={`${PATH}/auth`} />
      </Switch>
    </Layout>
  
  );
};

export default BackOffice;
