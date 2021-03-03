import React, { memo, useEffect } from 'react';
import { htmlOverflowYHidden } from 'client/utils/common';
import { 
  Wrapper,
  Background,
  Container,
} from './styled';

export const Modal = memo(({
  children,
}) => {
  useEffect(() => {
    htmlOverflowYHidden(true);
    return () => {
      htmlOverflowYHidden(false);
    };
  }, []);
  return (
    <Wrapper>
      <Background />
      <Container>
        {children}
      </Container>
    </Wrapper>
  );
});
