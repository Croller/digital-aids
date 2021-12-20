import React from 'react';
import { EditTextAreaStyled } from './styled';

export const EditTextArea = ({
  name = null,
  className,
  placeholder = 'Введите текст',
  value = null,
  rows = 3,
  readonly = false,
  // onSave = () => {},
  onChange = () => {},
  onEditMode = () => {},
}) => (
  <EditTextAreaStyled
    name={name || 'edittextareacomp'}
    className={className}
    placeholder={placeholder}
    value={value || null}
    rows={rows || 3}
    readonly={readonly}
    onSave={obj => onChange(obj.value)}
    onChange={onChange}
    onEditMode={onEditMode}
  />
);
