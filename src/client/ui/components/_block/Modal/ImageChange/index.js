import React from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { CloseSvg } from 'client/assets/images';
import {
  Wrapper,
  CloseButton,
  Content,
  Title,
  Controls,
  Ok,
  Cancel,
} from './styled';

export const ImageChange = ({
  title = null,
  textOk = null,
  textCancel = null,
  onOk,
  onCancel,
  onClose,
  children,
}) => (
  <Modal>
    <Wrapper>
      <CloseButton onClick={onClose}>
        <CloseSvg />
      </CloseButton>
      {title && (
        <Content>
          <Title>
            {title}
          </Title>
        </Content>
      )}
      <Content>
        {children}
      </Content>
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
);
