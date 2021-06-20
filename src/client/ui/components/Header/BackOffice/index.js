import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import translate, { languages } from 'client/i18n';
import { setLocalUser } from 'client/utils/localStorage';
import OutSideClick from 'react-outside-click-handler';
import { update } from 'client/store/user';
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
  id = null,
  token = null,
  onShowSideBar,
  onRoute = () => {},
  className,
}) => {
  const { info } = useSelector(s => s.user);
  const [t, i18n] = useTranslation();
  const match = useRouteMatch();
  const rootDispatch = useDispatch();
  const [langList, setLangList] = useState(false);

  const handleLangChange = (lng = null) => {
    if (lng) {
      translate.changeLanguage(lng);
      setLocalUser({ lng });
      rootDispatch(update({ info: { ...info, language: lng } }));
    }
    setLangList(false);
  };

  return (
    <HeaderWrapper className={className}>
      <Control>
        {token && (
          <Hamburger onClick={onShowSideBar}>
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
        {id && token && (
          <>
            <User
              active={match.params[0] === `user/${id}`}
              onClick={() => onRoute(`user/${id}`)}
            >
              <UserCircleSvg />
            </User>
          </>
        )}
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
