import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  CloseSvg,
  LogoSvg,
  LoupeSvg,
  PhoneCallSvg,
  UserCircleSvg,
} from 'client/assets/images';
import {
  HeaderWrapper, HeaderContainer,
  LogoWrapper, LogoText,
  ControlWrapper,
  Search, LoupeSvgStyled, Phone, User,
} from './styled';

const HeaderComponent = ({
  className,
}) => {
  const history = useHistory();
  const [t] = useTranslation();
  const [showSearch, setShowSearch] = useState(false);
  const { phone } = useSelector(store => store.company);

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
      <HeaderContainer>
        <LogoWrapper
          show={showSearch}
          onClick={() => handleRoute()}
        >
          <LogoSvg />
          <LogoText>
            {t('present.header.logo')}
          </LogoText>
        </LogoWrapper>
        <ControlWrapper>
          <Search
            prefix={showSearch ? <LoupeSvg /> : false}
            suffix={showSearch ? <CloseSvg onClick={() => setShowSearch(false)} /> : <LoupeSvg />}
            show={showSearch}
          />
          {!showSearch && (
            <LoupeSvgStyled
              onClick={() => setShowSearch(true)}
            />
          )}
          <Phone onClick={() => handleRoute(`tel:${phone[0]}`, true)}>
            <PhoneCallSvg />
            {phone}
          </Phone>
          <User show={showSearch}>
            <UserCircleSvg />
          </User>
        </ControlWrapper>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export const Header = React.memo(withRouter(HeaderComponent));
