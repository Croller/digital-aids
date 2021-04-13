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
  search = null,
}) => {
  const [t] = useTranslation();

  return type && (
    <Wrapper>
      <Icon>
        {type === 'restaurants' ? <RestaurantSvg /> : <ArchiveSvg />}
      </Icon>
      {type === 'restaurants' && search === null && (
        <Title>
          {`${t('common.words.welcome')}!`}
        </Title>
      )}
      <Descriptions>
        {search === null && t(`backOffice.emptyList.${type}`)}
        {search !== null && search.length === 0 && t('backOffice.emptyList.search')}
      </Descriptions>
    </Wrapper>
  );
});
