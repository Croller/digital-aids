import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wrapper,
  ImgWrapper,
  Img,
  Number,
  Content,
  TitleWrapper,
  Title,
  // CheckBox,
  Description,
  InfoWrapper,
  AllergensButton,
  Weight,
} from './styled';

export const DishImage = memo(({
  source: {
    src = null,
    number = null,
    title = '',
    description = null,
    weight = null,
  },
  onShowAllergens,
}) => {
  const [t] = useTranslation();

  return (
    <Wrapper>
      <ImgWrapper>
        <Img src={src} />
        <Number>
          {number || 10}
        </Number>
      </ImgWrapper>
      <Content>
        <TitleWrapper>
          <Title>
            {title}
          </Title>
        </TitleWrapper>
        <Description>
          {description}
        </Description>
        <InfoWrapper>
          <AllergensButton onClick={onShowAllergens}>
            {t('common.allergens')}
          </AllergensButton>
          <Weight>
            {`${weight || 0}${t('common.weight.gramm')}`}
          </Weight>
        </InfoWrapper>
      </Content>
    </Wrapper>
  );
});
