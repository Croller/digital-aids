import React, { useEffect } from 'react';
import { } from './styled';

const Restourant = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      Restourant
    </>
  );
};

export default Restourant;
