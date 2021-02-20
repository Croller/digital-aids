import React, { memo } from 'react';
import {
  Wrapper,
  Logo, 
  ControlWrapper,
} from './styled';

export const Header = memo(({ 
  className,
  mobile = false,
}) => (
  <Wrapper
    className={className}
    mobile={mobile}
  >
    <Logo />
    <ControlWrapper />
  </Wrapper>
));
