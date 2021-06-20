import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { setUser } from 'client/utils/localStorage';
import translate, { languages } from 'client/i18n';
import OutSideClick from 'react-outside-click-handler';
import {
  CloseSvg,
  GlobalSvg,
  LogoSvg,
  PhoneCallSvg,
} from 'client/assets/images';
import {
  HeaderWrapper, HeaderContainer,
  LogoWrapper, LogoText,
  ControlWrapper,
  Phone, PhoneText,
  Lang, LangText,
  LangWrapper,
  CloseButton,
  LangList,
  LangButton,
} from './styled';

const HeaderComponent = ({
  className,
}) => {
  const history = useHistory();
  const [t, i18n] = useTranslation();
  const [langList, setLangList] = useState(false);
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

  const handleLangChange = (lng = null) => {
    if (lng) {
      translate.changeLanguage(lng);
      setLocalUser({ lng });
    }
    setLangList(false);
  };

  return (
    <HeaderWrapper className={className}>
      <HeaderContainer>
        <LogoWrapper
          onClick={() => handleRoute()}
        >
          <LogoSvg />
          <LogoText>
            {t('present.header.logo')}
          </LogoText>
        </LogoWrapper>
        <ControlWrapper>
          <Phone
            onClick={() => handleRoute(`tel:${phone}`, true)}
          >
            <PhoneCallSvg />
            <PhoneText>{phone}</PhoneText>
          </Phone>
          <Lang onClick={() => setLangList(!langList)}>
            <GlobalSvg />
            <LangText>{i18n.language}</LangText>

            {langList && (
              <LangWrapper>
                <CloseButton onClick={() => handleLangChange()}>
                  <CloseSvg />
                </CloseButton>
                <OutSideClick onOutsideClick={() => handleLangChange()}>
                  <LangList>
                    {['en', 'de', 'es', 'it', 'ru'].map(lng => (
                      <LangButton
                        key={`_language_${lng}`}
                        onClick={() => handleLangChange(lng)}
                        active={lng === i18n.language}
                      >
                        {languages[lng].name}
                      </LangButton>
                    ))}
                  </LangList>
                </OutSideClick>
              </LangWrapper>
            )}
          </Lang>
        </ControlWrapper>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export const Header = React.memo(withRouter(HeaderComponent));
