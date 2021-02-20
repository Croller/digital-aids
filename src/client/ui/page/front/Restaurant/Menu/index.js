import React, { useEffect } from 'react';
import {
  Wrapper,
} from './styled';

const RestaurantMenu = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      Rest Menu
    </Wrapper>
  );
};

export default RestaurantMenu;
