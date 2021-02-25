import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TrashSvg } from 'client/assets/images';
import {
  Wrapper,
  TitleWrapper,
  Title,
  TrashButton,
  Container,
  ScrollHideBlockStyled,
  TotalWrapper,
  Total,
  TotalText,
  TotalSumm,
  CreateButton,
} from './styled';

const Order = () => {
  const {
    key,
    currency,
    dishes,
  } = useSelector(store => store.restaurant);
  const history = useHistory();
  const [t] = useTranslation();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>
          {`${t('common.my')} ${t('common.order')}`}
        </Title>
        <TrashButton>
          <TrashSvg />
        </TrashButton>
      </TitleWrapper>
      <Container>
        efefe
      </Container>
      <ScrollHideBlockStyled>
        <TotalWrapper>
          <Total>
            <TotalText>
              {`${t('common.total')}:`}
            </TotalText>
            <TotalSumm>
              {`${total} ${t(`common.currency.${currency[0]}`)}`}
            </TotalSumm>
          </Total>
          <CreateButton>
            {`${t('common.create')} ${t('common.an')} ${t('common.order')}`}
          </CreateButton>
        </TotalWrapper>
      </ScrollHideBlockStyled>
    </Wrapper>
  );
};

export default Order;
