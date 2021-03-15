import React, { useEffect } from 'react';
import { } from './styled';

const Tutorial = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      Tutorial
    </>
  );
};

export default Tutorial;
