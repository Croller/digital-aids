import React, { useState, useEffect } from 'react';
import { Wrapper } from './style';

export const ScrollHideBlock = ({
  element = null,
  className,
  children,
  direction = 'down',
}) => {
  const [pos, setPos] = useState(0);
  const [show, setShow] = useState(true);

  const events = [
    {
      name: 'touchstart',
      func: (e) => onScrollTouch(e),
    },
    {
      name: 'scroll',
      func: () => onScroll(),
    },
  ];

  const onScrollTouch = (e) => {
    const event = e.originalEvent || e;
    if (event.touches.length > 0) {
      setPos({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    }
  };

  const onScroll = () => {
    const { scrollX, scrollY } = window;
    const { offsetHeight, scrollTop, scrollHeight } = document.body;
    setShow(scrollY < pos.y);

    if (scrollY < 140) {
      setShow(true);
    }
    if (offsetHeight + scrollTop + 140 >= scrollHeight) {
      setShow(true);
    }
    setPos({ x: scrollX, y: scrollY });
  };

  useEffect(() => {
    events.map((obj) => (element || window).addEventListener(obj.name, obj.func));

    return () => {
      events.map((obj) => (element || window).removeEventListener(obj.name, obj.func));
    };
  }, [pos]);

  return (
    <Wrapper className={className} show={show} direction={direction}>
      {children}
    </Wrapper>
  );
};
