import React, { useEffect } from 'react';
import {
  ScrollHideBlockStyled,
  Wrapper,
} from './styled';

export const FooterMenu = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <ScrollHideBlockStyled direction="down">
      <Wrapper>
        FooterMenu
      </Wrapper>
    </ScrollHideBlockStyled>
  );
};
