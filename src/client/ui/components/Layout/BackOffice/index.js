import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Header } from 'client/ui/components/Header/BackOffice';
import { Sidebar } from 'client/ui/components/Layout/BackOffice/Sidebar';
import { setLocalUser } from 'client/utils/localStorage';
import { set } from 'client/store/user';
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
  const { info } = useSelector(store => store.user);
  const { id, token, roles } = info;

  const handleRoute = useCallback((part = 'restaurants') => {
    if (part === 'auth') {
      history.push(path);
      setLocalUser({ token: null });
      rootDispatch(set({ info: { ...info, token: null } }));
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
        <Sidebar
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
    </Wrapper>
  );
};
