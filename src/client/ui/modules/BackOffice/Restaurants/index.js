import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RestaurantInfo } from 'client/ui/modules/BackOffice/components/RestaurantInfo';
import { update } from 'client/store/backOffice';
import { EmptyList } from 'client/ui/modules/BackOffice/components/EmptyList';
import {
  RestaurantList,
  NavBarStyled,
  List,
  LoaderStyled,
} from './styled';

const SEARCH_FIELDS = ['name', 'address', 'phone'];

const Restaurants = () => {
  const rootDispatch = useDispatch();
  const { restaurants, loading } = useSelector(state => state.backOffice);
  const { pathname } = useLocation();
  const [filtred, setFiltred] = useState(null);
  const [searched, setSearched] = useState(null);

  const isArchive = pathname.indexOf('archive') > -1;

  const handleEvent = (obj) => {
    rootDispatch(update({ name: 'data_restaurants', data: obj }));
  };

  const handleEventAll = (obj) => {
    rootDispatch(update({ name: 'data_restaurants', data: filtred[isArchive].map(({ id }) => ({ ...obj, id })) }));
  };

  const handleSearch = (str = null) => {
    let result = null;
    if (str && str.length > 0) { 
      result = filtred[isArchive].filter(item => SEARCH_FIELDS.some(field => {
        if (!item[field]) return false;
        if (Array.isArray(item[field])) {
          return item[field].some(value => value.toLowerCase().indexOf(str) > -1);
        }
        return item[field].toLowerCase().indexOf(str) > -1;
      }));
    }
    setSearched(result);
  };

  useEffect(() => {
    window.prerenderReady = true;
    if (restaurants) {
      const result = restaurants.reduce((obj, rest) => { 
        const val = rest.is_archived;
        if (rest.is_deleted) {
          return obj;
        }
        return { ...obj, [val]: [...obj[val], rest] };
      }, { true: [], false: [] });
      setFiltred(result);
    }
  }, [restaurants]);

  return (
    <RestaurantList>
      {loading && (<LoaderStyled />)}
      <NavBarStyled
        onSearch={handleSearch}
        onEvent={handleEventAll}
      />
      <List>
        {!(filtred && filtred[isArchive]) ? (
          <EmptyList
            type={isArchive ? 'archive' : 'restaurants'}
            search={searched}
          />
        ) : ((searched !== null ? searched : filtred[isArchive]).map((item, i) => (
          <RestaurantInfo
            {...item}
            key={`_restauran_${i + 1}_${item.id}`}
            onEvent={handleEvent}
          />
        )))}
      </List>
    </RestaurantList>
  );
};

export default Restaurants;
