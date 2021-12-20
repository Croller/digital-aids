import React, { useEffect } from 'react';
import { } from './styled';

export const PageBuilderModule = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      test
    </>
  );
};
