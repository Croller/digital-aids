import React, { useEffect } from 'react';
import {
  Wrapper,
} from './styled';

export const Footer = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      Footer
    </Wrapper>
  );
};
