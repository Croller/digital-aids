import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { setUser } from 'client/utils/localStorageEdit';
import translate, { languages } from 'client/i18n';
import { OutSideClick } from 'client/ui/components/_base/OutSideClick';
import {
  CloseSvg,
  GlobalSvg,
  LogoSvg,
  LoupeSvg,
  PhoneCallSvg,
  UserCircleSvg,
} from 'client/assets/images';
import {
  HeaderWrapper, HeaderContainer,
  LogoWrapper, LogoText,
  ControlWrapper,
  Search, LoupeSvgStyled,
  Phone, PhoneText,
  Lang, LangText,
  User,
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
  const [showSearch, setShowSearch] = useState(false);
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
      setUser({ lng });
    }
    setLangList(false);
  };

  return (
    <HeaderWrapper className={className}>
      <HeaderContainer>
        {!showSearch && (
          <LogoWrapper
            onClick={() => handleRoute()}
          >
            <LogoSvg />
            <LogoText>
              {t('present.header.logo')}
            </LogoText>
          </LogoWrapper>
        )}
        <ControlWrapper show={showSearch}>
          <Search
            prefix={showSearch ? <LoupeSvg /> : false}
            suffix={showSearch ? <CloseSvg onClick={() => setShowSearch(false)} /> : <LoupeSvg />}
            show={showSearch}
          />
          {!showSearch && (
            <>
              <LoupeSvgStyled
                onClick={() => setShowSearch(true)}
              />
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
                    <OutSideClick onOutSide={() => handleLangChange()}>
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
              <User>
                <UserCircleSvg />
              </User>
            </>
          )}
        </ControlWrapper>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export const Header = React.memo(withRouter(HeaderComponent));
