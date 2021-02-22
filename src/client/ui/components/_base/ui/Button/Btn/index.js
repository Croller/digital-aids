import React from 'react';
import { Btn } from './styled';

export const Button = ({
  onClick,
  className,
  children,
}) => (
  <Btn className={className} onClick={onClick}>
    {children}
  </Btn>
);
