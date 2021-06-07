import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  ThumbsUpGreenSvg,
  InstagramSvg,
  FacebookSvg,
  RateTripadvisorSvg,
} from 'client/assets/images';
import {
  Wrapper,
  IconWrapper,
  Title,
  Hr,
  Description,
  SocialWrapper, SocialButton,
} from './styled';

const SOCIALS_MAPPER = {
  instagram: {
    icon: <InstagramSvg />,
  },
  facebook: {
    icon: <FacebookSvg />,
  },
  tripadvisor: {
    icon: <RateTripadvisorSvg />,
  },
};

export const ThankYou = memo(() => {
  const [t] = useTranslation();
  const { socials } = useSelector(store => store.restaurant.info);

  const handleRoute = (url) => {
    window.open(url, '_blank').focus();
  };
  
  return (
    <Wrapper>
      <IconWrapper>
        <ThumbsUpGreenSvg />
      </IconWrapper>
      <Title>
        {t('restaurant.footer.thankyou.title')}
      </Title>
      <Hr />
      <Description>
        {t('restaurant.footer.thankyou.descriptions')}
      </Description>
      {socials && (
        <SocialWrapper>
          {Object.keys(socials).map(social => SOCIALS_MAPPER[social] && (
            <SocialButton
              key={social}
              onClick={() => handleRoute(socials[social].url)}
            >
              {SOCIALS_MAPPER[social].icon}
            </SocialButton>
          ))}
        </SocialWrapper>
      )}
    </Wrapper>
  );
});
