import React, { useState } from 'react';
import {
  ImgCropWrapper,
  ReactCropStyled,
} from './styled';

export const ImgCrop = ({
  source = null,
  setting = null,
  minWidth = null,
  minHeight = null,
  maxWidth = null,
  maxHeight = null,
  disabled = false,
  locked = false,
  onComplete = () => {},
  className,
}) => {
  const [crop, setCrop] = useState(setting || {});

  return source && source.base64 && (
    <ImgCropWrapper className={className}>
      <ReactCropStyled
        src={source.base64}
        crop={crop}
        onChange={setCrop}
        onComplete={(params) => onComplete(source, params)}
        minWidth={minWidth}
        minHeight={minHeight}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        disabled={disabled}
        locked={locked}
      />
    </ImgCropWrapper>
  );
};
