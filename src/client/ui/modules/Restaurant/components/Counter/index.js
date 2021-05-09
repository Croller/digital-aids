import React, { memo } from 'react';
import {
  Wrapper,
  Control,
  Count,
} from './styled';

export const Counter = memo(({
  value = 0,
  max = 99,
  onClick,
}) => (
  <Wrapper>
    <Control
      disabled={value === 0}
      onClick={() => value > 0 && onClick(value - 1)}
    >
      -
    </Control>
    <Count selected={value > 0}>
      {value}
    </Count>
    <Control
      disabled={value === max}
      onClick={() => value < max && onClick(value + 1)}
    >
      +
    </Control>
  </Wrapper>
));
