import React, { memo } from 'react';
import { Modal } from 'client/ui/components/_block/Modal';
import { CloseSvg, PlateTempPng } from 'client/assets/images';
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
        <Image src={source.src || PlateTempPng} />
        <Title>
          {source.title}
        </Title>
        <Description>
          {source.description}
        </Description>
      </Content>
      <PriceWrapper>
        <Price>
          {source.price}
        </Price>
        <Person>
          {source.person}
        </Person>
      </PriceWrapper>
    </Wrapper>
  </Modal>
));

