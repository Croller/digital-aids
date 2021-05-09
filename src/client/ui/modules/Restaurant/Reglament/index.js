import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
  const state = useSelector(s => s);
  const { allergens } = state.restaurant.dictionary;

  return (
    <Wrapper>
      <Header>
        <Title>
          {t('restaurant.common.reglament')}
        </Title>
        <Description>
          {t('restaurant.pageAllergens.descriptions')}
        </Description>
      </Header>
      <AllergensStyled source={allergens} />
      <ThankYou />
    </Wrapper>
  );
});

export default Reglament;
