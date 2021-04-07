import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { EmptyList } from './EmptyList';
import {
  // Wrapper,
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
  }, [pathname]);

  return (
    <>
      <TopbarStyled
        url={pathname}
        onSearch={handleSearch}
      />
      <List>
        <EmptyList type={getEmptyList()} />
      </List>
    </>
  );
};

export default Restaurants;
