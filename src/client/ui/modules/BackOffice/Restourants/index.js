import React, { useEffect } from 'react';
import { } from './styled';

const Restourants = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      Restourants
    </>
  );
};

export default Restourants;
