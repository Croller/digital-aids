import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RestaurantInfo } from 'client/ui/modules/BackOffice/RestaurantInfo';
import { update } from 'client/store/backOffice';
import { EmptyList } from './EmptyList';
import {
  RestaurantList,
  NavbarStyled,
  List,
  LoaderStyled,
} from './styled';

const Restaurants = () => {
  const rootDispatch = useDispatch();
  const { restaurants, loading } = useSelector(state => state.backOffice);
  const { pathname } = useLocation();
  const [searched, setSearched] = useState(null);

  const isArchive = pathname.indexOf('archive') > -1;
  const type = isArchive ? 'archive' : 'restaurants';
  const filtred = (restaurants || []).reduce((obj, rest) => { 
    const val = rest.is_archived;
    if (rest.is_deleted) {
      return obj;
    }
    return { ...obj, [val]: [...(obj[val] || []), rest] };
  }, { true: null, false: null });

  const handleEvent = (obj) => {
    rootDispatch(update({ name: 'data_restaurants', data: obj }));
  };

  const handleEventAll = async (obj) => {
    await rootDispatch(update({ name: 'data_restaurants', data: filtred[isArchive].map(({ id }) => ({ ...obj, id })) }));
  };

  const handleSearch = (str) => {
    if (str) return;
    const fields = ['name', 'address', 'phone'];
    console.log('search', str);
    // const results = filtred[isArchive].filter(f => fields.some(field => f[field] && f[field].toLowerCase().indexOf(str) > -1));
    // setSearched(results);
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <RestaurantList>
      {loading && (<LoaderStyled />)}
      <NavbarStyled
        onChange={handleSearch}
        onEvent={handleEventAll}
      />
      <List>
        {filtred && filtred[isArchive] ? filtred[isArchive].map((item) => (
          <RestaurantInfo
            {...item}
            key={item.id}
            onEvent={handleEvent}
          />
        )) : (
          <EmptyList type={type} />
        )}
      </List>
    </RestaurantList>
  );
};

export default Restaurants;
