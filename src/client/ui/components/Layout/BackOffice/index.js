import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Header } from 'client/ui/components/Header/BackOffice';
import { LeftSideBar } from 'client/ui/components/Layout/BackOffice/LeftSideBar';
import { RightSideBar } from 'client/ui/components/Layout/BackOffice/RightSideBar';
import { setLocalUser } from 'client/utils/localStorage';
import * as user from 'client/store/user';
import { set } from 'client/store/backOffice';
import OutSideClick from 'react-outside-click-handler';
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
  const [showLeftSideBar, setShowLeftSideBar] = useState(true);
  const [showRightSideBar, setShowRightSideBar] = useState(false);
  const { info, roles } = useSelector(store => store.user);
  const { token } = info;

  const handleRoute = useCallback((part = 'restaurants') => {
    if (part === 'auth') {
      history.push(path);
      setLocalUser({ token: null });
      rootDispatch(user.set({ info: { ...info, token: null } }));
      rootDispatch(set({ restaurants: null }));
    }
    const path = `/back-office/${part}`;
    history.push(path);

    setShowRightSideBar(true);
  }, []);

  const handleShowSideBar = (key) => {
    if (key === 'left') {
      setShowLeftSideBar(!showLeftSideBar);
    }
    if (key === 'right') {
      setShowRightSideBar(!showRightSideBar);
    }
  };

  return (
    <Wrapper className={className}>
      <Header
        token={token}
        showRightSideBar={showRightSideBar}
        onShowSideBar={handleShowSideBar}
        onRoute={handleRoute}
      />
      {token && showLeftSideBar && (
        <LeftSideBar
          roles={roles}
          path={pathname}
          onRoute={handleRoute}
        />
      )}
      <Cotainer>
        <Content
          leftbar={token && showLeftSideBar}
          rightbar={token && showRightSideBar}
        >
          <Block>
            {children}
          </Block>
        </Content>
      </Cotainer>
      {token && showRightSideBar && (
        <OutSideClick onOutsideClick={() => handleShowSideBar('right')}>
          <RightSideBar
            roles={roles}
            path={pathname}
            onRoute={handleRoute}
          />
        </OutSideClick>
      )}
    </Wrapper>
  );
};
