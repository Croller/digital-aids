import React from 'react';
import { withRouter } from 'react-router-dom';
import { CloseSvg, HamburgerSvg, RestaurantLogoTempPng } from 'client/assets/images';
import {
  HeaderWrapper,
  LogoWrapper, LogoImg,
  ControlWrapper,
  Close, Hamburger,
} from './styled';

const PATH_SHOW_CLOSE = [
  'language',
  'menu',
  'reglament',
  'opinion',
  'categories',
];

const PATH_HIDE_CLOSE = [
  'categories/',
];

const HeaderComponent = ({
  className,
  isMobile = false,
  history,
  onRoute,
}) => {
  const { location: { pathname } } = history;
  const showClose = PATH_SHOW_CLOSE.some(key => pathname.indexOf(key) > -1) && !PATH_HIDE_CLOSE.some(key => pathname.indexOf(key) > -1);
  
  return (
    <>
      <HeaderWrapper
        className={className}
        isMobile={isMobile}
      >
        <LogoWrapper>
          <LogoImg src={RestaurantLogoTempPng} />
        </LogoWrapper>
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
