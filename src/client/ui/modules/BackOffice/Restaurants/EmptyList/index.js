import React, { memo } from 'react';
import { } from './styled';

export const EmptyList = memo(({
  type = null,
}) => {
  const list = {
    restaurants: (
      <>
wffwfww
      </>
    ),
    archive: (
      <>
wfwfwf
      </>
    ),
  };

  return list[type || 'restaurants'];
});
