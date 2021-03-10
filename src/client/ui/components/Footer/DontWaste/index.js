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

const SOCIALS = [
  {
    key: 'instagram',
    icon: <InstagramSvg />,
  },
  {
    key: 'facebook',
    icon: <FacebookSvg />,
  },
  {
    key: 'tripadviser',
    icon: <RateTripadvisorSvg />,
  },
];

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
        {t('footer.dontwaste.descriptions')}
      </Description>
      {socials && (
        <SocialWrapper>
          {socials.map(({ key, url }) => {
            const social = SOCIALS.find(f => f.key === key);
            return (
              <SocialButton
                key={key}
                onClick={() => handleRoute(url)}
              >
                {social.icon}
              </SocialButton>
            );
          })}

        </SocialWrapper>
      )}
    </Wrapper>
  );
});
