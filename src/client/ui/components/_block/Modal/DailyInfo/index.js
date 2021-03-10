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
  source = null,
  onClose,
}) => {
  const [t] = useTranslation();
  
  return source && (
    <Modal>
      <Wrapper>
        <CloseButton onClick={onClose}>
          <CloseSvg />
        </CloseButton>
        <Content>
          <Title>
            {source.text.title}
          </Title>
          <Hr />
          <Description>
            {source.text.description}
          </Description>
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
