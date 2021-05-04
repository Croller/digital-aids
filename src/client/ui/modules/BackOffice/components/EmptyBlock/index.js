import React from 'react';
import { useTranslation } from 'react-i18next';
import { RestaurantSvg } from 'client/assets/images';
import {
  Wrapper,
  Icon,
  Title,
  Descriptions,
} from './styled';

export const EmptyListRestaurant = ({
  type = 'restaurants',
  icon = <RestaurantSvg />,
}) => {
  const [t] = useTranslation();
  return (
    <Wrapper>
      {icon && (
        <Icon>
          {icon}
        </Icon>
      )}
      {type === 'restaurants' && (
        <Title>
          {`${t('common.words.welcome')}!`}
        </Title>
      )}
      <Descriptions>
        {type && t(`backOffice.emptyList.${type}`)}
      </Descriptions>
    </Wrapper>
  );
};
