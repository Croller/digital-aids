import React from 'react';
import { InputStyled } from './styled';

export const Input = ({
  placeholder = null,
  prefix = null,
  suffix = null,
  onChange = () => {},
  className,
}) => (
  <InputStyled
    className={className}
    placeholder={placeholder}
    prefix={prefix}
    suffix={suffix}
    onChange={onChange}
  />
);
