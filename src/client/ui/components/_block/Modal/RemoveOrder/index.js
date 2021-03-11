import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { CloseSvg } from 'client/assets/images';
import { useTranslation } from 'react-i18next';
import {
  Wrapper,
  CloseButton,
  Content,
  Title,
  Controls,
  Ok,
  Cancel,
} from './styled';

export const RemoveOrderModal = memo(({
  onOk,
  onCancel,
  onClose,
}) => {
  const [t] = useTranslation();
  
  return (
    <Modal>
      <Wrapper>
        <CloseButton onClick={onClose}>
          <CloseSvg />
        </CloseButton>
        <Content>
          <Title>
            {t('restaurant.compModal.order_delete')}
          </Title>
        </Content>
        <Controls>
          <Ok onClick={onOk}>
            {t('restaurant.common.remove')}
          </Ok>
          <Cancel onClick={onCancel}>
            {t('restaurant.common.dont')}
          </Cancel>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
