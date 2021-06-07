import React, { forwardRef } from 'react';
import { InputStyled } from './styled';

export const InputForm = forwardRef(({
  type = 'text',
  step = null,
  placeholder = null,
  disabled = false,
  prefix = null,
  suffix = null,
  defaultValue = null,
  value = null,
  addonAfter = null,
  onChange = () => {},
  onPressEnter = () => {},
  className,
}, ref) => (
  <InputStyled
    ref={ref}
    type={type}
    step={step}
    className={className}
    placeholder={placeholder}
    disabled={disabled}
    prefix={prefix}
    suffix={suffix}
    defaultValue={defaultValue}
    value={value}
    onChange={onChange}
    addonAfter={addonAfter}
    onPressEnter={onPressEnter}
  />
));

export const InputDefault = ({
  type = 'text',
  step = null,
  placeholder = null,
  disabled = false,
  prefix = null,
  suffix = null,
  value = null,
  allowClear = false,
  onChange = () => {},
  onPressEnter = () => {},
  className,
}) => {
  const handleChange = (e) => {
    e.persist();

    setTimeout(() => {
      onChange(e.target.value); 
    }, 100);
  };

  return (
    <InputStyled
      type={type}
      step={step}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      prefix={prefix}
      suffix={suffix}
      defaultValue={value}
      allowClear={allowClear}
      onChange={handleChange}
      onPressEnter={onPressEnter}
    />
  );
};
