import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { CloseSvg, CelebratyTempPng } from 'client/assets/images';
import {
  Wrapper,
  CloseButton,
  Content,
  Image,
  Title,
  Description,
  PriceWrapper, Price,
  // Person,
} from './styled';

export const OfferRestaurantModal = memo(({
  source = {
    name: null,
    description: null,
    text: null,
    images: null,
  },
  onClose,
}) => source && (
  <Modal>
    <Wrapper>
      <CloseButton onClick={onClose}>
        <CloseSvg />
      </CloseButton>
      <Content>
        <Image src={source.image || CelebratyTempPng} />
        <Title>
          {source.name}
        </Title>
        <Description>
          {source.description}
        </Description>
      </Content>
      <PriceWrapper>
        <Price>
          {source.text}
        </Price>
      </PriceWrapper>
    </Wrapper>
  </Modal>
));

