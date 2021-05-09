import React, { memo } from 'react';
import {
  Wrapper,
  CircleContainer,
  Circle,
} from './styled';

export const RateCircle = memo(({
  rate = 0,
  max = 5,
}) => (
  <Wrapper>
    {[...Array(max)].map((item, i) => (
      <CircleContainer key={`_rate_circle_${i + 1}`}>
        {i + 1 <= rate && rate.toFixed(0) && (
          <Circle />
        )}
      </CircleContainer>
    ))}
  </Wrapper>
));
