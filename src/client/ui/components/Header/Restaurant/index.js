import React from 'react';
import { withRouter } from 'react-router-dom';
import { CloseSvg, HamburgerSvg } from 'client/assets/images';
import {
  HeaderWrapper,
  LogoWrapper, LogoImg,
  ControlWrapper,
  Close, Control,
} from './styled';

const PATH_SHOW_CLOSE = [
  'language',
  'menu',
  'reglament',
  'opinion',
  'order',
];

const HeaderComponent = ({
  className,
  logo = null,
  isMobile = false,
  history,
  onRoute,
}) => {
  const { location: { pathname } } = history;
  const showClose = PATH_SHOW_CLOSE.some(key => pathname.indexOf(key) > -1);
  
  return (
    <HeaderWrapper
      className={className}
      isMobile={isMobile}
    >
      <LogoWrapper>
        {logo && (
          <LogoImg
            src={logo}
            onClick={() => onRoute('information')}
          />
        )}
      </LogoWrapper>
      <ControlWrapper>
        {showClose ? (
          <Close onClick={() => onRoute('back')}>
            <CloseSvg />
          </Close>
        ) : (
          <Control onClick={() => onRoute('menu')}>
            <HamburgerSvg />
          </Control>
        )}
      </ControlWrapper>
    </HeaderWrapper>
  );
};

export const Header = React.memo(withRouter(HeaderComponent));
