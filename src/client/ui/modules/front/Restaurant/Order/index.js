import React, { useEffect } from 'react';
import { } from './styled';

const Order = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      Order
    </>
  );
};

export default Order;
