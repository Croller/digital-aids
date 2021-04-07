import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArchiveSvg, RestaurantSvg } from 'client/assets/images';
import {
  Wrapper,
  Icon,
  Title,
  Descriptions,
} from './styled';

export const EmptyList = memo(({
  type = null,
}) => {
  const [t] = useTranslation();

  const list = {
    restaurants: (
      <Wrapper>
        <Icon>
          <RestaurantSvg />
        </Icon>
        <Title>
          {`${t('common.words.welcome')}!`}
        </Title>
        <Descriptions>
          {t('backOffice.emptyList.restaurants.text')}
        </Descriptions>
      </Wrapper>
    ),
    archive: (
      <Wrapper>
        <Icon>
          <ArchiveSvg />
        </Icon>
        <Descriptions>
          {t('backOffice.emptyList.archive.text')}
        </Descriptions>
      </Wrapper>
    ),
  };

  return list[type || 'restaurants'];
});
