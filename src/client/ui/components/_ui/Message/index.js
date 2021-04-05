import React, { useEffect } from 'react';
import { message } from 'antd';

const CONFIG = {
  style: {
    position: 'absolute',
    top: '82px',
    width: '100%',
  },
  duration: 5,
  maxCount: 1,
};

export const contextMessage = () => {
  // const [api, contextHolder] = message.useMessage();
  // message.config(CONFIG);
  // return [api, contextHolder];
};

export const Message = ({
  type = 'success',
  content = null,
  options = {},
  onClick = () => {},
  onClose = () => {},
}) => {
  const config = {
    ...CONFIG,
    ...options,
    content,
    onClose: () => onClose(),
    onClick: () => {
      onClick();
      // message.destroy();
    },
  };

  useEffect(() => {
    if (content) {
      message[type](config);
    }
    return () => {
      message.destroy();
    };
  }, [content]);

  return (<></>);
};

