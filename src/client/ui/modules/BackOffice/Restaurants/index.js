import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  // Wrapper,
  TopbarStyled,
} from './styled';

const Restaurants = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { params } = useParams();
  const pathParts = pathname.split('/').filter(f => f && f.length > 0);
  console.log(params);
  const handleRoute = (key) => {
    let path = `/${pathname}/${key}`;
    if (history.action !== 'POP' && key === 'back') {
      history.goBack();
      return null;
    }
    if (key === 'new') {
      path = `/${pathParts[0]}/${pathParts[1].slice(0, -1)}/new`;
    }
    history.push(path);
  };

  const handleSearch = (str) => {
    console.log('search', str);
  };

  const handleEvent = (key) =>{
    console.log(key);
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      <TopbarStyled 
        page={pathParts[1]}
        onRoute={handleRoute}
        onSearch={handleSearch}
        onChange={handleEvent}
      />
    </>
  );
};

export default Restaurants;
