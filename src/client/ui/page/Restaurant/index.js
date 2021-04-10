import React, { lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/Restaurant';

const Language = lazy(() => import('client/ui/modules/Restaurant/Language'));
const Menu = lazy(() => import('client/ui/modules/Restaurant/Menu'));
const Categories = lazy(() => import('client/ui/modules/Restaurant/Categories'));
const Category = lazy(() => import('client/ui/modules/Restaurant/Category'));
const Opinion = lazy(() => import('client/ui/modules/Restaurant/Opinion'));
const Information = lazy(() => import('client/ui/modules/Restaurant/Information'));
const FoodTips = lazy(() => import('client/ui/modules/Restaurant/FoodTips'));
const Reglament = lazy(() => import('client/ui/modules/Restaurant/Reglament'));
const Order = lazy(() => import('client/ui/modules/Restaurant/Order'));
const Receipt = lazy(() => import('client/ui/modules/Restaurant/Receipt'));

export const Restaurant = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/language" component={Language} />
        <Route path="/menu" component={Menu} />
        <Route path="/category/:category" component={Category} />
        <Route path="/categories" component={Categories} />
        <Route path="/opinion" component={Opinion} />
        <Route path="/reglament" component={Reglament} />
        <Route path="/information" component={Information} />
        <Route path="/foodtips" component={FoodTips} />
        <Route path="/order/receipt" component={Receipt} />
        <Route path="/order" component={Order} />
      </Switch>
    </Layout>
  
  );
};

export default Restaurant;
