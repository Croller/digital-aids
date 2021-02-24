import React, { useEffect } from 'react';
import QRCode from 'qrcode.react';
import { } from './styled';

const Receipt = () => {
  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <>
      Receipt
      <QRCode value="test" />
    </>
  );
};

export default Receipt;
