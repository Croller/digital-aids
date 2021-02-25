import React, { memo } from 'react';
import {
  Wrapper,
  Control,
  Count,
} from './styled';

export const Counter = memo(({
  count = 0,
  max = 99,
  onClick,
}) => (
  <Wrapper>
    <Control
      disabled={count === 0}
      onClick={() => count > 0 && onClick(count - 1)}
    >
      -
    </Control>
    <Count selected={count > 0}>
      {count}
    </Count>
    <Control
      disabled={count === max}
      onClick={() => count < max && onClick(count + 1)}
    >
      +
    </Control>
  </Wrapper>
));
