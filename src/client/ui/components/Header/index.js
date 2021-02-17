import React from 'react';
import {
  Wrapper,
} from './styled';

export const Header = ({ 
  className,
  mobile = false,
}) => (
  <Wrapper
    className={className}
    mobile={mobile}
  >
    Header
  </Wrapper>
);
