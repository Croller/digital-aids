import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { CloseSvg, PlateTempPng } from 'client/assets/images';
import {
  Wrapper,
  CloseButton,
  Content,
  Logo,
  Description,
  Controls,
  Ok,
} from './styled';

export const OfferModal = memo(({
  source = null,
  onClose,
}) => {
  const handleRoute = () => {
    window.open(source.url, '_blank').focus();
    onClose();
  };

  return source && (
    <Modal>
      <Wrapper>
        <CloseButton onClick={onClose}>
          <CloseSvg />
        </CloseButton>
        <Content>
          <Logo src={source.src || PlateTempPng} />
          <Description>
            {source.description}
          </Description>
        </Content>
        <Controls>
          <Ok onClick={handleRoute}>
            {source.button}
          </Ok>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
