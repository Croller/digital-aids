import React from 'react';
import { SelectStyled, OptionStyled } from './styled';

export const Select = ({
  className,
  children,
}) => (
  <SelectStyled className={className}>
    {children}
  </SelectStyled>
);

export const Option = ({ 
  className,
  children,
}) => (
  <OptionStyled className={className}>
    {children}
  </OptionStyled>
)