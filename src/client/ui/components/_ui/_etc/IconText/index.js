import React, { memo } from 'react';
import {
  Span,
  Text,
} from './styled';

export const IconText = memo(({
  icon = null,
  text = null,
  className,
}) => (
  <Span className={className}>
    {icon && icon}
    {text && (
      <Text>
        {text}
      </Text>
    )}
  </Span>
));
