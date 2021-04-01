import React, { useEffect } from 'react';
import { 
  Wrapper,
} from './styled';

export const SideBar = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      rer
    </Wrapper>
  );
};
