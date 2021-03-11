import React, { lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/Restaurant';

const PATH = '/restaurant';

const Language = lazy(() => import('client/ui/page/common/Language'));
const Menu = lazy(() => import('client/ui/modules/front/Restaurant/Menu'));
const Categories = lazy(() => import('client/ui/modules/front/Restaurant/Categories'));
const Category = lazy(() => import('client/ui/modules/front/Restaurant/Category'));
const Opinion = lazy(() => import('client/ui/modules/front/Restaurant/Opinion'));
const Information = lazy(() => import('client/ui/modules/front/Restaurant/Information'));
const FoodTips = lazy(() => import('client/ui/modules/front/Restaurant/FoodTips'));
const Reglament = lazy(() => import('client/ui/modules/front/Restaurant/Reglament'));
const Order = lazy(() => import('client/ui/modules/front/Restaurant/Order'));
const Receipt = lazy(() => import('client/ui/modules/front/Restaurant/Receipt'));

export const Restaurant = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path={`${PATH}/:restaurant/language`} component={Language} />
        <Route path={`${PATH}/:restaurant/menu`} component={Menu} />
        <Route path={`${PATH}/:restaurant/categories/:category`} component={Category} />
        <Route path={`${PATH}/:restaurant/categories`} component={Categories} />
        <Route path={`${PATH}/:restaurant/opinion`} component={Opinion} />
        <Route path={`${PATH}/:restaurant/reglament`} component={Reglament} />
        <Route path={`${PATH}/:restaurant/information`} component={Information} />
        <Route path={`${PATH}/:restaurant/foodtips`} component={FoodTips} />
        <Route path={`${PATH}/:restaurant/order/receipt`} component={Receipt} />
        <Route path={`${PATH}/:restaurant/order`} component={Order} />
      </Switch>
    </Layout>
  
  );
};

export default Restaurant;
