import React, { } from 'react';
import {
  ParagraphWrapper,
  EditTextAreaStyled,
} from './styled';

export const Paragraph = ({
  name,
  className,
  row = null,
  value = null,
  onUpdate = () => {},
}) => (
  <ParagraphWrapper>
    <EditTextAreaStyled
      name={name}
      row={row}
      className={className}
      value={value && value.text}
      onChange={(text) => onUpdate({ text })}
    />
  </ParagraphWrapper>
);
