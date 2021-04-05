import React, { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/BackOffice';

const PATH = '/back-office';

const Auth = lazy(() => import('client/ui/modules/BackOffice/Auth'));
const Restourant = lazy(() => import('client/ui/modules/BackOffice/Restourant'));
const Restourants = lazy(() => import('client/ui/modules/BackOffice/Restourants'));
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
                `${PATH}/restourants/archive/:restaurant`,
                `${PATH}/restourants/:restaurant`,
              ]}
              component={Restourant}
            />
            <Route
              path={[
                `${PATH}/restourants/archive`,
                `${PATH}/restourants`,
              ]}
              component={Restourants}
            />
            <Route
              path={`${PATH}/users/:user`}
              component={User}
            />
            <Route
              path={`${PATH}/users`}
              component={Users}
            />
            <Redirect to={`${PATH}/restourants`} />
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
