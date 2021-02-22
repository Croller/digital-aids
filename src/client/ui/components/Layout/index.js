import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'client/ui/components/Header';
import { Footer } from 'client/ui/components/Footer';
import { MobileMenu } from 'client/ui/components/Footer/MobileMenu';
import { BREAKPOINTS } from 'client/style/constants';

import { 
  Wrapper,
  Cotainer,
  Content,
} from './styled';

export const Layout = ({
  children,
  className,
  header = null,
  footer = null,
  footerMenu = null,
}) => {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [isMobile, setIsMobile] = useState(true);
  const path = '/restaurant/las-cuevas';
  
  const handleRoute = useCallback((part) => {
    const editPart = part === 'back' ? 'categories' : part;

    if (history.action !== 'POP' && part === 'back') {
      history.goBack();
      return null;
    }
    history.push(`${path}/${editPart}`);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth <= BREAKPOINTS.small);
  }, []);

  return (
    <Wrapper className={className}>
      {!['information', 'foodtops'].includes(pathname) && (
        header || (
          <Header
            showClose={['language', 'menu', 'reglament', 'opinion'].includes(pathname)}
            isMobile={isMobile}
            onRoute={handleRoute}
          />
        )
      )}
      <Cotainer>
        <Content>
          {children}
        </Content>
      </Cotainer>
      {isMobile ? (footerMenu || (
        <MobileMenu onRoute={handleRoute} />
      )) : (footer || (<Footer />))}
    </Wrapper>
  );
};
