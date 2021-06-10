import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getUrl, getDictionaryItem } from 'client/utils/common';
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
    count = null,
    name = '',
    description = null,
    price = null,
    allergens = null,
    images,
  },
  dictionary,
  onShowAllergens,
}) => {
  const [t] = useTranslation();
  const src = images && images[0] ? `${getUrl()}/static/restaurants/dishes/${images[0]}.png` : null;
  return (
    <Wrapper>
      <ImgWrapper>
        {src && (
          <Img src={src} />
        )}
        <Number>
          {count || 0}
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
        {allergens && price && (
          <InfoWrapper>
            <AllergensButton onClick={onShowAllergens}>
              {t('restaurant.common.allergens')}
            </AllergensButton>
            <Weight>
              {`${price[0].amount || '0'} ${getDictionaryItem(price[0].unit, 'id', dictionary.units, 'name')}`}
            </Weight>
          </InfoWrapper>
        )}
      </Content>
    </Wrapper>
  );
});
