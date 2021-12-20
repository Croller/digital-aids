import React from 'react';
import { EditTextStyled } from './styled';

export const EditText = ({
  name = null,
  className,
  placeholder = 'Введите текст',
  value = null,
  type = 'text',
  inline = false,
  readonly = false,
  // onSave = () => {},
  onChange = () => {},
  onEditMode = () => {},
}) => (
  <EditTextStyled
    name={name || 'edittextcomp'}
    className={className}
    placeholder={placeholder}
    value={value || null}
    type={type}
    inline={inline}
    readonly={readonly}
    onSave={obj => onChange(obj.value)}
    // onChange={onChange}
    onEditMode={onEditMode}
  />
);
