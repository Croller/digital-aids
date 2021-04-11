import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RestaurantInfo } from 'client/ui/modules/BackOffice/RestaurantInfo';
import { update } from 'client/store/backOffice';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'client/ui/components/_ui/Message';
import { EmptyList } from './EmptyList';
import {
  RestaurantList,
  NavbarStyled,
  List,
  LoaderStyled,
} from './styled';

const Restaurants = () => {
  const rootDispatch = useDispatch();
  const [t] = useTranslation();
  const { restaurants, status, loading } = useSelector(state => state.backOffice);
  const { pathname } = useLocation();

  const getPage = () => (pathname.indexOf('archive') > -1 ? 'archive' : 'restaurants');

  const getItems = () => (restaurants || []).reduce((obj, rest) => { 
    const val = rest.is_archived;
    if (rest.is_deleted) {
      return obj;
    }
    return { ...obj, [val]: [...(obj[val] || []), rest] };
  }, { true: null, false: null })[pathname.indexOf('archive') > -1];

  const handleEvent = (obj) => {
    rootDispatch(update({ name: 'data_restaurants', data: obj }));
  };

  const handleEventAll = async (obj) => {
    await Promise.all(getItems().map(({ id }) => rootDispatch(update({ name: 'data_restaurants', data: { id, ...obj } }))));
  };

  const handleSearch = (str) => {
    console.log('search', str);
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  useEffect(() => {
    if (status) {
      showMessage({ type: 'success', content: t(`common.words.${status}`) });
    }
  }, [status]);

  return (
    <RestaurantList>
      {loading && (<LoaderStyled />)}
      <NavbarStyled
        onSearch={handleSearch}
        onEvent={handleEventAll}
      />
      <List>
        {getItems() ? getItems().map((item) => (
          <RestaurantInfo
            {...item}
            key={item.id}
            onEvent={handleEvent}
          />
        )) : (
          <EmptyList type={getPage()} />
        )}
      </List>
    </RestaurantList>
  );
};

export default Restaurants;
