import React from 'react';
import { withRouter } from 'react-router-dom';
import { LogoSvg } from 'client/assets/images';
import {
  HeaderWrapper,
  LogoWrapper,
  ControlWrapper,
} from './styled';

const HeaderComponent = ({
  className,
}) => (
  <HeaderWrapper className={className}>
    <LogoWrapper>
      <LogoSvg />
    </LogoWrapper>
    <ControlWrapper>
      test
    </ControlWrapper>
  </HeaderWrapper>
);

export const Header = React.memo(withRouter(HeaderComponent));
