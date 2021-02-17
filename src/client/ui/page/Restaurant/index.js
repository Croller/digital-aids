import React, { useEffect } from 'react';
import {
  Wrapper,
} from './styled';

export const Restaurant = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      efefe
    </Wrapper>
  );
};

export default Restaurant;
