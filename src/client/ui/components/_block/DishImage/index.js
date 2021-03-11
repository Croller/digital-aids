import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PlateTempPng } from 'client/assets/images';
import {
  Wrapper,
  ImgWrapper,
  Img,
  Number,
  Content,
  Title,
  Description,
  InfoWrapper,
  AllergensButton,
  Weight,
} from './styled';

export const DishImage = memo(({
  source: {
    src = null,
    number = null,
    name = '',
    description = null,
    amount = null,
    amount_unit = null,
    allergens = null,
  },
  onShowAllergens,
}) => {
  const [t] = useTranslation();

  return (
    <Wrapper>
      <ImgWrapper>
        <Img src={src || PlateTempPng} />
        <Number>
          {number || 10}
        </Number>
      </ImgWrapper>
      <Content>
        <Title>
          {name}
        </Title>
        {description && (
          <Description>
            {description}
          </Description>
        )}
        {(allergens || amount) && (
          <InfoWrapper>
            <AllergensButton onClick={onShowAllergens}>
              {t('restaurant.common.allergens')}
            </AllergensButton>
            {amount && (
              <Weight>
                {`${amount || 0} ${amount_unit && t(`restaurant.common.unit.${amount_unit}`)}`}
              </Weight>
            )}
          </InfoWrapper>
        )}
      </Content>
    </Wrapper>
  );
});
