import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import {
  LogoSvg,
  // LoupeSvg,
  // CloseSvg,
  UserCircleSvg,
  HamburgerSvg,
} from 'client/assets/images';
import {
  HeaderWrapper,
  LogoWrapper, LogoText,
  Control,
  // Loupe, Search,
  Hamburger,
  User,
} from './styled';

const HeaderComponent = ({
  id = null,
  token = null,
  onShowSideBar,
  onRoute = () => {},
  className,
}) => {
  const [t] = useTranslation();
  const match = useRouteMatch();
  // const [showSearch, setShowSearch] = useState(false);

  return (
    <HeaderWrapper className={className}>
      <Control>
        {token && (
          <Hamburger onClick={onShowSideBar}>
            <HamburgerSvg />
          </Hamburger>
        )}
      </Control>
      <LogoWrapper onClick={onRoute}>
        <LogoSvg />
        <LogoText>
          {t('backOffice.header.logo')}
        </LogoText>
      </LogoWrapper>
      <Control>
        {id && token && (
          <>
            {/* <Loupe>
              <LoupeSvg onClick={() => setShowSearch(true)} />
              {showSearch && (
                <Search
                  prefix={showSearch ? <LoupeSvg /> : false}
                  suffix={showSearch ? <CloseSvg onClick={() => setShowSearch(false)} /> : <LoupeSvg />}
                />
              )}
            </Loupe> */}
            <User
              active={match.params[0] === `users/${id}`}
              onClick={() => match.params[0] !== `users/${id}` && onRoute(`users/${id}`)}
            >
              <UserCircleSvg />
            </User>
          </>
        )}
      </Control>
    </HeaderWrapper>
  );
};

export const Header = React.memo(HeaderComponent);
