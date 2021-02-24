import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import { RateCircle } from 'client/ui/components/_block/RateCircle';
import {
  CloseSvg,
  PhoneCallSvg,
  ClockSvg,
  TagSvg,
  MapMarkerSvg,
  LinkExternalSvg,
  RateImageSvg,
  RateTripadvisorSvg,
  RestourantInfoTempPng,
} from 'client/assets/images';
import { 
  Wrapper,
  CloseButton,
  Slider,
  ImgWrapper, Img,
  Content,
  Restaurant,
  InfoWrapper, LinkButton,
  IconTextWrapper, IconText, Price,
  InfoControls, CallButton, MenuButton,
  AddessWrapper,
  RestaurantName, Hr,
  AddressContainer, AddressTitle, Address, MapStyled,
  RateWrapper,
  RateBlock, Rate, RateCurrent, RateMax,
  RateComment, ReviewsButton,
} from './styled';

const Information = memo(() => {
  const [t] = useTranslation();

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <CloseButton>
        <CloseSvg />
      </CloseButton>
      <Slider
        autoPlay
        showThumbs={false}
      >
        <ImgWrapper>
          <Img src={RestourantInfoTempPng} />
        </ImgWrapper>
        <ImgWrapper>
          <Img src={RestourantInfoTempPng} />
        </ImgWrapper>
        <ImgWrapper>
          <Img src={RestourantInfoTempPng} />
        </ImgWrapper>
      </Slider>
      <Content>
        <Restaurant>
          Las Cuevas
        </Restaurant>
        <InfoWrapper>
          <LinkButton>
            <LinkExternalSvg />
          </LinkButton>
          <IconTextWrapper>
            <ClockSvg />
            <IconText>
              am 10:00 pm 01:00 
            </IconText>
          </IconTextWrapper>
          <IconTextWrapper>
            <ClockSvg />
            <IconText>
              Fusion cuisine 
            </IconText>
          </IconTextWrapper>
          <IconTextWrapper>
            <TagSvg />
            <IconText>
              {t('common.avg_price')} 
              <Price>
                ~25
              </Price>
            </IconText>
          </IconTextWrapper>
          <InfoControls>
            <CallButton>
              <PhoneCallSvg />
              {t('common.call_us')} 
            </CallButton>
            <MenuButton>
              {t('common.menu')} 
            </MenuButton>
          </InfoControls>
        </InfoWrapper>
        <AddessWrapper>
          <RestaurantName>
            Las Cuevas
          </RestaurantName>
          <Hr />
          <AddressContainer>
            <AddressTitle>
              <MapMarkerSvg />
              <Address>
                Barrio Primero de Mayo 13 - San Miguel de Salinas
              </Address>
            </AddressTitle>
            <MapStyled />
          </AddressContainer>
        </AddessWrapper>
        <RateWrapper>
          <RateBlock>
            <Rate>
              <RateImageSvg />
              <RateCurrent>
                9,4
              </RateCurrent>
              <RateMax>
                &nbsp;/&nbsp;10
              </RateMax>
            </Rate>
            <RateComment>
              66 &nbsp;
              {t('common.comments')} 
            </RateComment>
            <ReviewsButton>
              {t('common.reviewies')} 
            </ReviewsButton>
          </RateBlock>
          <RateBlock>
            <Rate>
              <RateTripadvisorSvg />
              <RateCurrent>
                <RateCircle rate={4} />
              </RateCurrent>
            </Rate>
            <RateComment>
              66 &nbsp;
              {t('common.comments')} 
            </RateComment>
            <ReviewsButton>
              {t('common.reviewies')} 
            </ReviewsButton>
          </RateBlock>
        </RateWrapper>
      </Content>
      <ThankYou />
    </Wrapper>
  );
});

export default Information;
