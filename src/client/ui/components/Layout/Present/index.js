import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'client/ui/components/Header/Present';
import { Footer } from 'client/ui/components/Footer/Present';

import { 
  Wrapper,
  Cotainer,
} from './styled';

export const Layout = ({
  children,
  className,
}) => {
  const history = useHistory();
  const { location: { pathname } } = history;

  const getShowFooter = () => {
    const bool = !['/restaurants/search'].some(f => pathname.indexOf(f) > -1);
    return bool;
  };

  return (
    <Wrapper className={className}>
      <Header />
      <Cotainer>
        {children}
      </Cotainer>
      {getShowFooter() && (
        <Footer />
      )}
    </Wrapper>
  );
};
