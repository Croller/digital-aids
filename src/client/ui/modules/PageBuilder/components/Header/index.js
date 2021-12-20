import React, { } from 'react';
import {
  HeaderWrapper,
  EditTextStyled,
} from './styled';

export const Header = ({
  name,
  className,
  value = null,
  onUpdate = () => {},
}) => (
  <HeaderWrapper>
    <EditTextStyled
      name={name}
      className={className}
      value={value && value.text}
      onChange={(text) => onUpdate({ text })}
    />
  </HeaderWrapper>
);
