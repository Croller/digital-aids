import React from 'react';
import { withRouter } from 'react-router';
import { CloseSvg, HamburgerSvg, RestaurantLogoTempPng } from 'client/assets/images';
import {
  HeaderWrapper,
  Logo, LogoImg,
  ControlWrapper,
  Close, Hamburger,
} from './styled';

const HeaderComponent = ({
  className,
  isMobile = false,
  history,
  onRoute,
}) => {
  const { location: { pathname } } = history;
  const part = pathname.split('/').slice(-1)[0];
  const showClose = [
    'language',
    'menu',
    'reglament',
    'opinion',
    'categories',
  ].includes(part);
  
  return (
    <>
      <HeaderWrapper
        className={className}
        isMobile={isMobile}
      >
        <Logo>
          <LogoImg src={RestaurantLogoTempPng} />
        </Logo>
        <ControlWrapper>
          {showClose ? (
            <Close onClick={() => onRoute('back')}>
              <CloseSvg />
            </Close>
          ) : (
            <Hamburger onClick={() => onRoute('menu')}>
              <HamburgerSvg />
            </Hamburger>
          )}
        </ControlWrapper>
      </HeaderWrapper>
    </>
  );
};

export const Header = React.memo(withRouter(HeaderComponent));
