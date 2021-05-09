import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  InstagramSvg,
  FacebookSvg,
  RateTripadvisorSvg,
} from 'client/assets/images';
import {
  Wrapper,
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

export const DontWaste = memo(() => {
  const [t] = useTranslation();
  const { socials } = useSelector(store => store.restaurant.info);

  const handleRoute = (url) => {
    window.open(url, '_blank').focus();
  };
  
  return (
    <Wrapper>
      <Hr />
      <Description>
        {t('restaurant.footer.dontwaste.descriptions')}
      </Description>
      {socials && (
        <SocialWrapper>
          {Object.keys(socials).map(key => SOCIALS_MAPPER[key] && (
            <SocialButton
              key={key}
              onClick={() => handleRoute(socials[key].url)}
            >
              {SOCIALS_MAPPER[key].icon}
            </SocialButton>
          ))}
        </SocialWrapper>
      )}
    </Wrapper>
  );
});
