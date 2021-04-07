import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { EmptyList } from './EmptyList';
import {
  TopbarStyled,
  List,
} from './styled';

const Restaurants = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const getEmptyList = () => (pathname.indexOf('archive') > -1 ? 'archive' : 'restaurants');

  const handleSearch = (str) => {
    console.log('search', str);
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      <TopbarStyled onSearch={handleSearch} />
      <List>
        <EmptyList type={getEmptyList()} />
      </List>
    </>
  );
};

export default Restaurants;
