import React from 'react';
import { useHistory } from 'react-router-dom';
import { A } from './styled';

export const Link = React.memo(({
  path = null,
  href = null,
  onClick = null,
  children,
  className,
}) => {
  const history = useHistory();
  
  const handleClick = () => {
    if (!href) {
      if (path) {
        history.push(path);
        return;
      }
      onClick && onClick();
    }
  };

  return (
    <A href={href} className={className} onClick={handleClick}>
      {children}
    </A>
  );
});
