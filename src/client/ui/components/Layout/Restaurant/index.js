import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header } from 'client/ui/components/Header/Restaurant';
import { MobileMenu } from 'client/ui/components/Footer/MobileMenu';
import { BREAKPOINTS } from 'client/style/constants';
import { getUrl } from 'client/utils/common';

import { 
  Wrapper,
  Cotainer,
  Content,
} from './styled';

export const Layout = ({
  children,
  className,
  header = null,
  footerMenu = null,
}) => {
  const history = useHistory();
  const { key, images } = useSelector(store => store.restaurant.info);
  const { location: { pathname } } = history;
  const [isMobile, setIsMobile] = useState(true);
  
  const logo = images && images[0] ? `${getUrl()}/static/restaurants/logo/${images[0]}.png` : null;
  
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
    const bool = !['information', 'foodtips', 'receipt', 'reserve'].some(f => path.indexOf(f) > -1);
    return bool;
  };

  const getShowFooterMenu = (path) => {
    const bool = !['foodtips', 'reserve'].some(f => path.indexOf(f) > -1);
    return bool;
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= Number(BREAKPOINTS.small.replace('px', '')));
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
      <Cotainer
        header={getShowHeader(pathname)}
        footer={getShowFooterMenu(pathname)}
      >
        <Content>
          {children}
        </Content>
      </Cotainer>
      {isMobile && getShowFooterMenu(pathname) && (footerMenu || (
        <MobileMenu
          pathname={pathname}
          onRoute={handleRoute}
        />
      ))}
    </Wrapper>
  );
};
