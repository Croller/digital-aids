import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { } from './styled';

const Restourant = () => {
  const params = useParams();
  useEffect(() => {
    console.log('params', params);
    window.prerenderReady = true;
  }, []);

  return (
    <>
      Restourant
    </>
  );
};

export default Restourant;
