import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  CarouselWrapper,
  ImageStyled,
  EditSrcStyled,
  EditTextStyled,
} from './styled';

export const Carousel = ({
  name,
  className,
  value = null,
  onUpdate = () => {},
}) => {
  const [imageEdit, setCarouselEdit] = useState(false);

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
    <CarouselWrapper>
      {!imageEdit ? (
        <ImageStyled
          src={value.image.src}
          alt={value.image.alt || 'image'}
          onClick={() => setCarouselEdit(true)}
        />
      ) : (
        <OutsideClickHandler onOutsideClick={() => setCarouselEdit(false)}>
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
    </CarouselWrapper>
  );
};
