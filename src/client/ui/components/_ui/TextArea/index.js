import React from 'react';
import { TxtArea } from './styled';

export const TextArea = ({
  rows = 1,
  columns = 1,
  placeholder = null,
  onChange,
  className,
}) => (
  <TxtArea
    rows={rows}
    columns={columns}
    className={className}
    placeholder={placeholder}
    onChange={onChange}
  />
);
