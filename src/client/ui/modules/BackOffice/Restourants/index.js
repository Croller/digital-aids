import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Wrapper,
  NavbarStyled,
} from './styled';

const Restourants = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  console.log('pathname', pathname);

  const getPage = () => {

  };

  const handleRoute = (key) => {
    const path = `${pathname}${key}`;
    if (history.action !== 'POP' && key === 'back') {
      history.goBack();
      return null;
    }
    history.push(path);
  };

  const handleSearch = (str) => {
    console.log('search', str);
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <NavbarStyled
        page={getPage}
        onRoute={handleRoute}
        onSearch={handleSearch}
      />
      Restourants
    </Wrapper>
  );
};

export default Restourants;
