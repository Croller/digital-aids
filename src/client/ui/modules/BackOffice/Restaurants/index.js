import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RestaurantInfo } from 'client/ui/modules/BackOffice/RestaurantInfo';
import { update } from 'client/store/backOffice';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'client/ui/components/_ui/Message';
import { EmptyList } from './EmptyList';
import { Loader } from 'client/ui/components/_block/Loader';
import {
  TopbarStyled,
  List,
  LoaderStyled,
} from './styled';

const Restaurants = () => {
  const history = useHistory();
  const rootDispatch = useDispatch();
  const [t] = useTranslation();
  const { restaurants, status, loading } = useSelector(state => state.backOffice);
  const { pathname } = useLocation();

  const getPage = () => (pathname.indexOf('archive') > -1 ? 'archive' : 'restaurants');

  const getItems = () => (restaurants || []).reduce((obj, rest) => { 
    const val = rest.is_archived;
    return { ...obj, [val]: [...(obj[val] || []), rest] };
  }, { true: null, false: null })[pathname.indexOf('archive') > -1];

  const handleChange = (obj) => {
    rootDispatch(update({ name: 'data_restaurants', data: obj }));
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
    <>
      <TopbarStyled onSearch={handleSearch} />
      <List>
        {loading && <LoaderStyled />}
        {getItems() ? getItems().map((item) => (
          <RestaurantInfo
            {...item}
            t={t}
            key={item.id}
            onRoute={history.push}
            onClick={handleChange}
          />
        )) : (
          <EmptyList type={getPage()} />
        )}
      </List>
    </>
  );
};

export default Restaurants;
