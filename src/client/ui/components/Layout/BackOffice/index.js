import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header } from 'client/ui/components/Header/BackOffice';
import { SideBar } from 'client/ui/components/SideBar/BackOffice';

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
  const [showSideBar, setShowSideBar] = useState(true);
  const { id, token } = useSelector(store => store.user.info);

  const handleRoute = useCallback((part) => {
    let path = `/back-office/${part}`;
    path = part === 'back' ? '/back-office' : part;

    if (history.action !== 'POP' && part === 'back') {
      history.goBack();
      return null;
    }
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
        <SideBar
          onRoute={handleRoute}
        />
      )}
      <Cotainer>
        <Content sidebar={token && showSideBar}>
          <Block>
            {children}
          </Block>
        </Content>
      </Cotainer>
    </Wrapper>
  );
};
