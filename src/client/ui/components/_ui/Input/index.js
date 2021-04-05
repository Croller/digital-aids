import React, { forwardRef } from 'react';
import { InputStyled } from './styled';

export const Input = forwardRef(({
  type = 'text',
  placeholder = null,
  prefix = null,
  suffix = null,
  onChange = () => {},
  className,
}, ref) => (
  <InputStyled
    ref={ref}
    type={type}
    className={className}
    placeholder={placeholder}
    prefix={prefix}
    suffix={suffix}
    onChange={onChange}
  />
));
