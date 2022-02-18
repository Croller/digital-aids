import React, { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { init, set } from 'client/store/restaurant';
import * as userStore from 'client/store/user';
import { getUrlOrder } from 'client/utils/restaurant';
import {
  getLocal,
  setLocal,
  getLocalRestaurant,
  setLocalRestaurant,
} from 'client/utils/localStorage';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Layout } from 'client/ui/components/Layout/Restaurant';
import { Loader } from 'client/ui/components/_block/Loader';

const { href } = window.location;
const PATH = '/restaurant';

const Language = lazy(() => import('client/ui/modules/Restaurant/Language'));
const Menu = lazy(() => import('client/ui/modules/Restaurant/Menu'));
const Assistant = lazy(() => import('client/ui/modules/Restaurant/Assistant'));
const Categories = lazy(() => import('client/ui/modules/Restaurant/Categories'));
const Category = lazy(() => import('client/ui/modules/Restaurant/Category'));
const Opinion = lazy(() => import('client/ui/modules/Restaurant/Opinion'));
const Information = lazy(() => import('client/ui/modules/Restaurant/Information'));
const Reservation = lazy(() => import('client/ui/modules/Restaurant/Reservation'));
const FoodTips = lazy(() => import('client/ui/modules/Restaurant/FoodTips'));
const Reglament = lazy(() => import('client/ui/modules/Restaurant/Reglament'));
const Order = lazy(() => import('client/ui/modules/Restaurant/Order'));
const Receipt = lazy(() => import('client/ui/modules/Restaurant/Receipt'));

export const Restaurant = () => {
  const history = useHistory();
  const localStorage = getLocal();
  const { pathname } = useLocation();
  const rootDispatch = useDispatch();
  const state = useSelector(s => s);
  const { user, restaurant } = state;
  const { token, language } = user.info;

  useEffect(() => {
    window.prerenderReady = true;
    if (token) {
      const key = pathname.split('/')[2];
      rootDispatch(init({ restaurant: key, language }));
    }
  }, [token, language]);

  useEffect(() => {
    if (!restaurant.info) {
      history.push('/404');
    }
    if (restaurant.info && restaurant.info.id) {
      const { dishes, categories } = restaurant;
      const localRest = getLocalRestaurant(restaurant.info.key);
      let order = localRest.order ? getUrlOrder(localRest.order, dishes, categories) : null;

      let table_number = localRest.table_number || 0;
      let position = localStorage?.position || 'guest';
      if (href.indexOf('/receipt?params=') > -1 && href.indexOf('table_number=') > -1) {
        const [path, number] = href.split('&table_number=');
        order = getUrlOrder(path.split('?params=')[1], dishes, categories);
        table_number = parseInt(number, 0);
      }
      if (href.indexOf('/receipt?params=') === -1) {
        if (href.indexOf('table_number=') > -1) {
          const number = href.split('table_number=')[1];
          table_number = number ? parseInt(number, 0) : table_number;
        }
        if (href.indexOf('position=waiter') > -1) {
          const pos = href.split('position=')[1];
          position = pos || 'guest';
        }
      }
      rootDispatch(userStore.set({ position }));
      rootDispatch(set({ table_number, order }));
      setLocal({ position });
      setLocalRestaurant(restaurant.info.key, { table_number });
    }
  }, [restaurant.info]);

  return (
    <>
      {(!token || (restaurant.info && !restaurant.info.id) || restaurant.loading) && (
        <Loader />
      )}
      {restaurant.info && restaurant.info.id && (
        <Layout>
          <Switch fallback={<Loader />}>
            <Route exac path={`${PATH}/:restaurant/language`} component={Language} />
            <Route exac path={`${PATH}/:restaurant/menu`} component={Menu} />
            <Route exac path={`${PATH}/:restaurant/assistant`} component={Assistant} />
            <Route exac path={`${PATH}/:restaurant/category/:category`} component={Category} />
            <Route exac path={`${PATH}/:restaurant/categories`} component={Categories} />
            <Route exac path={`${PATH}/:restaurant/opinion`} component={Opinion} />
            <Route exac path={`${PATH}/:restaurant/reglament`} component={Reglament} />
            <Route exac path={`${PATH}/:restaurant/reserve`} component={Reservation} />
            <Route exac path={`${PATH}/:restaurant/information`} component={Information} />
            <Route exac path={`${PATH}/:restaurant/foodtips`} component={FoodTips} />
            <Route exac path={`${PATH}/:restaurant/order/receipt`} component={Receipt} />
            <Route exac path={`${PATH}/:restaurant/order`} component={Order} />
            <Redirect to="/restaurants" />
          </Switch>
        </Layout>
      )}
    </>
  );
};

export default Restaurant;
