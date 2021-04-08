import React, { forwardRef } from 'react';
import { InputStyled } from './styled';

export const Input = forwardRef(({
  type = 'text',
  step = null,
  placeholder = null,
  disabled = false,
  prefix = null,
  suffix = null,
  value = null,
  onChange = () => {},
  className,
}, ref) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <InputStyled
      ref={ref}
      type={type}
      step={step}
      value={value}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      prefix={prefix}
      suffix={suffix}
      onChange={handleChange}
    />
  );
});
