import React, { useEffect, useRef } from 'react';
import { OutSide } from './styled';

export const OutSideClick = ({ className = '', children, onOutSide }) => {
  const ref = useRef();

  useEffect(() => {
    const listener = e => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      onOutSide();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);

  return (
    <OutSide ref={ref} className={className}>
      {children}
    </OutSide>
  );
};
