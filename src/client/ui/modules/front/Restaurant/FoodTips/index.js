import React, { useEffect } from 'react';
import { } from './styled';

const FoodTips = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      FoodTips
    </>
  );
};

export default FoodTips;
