import React, { useEffect } from 'react';
import { message } from 'antd';

export const Message = ({
  content = null,
  onClick = () => {},
  onClose = () => {},
}) => {
  const config = {
    style: {
      position: 'absolute',
      top: '82px',
      width: '100%',
    },
    duration: 5,
    maxCount: 1,
    content,
    onClose: () => onClose(),
    onClick: () => {
      onClick();
      message.destroy();
    },
  };

  useEffect(() => {
    if (content) {
      message.error(config);
    }
    return () => {
      message.destroy();
    };
  }, [content]);

  return (<></>);
};
