import React, { memo } from 'react';
import {
  Wrapper,
  Background,
  Container,
  BounceFirst,
  BounceSecond,
} from './styled';

export const Loader = memo(({
  className = '',
  height = null,
  color = null,
}) => (
  <Wrapper className={className} height={height}>
    <Background />
    <Container>
      <BounceSecond />
      <BounceFirst color={color} />
    </Container>
  </Wrapper>
));
