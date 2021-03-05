import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { CloseSvg, OfferTempPng } from 'client/assets/images';
import {
  Wrapper,
  CloseButton,
  Content,
  Image,
  Description,
  Controls,
  Ok,
} from './styled';

export const OfferCategoryModal = memo(({
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
          <Image src={source.src || OfferTempPng} />
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
