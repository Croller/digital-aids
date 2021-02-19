import React, { useState, useEffect } from 'react';
import { Header } from 'client/ui/components/Header';
import { Footer } from 'client/ui/components/Footer';
import { FooterMenu } from 'client/ui/components/Mobile/FooterMenu';
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
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth <= BREAKPOINTS.small);
  }, []);

  return (
    <Wrapper className={className}>
      {header || (<Header mobile={isMobile} />)}
      <Cotainer>
        <Content>
          {children}
        </Content>
      </Cotainer>
      {!isMobile && (footer || (<Footer />))}
      {isMobile && (footerMenu || (<FooterMenu />))}
    </Wrapper>
  );
};
