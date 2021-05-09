import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { useTranslation } from 'react-i18next';
import { InfoCircleSvg } from 'client/assets/images';
import {
  Wrapper,
  Content,
  Description,
  Controls,
  Ok,
} from './styled';

export const OpinionModal = memo(({
  onOk,
}) => {
  const [t] = useTranslation();
  
  return (
    <Modal>
      <Wrapper>
        <Content>
          <InfoCircleSvg />
          <Description>
            {t('restaurant.compModal.opinion_exist')}
          </Description>
        </Content>
        <Controls>
          <Ok onClick={onOk}>
            {t('restaurant.common.ok')}
          </Ok>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
