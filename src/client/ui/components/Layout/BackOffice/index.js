import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Header } from 'client/ui/components/Header/BackOffice';
import { LeftBar } from 'client/ui/components/Layout/BackOffice/LeftBar';
import { RightBar } from 'client/ui/components/Layout/BackOffice/RightBar';
import { setLocalUser } from 'client/utils/localStorage';
import { logout } from 'client/store/user';
import { 
  Wrapper,
  Cotainer,
  Content,
  Block,
} from './styled';

export const Layout = ({
  children,
  className,
}) => {
  const history = useHistory();
  const rootDispatch = useDispatch();
  const { pathname } = useLocation();
  const [showSideBar, setShowSideBar] = useState(true);
  const { id, token, roles } = useSelector(store => store.user.info);

  const handleRoute = useCallback((part = 'restaurants') => {
    if (part === 'auth') {
      history.push(path);
      setLocalUser({ token: null });
      rootDispatch(logout());
    }
    const path = `/back-office/${part}`;
    history.push(path);
  }, []);

  return (
    <Wrapper className={className}>
      <Header
        id={id}
        token={token}
        onShowSideBar={() => setShowSideBar(!showSideBar)}
        onRoute={handleRoute}
      />
      {token && showSideBar && (
        <LeftBar
          roles={roles}
          path={pathname}
          onRoute={handleRoute}
        />
      )}
      <Cotainer>
        <Content
          sidebar={token && showSideBar}
        >
          <Block>
            {children}
          </Block>
        </Content>
      </Cotainer>
      {token && showSideBar && (
        <RightBar
          roles={roles}
          path={pathname}
          onRoute={handleRoute}
        />
      )}
    </Wrapper>
  );
};
