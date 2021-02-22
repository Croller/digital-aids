import React, { memo } from 'react';
import { ThumbsUpGreenSvg } from 'client/assets/images';
import {
  Wrapper,
  IconWrapper,
  Title,
  Description,
} from './styled';

export const ThankYou = memo(() => (
  <Wrapper>
    <IconWrapper>
      <ThumbsUpGreenSvg />
    </IconWrapper>
    <Title>
      Thank you!
    </Title>
    <Description>
      Your opinion is very important for
      <br />
      us, please, let us know it! 
    </Description>
  </Wrapper>
));
