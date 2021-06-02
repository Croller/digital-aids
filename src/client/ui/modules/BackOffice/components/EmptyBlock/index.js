import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArchiveSvg } from 'client/assets/images';
import {
  Wrapper,
  Icon,
  Title,
  Descriptions,
} from './styled';

export const EmptyBlock = ({
  type = 'noData',
  icon = <ArchiveSvg />,
  className,
}) => {
  const [t] = useTranslation();
  return (
    <Wrapper className={className}>
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
        {t(`backOffice.emptyList.${type}`)}
      </Descriptions>
    </Wrapper>
  );
};
