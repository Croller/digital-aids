import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  SoundWrapper,
  SoundStyled,
  EditSrcStyled,
  EditTextStyled,
} from './styled';

export const Sound = ({
  name,
  className,
  value = null,
  onUpdate = () => {},
}) => {
  const [soundEdit, setSoundEdit] = useState(false);

  const handleOnUpdate = (key, str) => {
    onUpdate({
      text: key === 'text' ? str : value.text,
      sound: {
        url: key === 'url' ? str : value.sound.url,
        alt: value.sound.alt,
      },
    });
  };

  return value && (
    <SoundWrapper>
      {!soundEdit ? (
        <SoundStyled
          src={value.sound.url}
          alt={value.sound.alt || 'sound'}
          controls
          onClick={() => setSoundEdit(true)}
        />
      ) : (
        <OutsideClickHandler onOutsideClick={() => setSoundEdit(false)}>
          <EditSrcStyled
            name="sound_url"
            placeholder="Введите ссылку на аудио"
            value={value.sound.url}
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
    </SoundWrapper>
  );
};
