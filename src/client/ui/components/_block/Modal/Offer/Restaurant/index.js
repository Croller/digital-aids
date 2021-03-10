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
  PriceWrapper, Price, Person,
} from './styled';

export const OfferRestaurantModal = memo(({
  source = null,
  onClose,
}) => source && (
  <Modal>
    <Wrapper>
      <CloseButton onClick={onClose}>
        <CloseSvg />
      </CloseButton>
      <Content>
        <Image src={source.link.src || CelebratyTempPng} />
        <Title>
          {source.text.title}
        </Title>
        <Description>
          {source.text.description}
        </Description>
      </Content>
      <PriceWrapper>
        <Price>
          {source.text.price}
        </Price>
        <Person>
          {source.text.person}
        </Person>
      </PriceWrapper>
    </Wrapper>
  </Modal>
));

