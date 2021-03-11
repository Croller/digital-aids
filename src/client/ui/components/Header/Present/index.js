import React from 'react';
import { withRouter } from 'react-router-dom';
import { LogoSvg } from 'client/assets/images';
import {
  HeaderWrapper, HeaderContainer,
  LogoWrapper,
  ControlWrapper,
} from './styled';

const HeaderComponent = ({
  className,
}) => (
  <HeaderWrapper className={className}>
    <HeaderContainer>
      <LogoWrapper>
        <LogoSvg />
        {/* <LogoText>

        </LogoText> */}
      </LogoWrapper>
      <ControlWrapper>
        test
      </ControlWrapper>
    </HeaderContainer>
  </HeaderWrapper>
);

export const Header = React.memo(withRouter(HeaderComponent));
