import React, { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { init } from 'client/store/restaurant';
import {
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import { Layout } from 'client/ui/components/Layout/Restaurant';
import { Loader } from 'client/ui/components/_block/Loader';

const PATH = '/restaurant';

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
  const { pathname } = useLocation();
  const rootDispatch = useDispatch();
  const state = useSelector(s => s);
  const { user, restaurant } = state;
  const { token, language } = user.info;

  useEffect(() => {
    window.prerenderReady = true;
    if (token) {
      const key = pathname.split('/')[2];
      rootDispatch(init({ restaurant: key }));
      console.log('restaurant load:', key);
    }
  }, [token, language]);

  return !token || !restaurant.info.key ? (
    <Loader />
  ) : (
    <Layout>
      <Switch>
        <Route exac path={`${PATH}/:restaurant/language`} component={Language} />
        <Route exac path={`${PATH}/:restaurant/menu`} component={Menu} />
        <Route exac path={`${PATH}/:restaurant/category/:category`} component={Category} />
        <Route exac path={`${PATH}/:restaurant/categories`} component={Categories} />
        <Route exac path={`${PATH}/:restaurant/opinion`} component={Opinion} />
        <Route exac path={`${PATH}/:restaurant/reglament`} component={Reglament} />
        <Route exac path={`${PATH}/:restaurant/information`} component={Information} />
        <Route exac path={`${PATH}/:restaurant/foodtips`} component={FoodTips} />
        <Route exac path={`${PATH}/:restaurant/order/receipt`} component={Receipt} />
        <Route exac path={`${PATH}/:restaurant/order`} component={Order} />
      </Switch>
    </Layout>
  );
};

export default Restaurant;
