import React, { useEffect } from 'react';
import { } from './styled';

const Users = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      Users
    </>
  );
};

export default Users;
