import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header } from 'client/ui/components/Header';
import { Footer } from 'client/ui/components/Footer';
import { MobileMenu } from 'client/ui/components/Footer/MobileMenu';
import { BREAKPOINTS } from 'client/style/constants';
import { useModal } from 'react-modal-hook';
import { OfferRestaurantModal } from 'client/ui/components/_block/Modal/Offer/Restaurant';

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
  const { key, logo, offers } = useSelector(store => store.restaurant);
  const { location: { pathname } } = history;
  const [isMobile, setIsMobile] = useState(true);
  const [showOffer, hideOffer] = useModal(() => (
    <OfferRestaurantModal
      source={offers && offers[0]}
      onClose={hideOffer}
    />
  ));
  
  const handleRoute = useCallback((part) => {
    const path = `/restaurant/${key}`;
    const editPart = part === 'back' ? 'categories' : part;

    if (history.action !== 'POP' && part === 'back') {
      history.goBack();
      return null;
    }
    history.push(`${path}/${editPart}`);
  }, []);

  const getShowHeader = (path) => {
    const bool = !['information', 'foodtips', 'receipt'].some(f => path.indexOf(f) > -1);
    return bool;
  };

  const getShowFooterMenu = (path) => {
    const bool = !['foodtips'].some(f => path.indexOf(f) > -1);
    return bool;
  };

  useEffect(() => {
    showOffer();
    setIsMobile(window.innerWidth <= BREAKPOINTS.small);
  }, []);

  return (
    <Wrapper className={className}>
      {getShowHeader(pathname) && (
        header || (
          <Header
            logo={logo}
            isMobile={isMobile}
            onRoute={handleRoute}
          />
        )
      )}
      <Cotainer header={getShowHeader(pathname)}>
        <Content>
          {children}
        </Content>
      </Cotainer>
      {isMobile ? getShowFooterMenu(pathname) && (footerMenu || (
        <MobileMenu
          pathname={pathname}
          onRoute={handleRoute}
        />
      )) : (footer || (<Footer />))}
    </Wrapper>
  );
};
