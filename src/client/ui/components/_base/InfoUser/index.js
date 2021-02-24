import React from 'react';
import { detect } from 'detect-browser';

export const InfoUser = () => {
  const detectBrowser = { ...detect() };
  delete detectBrowser.type;

  console.log('user info:', {
    browser: detectBrowser,
  });

  return (
    <>
    </>
  );
};
