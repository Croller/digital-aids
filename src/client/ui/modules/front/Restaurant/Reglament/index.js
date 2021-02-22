import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import { 
  Wrapper,
  Header,
  Title,
  Description,
  AllergensStyled,
} from './styled';

const Reglament = memo(() => {
  const [t] = useTranslation();
  return (
    <Wrapper>
      <Header>
        <Title>
          {t('common.reglament')}
        </Title>
        <Description>
          {t('pageAllergens.descriptions')}
        </Description>
      </Header>
      <AllergensStyled />
      <ThankYou />
    </Wrapper>
  );
});

export default Reglament;
