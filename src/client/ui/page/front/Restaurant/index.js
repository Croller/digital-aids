import React, { lazy, useEffect } from 'react';
import { Layout } from 'client/ui/components/Layout';
import { Route, Switch } from 'react-router-dom';

const PATH = '/restaurant';

const Language = lazy(() => import('client/ui/page/common/Language'));
const Menu = lazy(() => import('client/ui/modules/front/Restaurant/Menu'));
const Categories = lazy(() => import('client/ui/modules/front/Restaurant/Categories'));
const Opinion = lazy(() => import('client/ui/modules/front/Restaurant/Opinion'));
const Reglament = lazy(() => import('client/ui/modules/front/Restaurant/Reglament'));

export const Restaurant = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path={`${PATH}/:restaurant/language`} component={Language} />
        <Route path={`${PATH}/:restaurant/menu`} component={Menu} />
        <Route path={`${PATH}/:restaurant/categories`} component={Categories} />
        <Route path={`${PATH}/:restaurant/categories/:category`} component={Categories} />
        <Route path={`${PATH}/:restaurant/opinion`} component={Opinion} />
        <Route path={`${PATH}/:restaurant/reglament`} component={Reglament} />
        <Route path={`${PATH}/:restaurant/information`} component={Categories} />
      </Switch>
    </Layout>
  );
};

export default Restaurant;
