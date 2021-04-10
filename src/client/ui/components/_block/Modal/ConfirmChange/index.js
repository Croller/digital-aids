import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { CloseSvg, QuestionCircleSvg } from 'client/assets/images';
import {
  Wrapper,
  CloseButton,
  Content,
  Icon,
  Title,
  Controls,
  Ok,
  Cancel,
} from './styled';

export const ConfirmChange = memo(({
  title = null,
  textOk = null,
  textCancel = null,
  onOk,
  onCancel,
  onClose,
}) => (
  <Modal>
    <Wrapper>
      <CloseButton onClick={onClose}>
        <CloseSvg />
      </CloseButton>
      <Icon>
        <QuestionCircleSvg />
      </Icon>
      {title && (
        <Content>
          <Title>
            {title}
          </Title>
        </Content>
      )}
      <Controls>
        {textOk && (
          <Ok onClick={onOk}>
            {textOk}
          </Ok>
        )}
        {textCancel && (
          <Cancel onClick={onCancel}>
            {textCancel}
          </Cancel>
        )}
      </Controls>
    </Wrapper>
  </Modal>
));
