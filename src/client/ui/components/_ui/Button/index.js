import React, { forwardRef } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Btn, SpinStyled } from './styled';

export const Button = forwardRef(({
  type = null,
  loading = false,
  disabled = false,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  onFocus = () => {},
  htmlType = 'button',
  className,
  children,
}, ref) => {
  const indicator = (<LoadingOutlined spin />);

  const handleClick = (e) => {
    if (!disabled && !loading) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <Btn
      ref={ref}
      type={type}
      disabled={disabled}
      loading={loading ? 1 : 0}
      htmlType={htmlType}
      className={className}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
    >
      {loading && (<SpinStyled indicator={indicator} />)}
      {children}
    </Btn>
  );
});
