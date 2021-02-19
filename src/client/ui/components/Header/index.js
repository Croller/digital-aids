import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wrapper,
} from './styled';

export const Header = ({ 
  className,
  mobile = false,
}) => {
  const { t } = useTranslation();
  return (
    <Wrapper
      className={className}
      mobile={mobile}
    >
      Header
      {t('test')}
    </Wrapper>
  );
};
