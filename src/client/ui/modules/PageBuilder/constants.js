import React from 'react';
import { Header } from './components/Header';
import { Paragraph } from './components/Paragraph';
import { Image } from './components/Image';
import { Video } from './components/Video';
import { Sound } from './components/Sound';

export const components = [
  {
    label: 'Заголовок',
    name: 'header',
    component: (props) => <Header {...props} />,
    value: {
      text: null,
    },
  },
  {
    label: 'Параграф',
    name: 'paragraph',
    component: (props) => <Paragraph {...props} />,
    value: {
      text: null,
    },
  },
  {
    label: 'Изображение',
    name: 'image',
    component: (props) => <Image {...props} />,
    value: {
      text: null,
      image: {
        url: null,
        alt: null,
      },
    },
  },
  {
    label: 'Видео',
    name: 'video',
    component: (props) => <Video {...props} />,
    value: {
      text: null,
      video: {
        url: null,
        alt: null,
      },
    },
  },
  {
    label: 'Аудио',
    name: 'sound',
    component: (props) => <Sound {...props} />,
    value: {
      text: null,
      sound: {
        url: null,
        alt: null,
      },
    },
  },
];
