import React, { useEffect } from 'react';
import { } from './styled';

const Politics = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      Politics
    </>
  );
};

export default Politics;
