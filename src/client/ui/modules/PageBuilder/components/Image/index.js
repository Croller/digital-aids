import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  ImageWrapper,
  Container,
  ImageStyled,
  EditSrcStyled,
  EditTextStyled,
} from './styled';

export const Image = ({
  name,
  className,
  value = null,
  onUpdate = () => {},
}) => {
  const [imageEdit, setImageEdit] = useState(false);

  const handleOnUpdate = (key, str) => {
    onUpdate({
      text: key === 'text' ? str : value.text,
      image: {
        src: key === 'src' ? str : value.image.src,
        alt: value.image.alt,
      },
    });
  };

  return value && (
    <ImageWrapper>
      <Container>
        {!imageEdit ? (
          <ImageStyled
            src={value.image.src}
            alt={value.image.alt || 'image'}
            onClick={() => setImageEdit(true)}
          />
        ) : (
          <OutsideClickHandler onOutsideClick={() => setImageEdit(false)}>
            <EditSrcStyled
              name="image_src"
              placeholder="Введите ссылку на картинку"
              value={value.image.src}
              onChange={(str) => handleOnUpdate('src', str)}
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
    </ImageWrapper>
  );
};
