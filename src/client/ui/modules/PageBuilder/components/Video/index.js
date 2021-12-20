import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  VideoWrapper,
  Container,
  VideoStyled,
  EditSrcStyled,
  EditTextStyled,
} from './styled';

export const Video = ({
  name,
  className,
  value = null,
  onUpdate = () => {},
}) => {
  const [videoEdit, setVideoEdit] = useState(false);

  const handleOnUpdate = (key, str) => {
    onUpdate({
      text: key === 'text' ? str : value.text,
      video: {
        url: key === 'url' ? str : value.video.url,
        alt: value.video.alt,
      },
    });
  };

  return value && (
    <VideoWrapper>
      <Container>
        {!videoEdit ? (
          <VideoStyled
            url={value.video.url}
            alt={value.video.alt || 'video'}
            onClick={() => setVideoEdit(true)}
          />
        ) : (
          <OutsideClickHandler onOutsideClick={() => setVideoEdit(false)}>
            <EditSrcStyled
              name="video_url"
              placeholder="Введите ссылку на видео"
              value={value.video.url}
              onChange={(str) => handleOnUpdate('url', str)}
            />
          </OutsideClickHandler>
        )}
        <EditTextStyled
          name={name}
          className={className}
          value={value.text}
          onChange={(str) => handleOnUpdate('text', str)}
        />
      </Container>
    </VideoWrapper>
  );
};
