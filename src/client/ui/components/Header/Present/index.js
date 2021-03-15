import React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  LogoSvg,
  // LoupeSvg,
  PhoneCallSvg,
  UserCircleSvg,
} from 'client/assets/images';
import {
  HeaderWrapper, HeaderContainer,
  LogoWrapper, LogoText,
  ControlWrapper,
  Search, Phone, User,
} from './styled';

const HeaderComponent = ({
  className,
}) => {
  const [t] = useTranslation();
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
    history.push(path === 'back' ? 'categories' : path);
  };

  return (
    <HeaderWrapper className={className}>
      <HeaderContainer>
        <LogoWrapper>
          <LogoSvg />
          <LogoText>
            {t('present.header.logo')}
          </LogoText>
        </LogoWrapper>
        <ControlWrapper>
          <Search />
          <Phone onClick={() => handleRoute(`tel:${phone[0]}`, true)}>
            <PhoneCallSvg />
            {phone}
          </Phone>
          <User>
            <UserCircleSvg />
          </User>
        </ControlWrapper>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export const Header = React.memo(withRouter(HeaderComponent));
