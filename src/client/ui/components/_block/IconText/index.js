import React, { memo } from 'react';
import {
  Span,
  Icon,
} from './styled';

export const IconText = memo(({
  icon = null,
  text = null,
  className,
}) => (
  <Span className={className}>
    {icon && (
      <Icon>
        {icon}
      </Icon>
    )}
    {text && text}
  </Span>
));
