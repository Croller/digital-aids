import React, { lazy, useEffect } from 'react';
import { Layout } from 'client/ui/components/Layout';
import { Route, Switch } from 'react-router-dom';

const RestaurantMenu = lazy(() => import('client/ui/page/front/Restaurant/Menu'));

export const Restaurant = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/restaurant/:restaurantName/language" component={RestaurantMenu} />
        <Route path="/restaurant/:restaurantName/menu" component={RestaurantMenu} />
        <Route path="/restaurant/:restaurantName/opinion" component={RestaurantMenu} />
        <Route path="/restaurant/:restaurantName/reglament" component={RestaurantMenu} />
        <Route path="/restaurant/:restaurantName/information" component={RestaurantMenu} />
      </Switch>
    </Layout>
  );
};

export default Restaurant;
