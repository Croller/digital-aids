import React, { memo } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Btn, SpinStyled } from './styled';

export const Button = memo(({
  type = null,
  loading = false,
  disabled = false,
  onClick = () => {},
  htmlType = null,
  className,
  children,
}) => {
  const indicator = (<LoadingOutlined spin />);

  const handleClick = (e) => {
    if (!disabled && !loading) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <Btn
      type={type}
      disabled={disabled || loading}
      htmlType={htmlType}
      className={className}
      onClick={handleClick}
    >
      {loading && (<SpinStyled indicator={indicator} />)}
      {children}
    </Btn>
  );
});
