import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'client/ui/components/Header/BackOffice';
import { SideBar } from 'client/ui/components/SideBar/BackOffice';

import { 
  Wrapper,
  Cotainer,
  Content,
} from './styled';

export const Layout = ({
  children,
  className,
}) => {
  const history = useHistory();
  const [showSideBar, setShowSideBar] = useState(true);
  
  const handleRoute = useCallback((part) => {
    let path = `/back-office/${part}`;
    path = part === 'back' ? 'categories' : part;

    if (history.action !== 'POP' && part === 'back') {
      history.goBack();
      return null;
    }
    history.push(path);
  }, []);

  return (
    <Wrapper className={className}>
      <Header
        onShowSideBar={() => setShowSideBar(!showSideBar)}
        onRoute={handleRoute}
      />
      {showSideBar && (
        <SideBar
          onRoute={handleRoute}
        />
      )}
      <Cotainer>
        <Content sidebar={showSideBar}>
          {children}
        </Content>
      </Cotainer>
    </Wrapper>
  );
};
