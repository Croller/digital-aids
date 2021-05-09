import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { CloseSvg, OfferTempPng } from 'client/assets/images';
import { getUrl } from 'client/utils/common';
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
    window.open(source.link.url, '_blank').focus();
    onClose();
  };
  console.log(source);
  return source && (
    <Modal>
      <Wrapper>
        <CloseButton onClick={onClose}>
          <CloseSvg />
        </CloseButton>
        <Content>
          <Image src={source.images ? `${getUrl()}/static/restaurants/logo/${source.images[0]}.png` : OfferTempPng} />
          <Description>
            {source.description}
          </Description>
        </Content>
        <Controls>
          <Ok onClick={handleRoute}>
            test
            {/* {source.text.button} */}
          </Ok>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
