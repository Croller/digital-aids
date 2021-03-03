import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { Allergens } from 'client/ui/components/_block/Allergens';
import { CloseSvg } from 'client/assets/images';
import { useTranslation } from 'react-i18next';
import {
  Wrapper,
  Title,
  CloseButton,
  Content,
} from './styled';

export const AllergensModal = memo(({ source = null, onClose }) => {
  const [t] = useTranslation();
  
  return (
    <Modal>
      <Wrapper>
        <Title>
          {t('common.allergens')}
        </Title>
        <CloseButton onClick={onClose}>
          <CloseSvg />
        </CloseButton>
        <Content>
          <Allergens source={source} />
        </Content>
      </Wrapper>
    </Modal>
  );
});
