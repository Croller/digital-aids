import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { useTranslation } from 'react-i18next';
import { InfoCircleSvg } from 'client/assets/images';
import {
  Wrapper,
  Content,
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
  return (
    <Modal>
      <Wrapper>
        <Content>
          <InfoCircleSvg />
          <Title>
            {t('restaurant.compModal.confirm_age.title')}
          </Title>
          <Description>
            {t('restaurant.compModal.confirm_age.description')}
          </Description>
        </Content>
        <Controls>
          <Ok onClick={onOk}>
            {t('restaurant.common.yes_i')}
          </Ok>
          <Cancel onClick={onCancel}>
            {t('restaurant.common.not_i')}
          </Cancel>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
