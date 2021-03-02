import React, { memo } from 'react';
import { TickSvg } from 'client/assets/images';
import {
  Wrapper,
  Check,
  Container,
} from './styled';

export const CheckBox = memo(({
  value = false,
  onClick,
  className,
  children = null,
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Wrapper
      className={className}
      onClick={handleClick}
      text={children}
    >
      {children ? (
        <Check text={children}>
          {value && (
            <TickSvg />
          )}
        </Check>
      ) : (value && (
        <TickSvg />
      ))}
      {children && (<Container>{children}</Container>)}
    </Wrapper>
  );
});
