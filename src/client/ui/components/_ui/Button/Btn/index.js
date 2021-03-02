import React, { memo } from 'react';
import { Btn } from './styled';

export const Button = memo(({
  onClick,
  className,
  children,
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <Btn className={className} onClick={handleClick}>
      {children}
    </Btn>
  );
});
