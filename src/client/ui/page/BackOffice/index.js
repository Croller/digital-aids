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
import { getAccess } from 'client/utils/common';

const PATH = '/back-office';

const Auth = lazy(() => import('client/ui/modules/BackOffice/Auth'));
const Restaurant = lazy(() => import('client/ui/modules/BackOffice/Restaurant'));
const Flyer = lazy(() => import('client/ui/modules/BackOffice/Flyer'));
const Restaurants = lazy(() => import('client/ui/modules/BackOffice/Restaurants'));
const Account = lazy(() => import('client/ui/modules/BackOffice/Account'));
const Users = lazy(() => import('client/ui/modules/BackOffice/Users'));
const Category = lazy(() => import('client/ui/modules/BackOffice/Category'));
const Reservations = lazy(() => import('client/ui/modules/BackOffice/Reservations'));
const Opinions = lazy(() => import('client/ui/modules/BackOffice/Opinions'));
const Notify = lazy(() => import('client/ui/modules/BackOffice/Notify'));
const Orders = lazy(() => import('client/ui/modules/BackOffice/Orders'));
const Mails = lazy(() => import('client/ui/modules/BackOffice/Mails'));

export const BackOffice = () => {
  const params = useParams();
  const { info: { token, login }, roles } = useSelector(store => store.user);
  const access = token && getAccess({ role: 'account', roles });

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  useEffect(() => {
    if (!params.restaurant) {
      closeSocket();
    }
  }, [params.restaurant, login]);

  return (
    <Layout>
      <Switch>
        <Route path={`${PATH}/auth`} component={Auth} />
        {access && (
          <Route>
            <Switch>
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
                  `${PATH}/restaurant/:restaurant/language/:language/dashboard`,
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
                exact
                path={[
                  `${PATH}/users/:user`,
                  `${PATH}/users`,
                ]}
                component={Users}
              />
              <Route
                path={`${PATH}/account`}
                component={Account}
              />
              <Route
                path={[
                  `${PATH}/mails`,
                ]}
                component={Mails}
              />
              <Redirect to={`${PATH}/restaurants`} />
            </Switch>
          </Route>
        )}
        <Redirect to={`${PATH}/auth`} />
      </Switch>
    </Layout>
  
  );
};

export default BackOffice;
