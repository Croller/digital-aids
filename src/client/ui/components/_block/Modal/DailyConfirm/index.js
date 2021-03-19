import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { useTranslation } from 'react-i18next';
import { ThumbsUpGreenSvg, CloseSvg } from 'client/assets/images';
import {
  Wrapper,
  Content,
  CloseButton,
  Title,
  Controls,
  Ok,
  Cancel,
} from './styled';

export const DailyConfirmModal = memo(({
  onAccept,
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
          <ThumbsUpGreenSvg />
          <Title>
            {t('restaurant.compModal.confirm_daily')}
          </Title>
        </Content>
        <Controls>
          <Ok onClick={onAccept}>
            {t('restaurant.common.yes')}
          </Ok>
          <Cancel onClick={onCancel}>
            {t('restaurant.common.not')}
          </Cancel>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
