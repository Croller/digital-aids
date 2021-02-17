import React, { useState, useEffect, useCallback } from 'react';
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
  const [pos, setPos] = useState({ direction: 'down', prevPos: 0 });

  const handleNavigation = (e, prev) => {
    const window = e.currentTarget;
    console.log('prev', prev);
    // if (y > window.scrollY) {
    //   console.log('scrolling up');
    // } else if (y < window.scrollY) {
    //   console.log('scrolling down');
    // }
    // console.log('scrolling', y, window.scrollY);
    setPos({
      direction: window.scrollY > prev.prevPos ? 'down' : 'up',
      prevPos: window.scrollY,
    });
    // setY(window.scrollY);
  };

  useEffect(() => {
    // get isMobile
    setIsMobile(window.innerWidth <= BREAKPOINTS.small);
    // detect scroll for hide footerMenu at mobile
    // this.prev = window.scrollY;
    window.addEventListener('scroll', (e) => handleNavigation(e, pos));

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, []);

  useEffect(() => {
    console.log('direction', pos);
  }, [pos]);

  return (
    <Wrapper className={className} onScroll={(e) => console.log('wrapper', e)}>
      {header || (<Header mobile={isMobile} />)}
      <Cotainer className="layout__container" onScroll={(e) => console.log('container', e)}>
        <Content onScroll={(e) => console.log('content', e)}>
          {children}
        </Content>
      </Cotainer>
      {!isMobile && (footer || (<Footer />))}
      {isMobile && (footerMenu || (<FooterMenu />))}
    </Wrapper>
  );
};
