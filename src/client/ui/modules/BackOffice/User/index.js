import React, { useEffect } from 'react';
import { } from './styled';

const User = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      User
    </>
  );
};

export default User;
