import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'client/ui/components/_block/Modal';
import { useTranslation } from 'react-i18next';
import { RestaurantLogoTempPng } from 'client/assets/images';
import {
  Wrapper,
  Content,
  Logo,
  Title,
  Description,
  Controls,
  Ok,
  Cancel,
} from './styled';

export const Confirm18Modal = memo(({
  onOk,
  onCancel,
}) => {
  const [t] = useTranslation();
  const { logo } = useSelector(store => store.restaurant);
  
  return (
    <Modal>
      <Wrapper>
        <Content>
          <Logo src={logo || RestaurantLogoTempPng} />
          <Title>
            {t('compModal.confirm_age.title')}
          </Title>
          <Description>
            {t('compModal.confirm_age.description')}
          </Description>
        </Content>
        <Controls>
          <Ok onClick={onOk}>
            {t('common.yes_i')}
          </Ok>
          <Cancel onClick={onCancel}>
            {t('common.not_i')}
          </Cancel>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
