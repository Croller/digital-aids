import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import translate, { languages } from 'client/i18n';
import { setLocalUser } from 'client/utils/localStorage';
import OutSideClick from 'react-outside-click-handler';
import { set } from 'client/store/user';
import {
  LogoSvg,
  CloseSvg,
  UserCircleSvg,
  HamburgerSvg,
  GlobalSvg,
} from 'client/assets/images';
import {
  HeaderWrapper,
  LogoWrapper, LogoText,
  Control,
  Hamburger,
  User,
  Lang, LangText,
  LangWrapper,
  CloseButton,
  LangList,
  LangButton,
} from './styled';

const HeaderComponent = ({
  token = null,
  onRoute = () => {},
  onShowSideBar = () => {},
  className,
}) => {
  const rootDispatch = useDispatch();
  const { info } = useSelector(s => s.user);
  const [t, i18n] = useTranslation();
  const [langList, setLangList] = useState(false);

  const handleLangChange = (lng = null) => {
    if (lng) {
      translate.changeLanguage(lng);
      setLocalUser({ lng });
      rootDispatch(set({ info: { ...info, language: lng } }));
    }
    setLangList(false);
  };

  return (
    <HeaderWrapper className={className}>
      <Control>
        {token && (
          <Hamburger onClick={() => onShowSideBar('left')}>
            <HamburgerSvg />
          </Hamburger>
        )}
      </Control>
      <LogoWrapper onClick={() => onRoute('restaurants')}>
        <LogoSvg />
        <LogoText>
          {t('backOffice.header.logo')}
        </LogoText>
      </LogoWrapper>
      <Control>
        {token && (
          <User onClick={() => onShowSideBar('right')}>
            <UserCircleSvg />
          </User>
        )}
        <Lang onClick={() => setLangList(!langList)}>
          <GlobalSvg />
          <LangText>{i18n.language}</LangText>
          {langList && (
            <LangWrapper>
              <CloseButton onClick={handleLangChange}>
                <CloseSvg />
              </CloseButton>
              <OutSideClick onOutsideClick={handleLangChange}>
                <LangList>
                  {['en', 'ru'].map(lng => (
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
      </Control>
    </HeaderWrapper>
  );
};

export const Header = React.memo(HeaderComponent);
