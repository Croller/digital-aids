import React, { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { closeSocket } from 'client/providers/socket';
import {
  Route,
  Switch,
  Redirect,
  useParams,
} from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/BackOffice';

const PATH = '/back-office';

const Auth = lazy(() => import('client/ui/modules/BackOffice/Auth'));
const Restaurant = lazy(() => import('client/ui/modules/BackOffice/Restaurant'));
const Flyer = lazy(() => import('client/ui/modules/BackOffice/Flyer'));
const Restaurants = lazy(() => import('client/ui/modules/BackOffice/Restaurants'));
const User = lazy(() => import('client/ui/modules/BackOffice/User'));
const Users = lazy(() => import('client/ui/modules/BackOffice/Users'));
const Category = lazy(() => import('client/ui/modules/BackOffice/Category'));
const Reservations = lazy(() => import('client/ui/modules/BackOffice/Reservations'));
const Opinions = lazy(() => import('client/ui/modules/BackOffice/Opinions'));
const Notify = lazy(() => import('client/ui/modules/BackOffice/Notify'));
const Orders = lazy(() => import('client/ui/modules/BackOffice/Orders'));
const Mails = lazy(() => import('client/ui/modules/BackOffice/Mails'));

export const BackOffice = () => {
  const params = useParams();
  const { token, roles } = useSelector(store => store.user.info);

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  useEffect(() => {
    if (!params.restaurant) {
      closeSocket();
    }
  }, [params.restaurant]);

  return (
    <Layout>
      <Switch>
        <Route path={`${PATH}/auth`} component={Auth} />
        {token && [1, 2, 3, 4].some(s => roles.some(r => r === s)) && (
          <>
            <Route
              exact
              path={[
                `${PATH}/restaurant/:restaurant/reserve/archive`,
                `${PATH}/restaurant/:restaurant/reserve`,
              ]}
              component={Reservations}
            />
            <Route
              exact
              path={[
                `${PATH}/restaurant/:restaurant/opinions/archive`,
                `${PATH}/restaurant/:restaurant/opinions`,
              ]}
              component={Opinions}
            />
            <Route
              exact
              path={[
                `${PATH}/restaurant/:restaurant/notify/archive`,
                `${PATH}/restaurant/:restaurant/notify`,
              ]}
              component={Notify}
            />
            <Route
              exact
              path={[
                `${PATH}/restaurant/:restaurant/orders/archive`,
                `${PATH}/restaurant/:restaurant/orders`,
              ]}
              component={Orders}
            />
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
              path={`${PATH}/restaurant/:restaurant/flyer`}
              component={Flyer}
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
