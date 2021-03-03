import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { CloseSvg } from 'client/assets/images';
import { useTranslation } from 'react-i18next';
import {
  Wrapper,
  CloseButton,
  Content,
  Title, Hr, Description,
  Controls,
  Ok,
} from './styled';

export const DailyInfoModal = memo(({
  title = null,
  description = null,
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
          {title && (
            <Title>
              {title}
            </Title>
          )}
          <Hr />
          {description && (
            <Description>
              {description}
            </Description>
          )}
        </Content>
        <Controls>
          <Ok onClick={onClose}>
            {t('common.ok')}
          </Ok>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
