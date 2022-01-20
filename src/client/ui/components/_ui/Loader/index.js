import React, { memo } from 'react';
import {
  Wrapper,
  Background,
  Container,
  Content,
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
      <Content>
        <BounceSecond />
        <BounceFirst color={color} />
      </Content>
    </Container>
  </Wrapper>
));
