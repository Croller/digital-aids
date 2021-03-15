import React from 'react';
import { Header } from 'client/ui/components/Header/Present';
import { Footer } from 'client/ui/components/Footer/Present';

import { 
  Wrapper,
  Cotainer,
} from './styled';

export const Layout = ({
  children,
  className,
}) => (
  <Wrapper className={className}>
    <Header />
    <Cotainer>
      {children}
    </Cotainer>
    <Footer />
  </Wrapper>
);
