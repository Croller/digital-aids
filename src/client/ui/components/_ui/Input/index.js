import React, { forwardRef } from 'react';
import { InputStyled } from './styled';

export const Input = forwardRef(({
  type = 'text',
  placeholder = null,
  prefix = null,
  suffix = null,
  onChange = () => {},
  className,
}, ref) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <InputStyled
      ref={ref}
      type={type}
      className={className}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
      onChange={handleChange}
    />
  );
});
