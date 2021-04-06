import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { } from './styled';

const Restourants = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      <Navbar />
      Restourants
    </>
  );
};

export default Restourants;
