import React, { useEffect } from 'react';
import { } from './styled';

const Main = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      Main
    </>
  );
};

export default Main;
