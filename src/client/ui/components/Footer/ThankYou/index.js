import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ThumbsUpGreenSvg } from 'client/assets/images';
import {
  Wrapper,
  IconWrapper,
  Title,
  Description,
} from './styled';

export const ThankYou = memo(() => {
  const [t] = useTranslation();
  return (
    <Wrapper>
      <IconWrapper>
        <ThumbsUpGreenSvg />
      </IconWrapper>
      <Title>
        {t('footer.thankyou.title')}
      </Title>
      <Description>
        {t('footer.thankyou.descriptions')}
      </Description>
    </Wrapper>
  );
});
