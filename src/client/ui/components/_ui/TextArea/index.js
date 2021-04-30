import React, { forwardRef } from 'react';
import { TextAreaF, TextAreaS } from './styled';

export const TextAreaForm = forwardRef(({
  minRows = 4,
  maxRows = 8,
  placeholder = null,
  disabled = false,
  defaultValue = null,
  value = null,
  onChange = () => {},
  className,
}, ref) => (
  <TextAreaF
    ref={ref}
    autoSize={{ minRows, maxRows }}
    className={className}
    placeholder={placeholder}
    disabled={disabled}
    defaultValue={defaultValue}
    value={value}
    onChange={onChange}
  />
));

export const TextAreDefault = ({
  minRows = 4,
  maxRows = 8,
  placeholder = null,
  disabled = false,
  defaultValue = null,
  value = null,
  onChange = () => {},
  className,
}) => {
  const handleChange = (e) => {
    e.persist();

    setTimeout(() => {
      onChange(e.target.value); 
    }, 100);
  };

  return (
    <TextAreaF
      autoSize={{ minRows, maxRows }}
      className={className}
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={defaultValue}
      value={value}
      onChange={handleChange}
    />
  );
};

export const TextAreaSimple = ({
  rows = 1,
  columns = 1,
  placeholder = null,
  onChange,
  className,
}) => (
  <TextAreaS
    rows={rows}
    columns={columns}
    className={className}
    placeholder={placeholder}
    onChange={onChange}
  />
);
