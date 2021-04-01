import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CloseSvg,
  LogoSvg,
  LoupeSvg,
  UserCircleSvg,
  HamburgerSvg,
} from 'client/assets/images';
import {
  HeaderWrapper,
  LogoWrapper, LogoText,
  Control,
  Loupe, Search,
  Hamburger,
  User,
} from './styled';

const HeaderComponent = ({
  className,
  onShowSideBar,
}) => {
  const history = useHistory();
  const [t] = useTranslation();
  const [showSearch, setShowSearch] = useState(false);

  const handleRoute = (path = '/', external = false) => {
    if (external) {
      if (path.indexOf('tel') > -1) {
        document.location.href = path;
        return null;
      }
      window.open(path, '_blank').focus();
    }
    if (history.action !== 'POP' && path === 'back') {
      history.goBack();
      return null;
    }
    history.push(path === 'back' ? '' : path);
  };

  return (
    <HeaderWrapper className={className}>
      <Control>
        <Hamburger onClick={() => onShowSideBar()}>
          <HamburgerSvg />
        </Hamburger>
      </Control>
      <LogoWrapper onClick={() => handleRoute()}>
        <LogoSvg />
        <LogoText>
          {t('backOffice.header.logo')}
        </LogoText>
      </LogoWrapper>
      <Control>
        <Loupe>
          <LoupeSvg onClick={() => setShowSearch(true)} />
          {showSearch && (
            <Search
              prefix={showSearch ? <LoupeSvg /> : false}
              suffix={showSearch ? <CloseSvg onClick={() => setShowSearch(false)} /> : <LoupeSvg />}
            />
          )}
        </Loupe>
        <User>
          <UserCircleSvg />
        </User>
      </Control>
    </HeaderWrapper>
  );
};

export const Header = React.memo(withRouter(HeaderComponent));
