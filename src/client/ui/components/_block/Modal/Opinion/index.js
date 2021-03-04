import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'client/ui/components/_block/Modal';
import { useTranslation } from 'react-i18next';
import { RestaurantLogoTempPng } from 'client/assets/images';
import {
  Wrapper,
  Content,
  Logo,
  Description,
  Controls,
  Ok,
} from './styled';

export const OpinionModal = memo(({
  onOk,
}) => {
  const [t] = useTranslation();
  const { logo } = useSelector(store => store.restaurant);
  
  return (
    <Modal>
      <Wrapper>
        <Content>
          <Logo src={logo || RestaurantLogoTempPng} />
          <Description>
            {t('compModal.opinion_exist')}
          </Description>
        </Content>
        <Controls>
          <Ok onClick={onOk}>
            {t('common.ok')}
          </Ok>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
