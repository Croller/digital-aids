import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import { RateCircle } from 'client/ui/components/_block/RateCircle';
import { Marker } from 'google-maps-react';
import {
  CloseSvg,
  PhoneCallSvg,
  ClockSvg,
  ChefHeadSvg,
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
  ReservButton,
  AddessWrapper,
  RestaurantName, Hr,
  AddressContainer, AddressTitle, Address, MapStyled,
  RateWrapper,
  RateBlock, Rate, RateCurrent, RateMax,
  RateComment, ReviewsButton,
} from './styled';

const Information = memo(() => {
  const {
    name,
    address,
    // geo,
    phone,
    avg_price,
    cuisine,
    images,
    // work_time,
    raiting,
    currency,
  } = useSelector(store => store.restaurant.info);
  const history = useHistory();
  const [t] = useTranslation();

  const handleRoute = (path = 'categories', external = false) => {
    if (external) {
      if (path.indexOf('tel') > -1) {
        document.location.href = path;
        return null;
      }
      window.open(path, '_blank').focus();
    }
    if (history.action !== 'POP' && path === 'back') {
      history.goBack();
      return null;
    }
    history.push(path === 'back' ? 'categories' : path);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Digital Carte',
        url: 'https://digital-carte.com/',
      })
        .then(() => console.log('Successful share! 🎉'))
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <CloseButton onClick={() => handleRoute('back')}>
        <CloseSvg />
      </CloseButton>
      <Slider
        autoPlay
        showThumbs={false}
      >
        {images ? images.map((src, s) => (
          <ImgWrapper key={`_image_${s + 1}`}>
            <Img src={src} />
          </ImgWrapper>
        )) : [...(new Array(5))].map((src, s) => (
          <ImgWrapper key={`_image_${s + 1}`}>
            <Img src={RestourantInfoTempPng} />
          </ImgWrapper>
        ))}
      </Slider>
      <Content>
        <Restaurant>
          {name}
        </Restaurant>
        <InfoWrapper>
          <LinkButton onClick={handleShare}>
            <LinkExternalSvg />
          </LinkButton>
          <IconTextWrapper>
            <ClockSvg />
            <IconText>
              am 10:00 pm 01:00 
            </IconText>
          </IconTextWrapper>
          <IconTextWrapper>
            <ChefHeadSvg />
            <IconText>
              {t(`restaurant.common.cuisine_type.${cuisine[0]}`)}
              &nbsp;
              {t('restaurant.common.cuisine')}
            </IconText>
          </IconTextWrapper>
          <IconTextWrapper>
            <TagSvg />
            <IconText>
              {t('restaurant.common.avg_price')} 
              <Price>
                ~
                {avg_price.toFixed(2)}
                {t(`restaurant.common.currency.${currency[0]}`)}
              </Price>
            </IconText>
          </IconTextWrapper>
          <InfoControls>
            <CallButton onClick={() => phone && handleRoute(`tel:${phone[0]}`, true)}>
              <PhoneCallSvg />
              {t('restaurant.common.call_us')} 
            </CallButton>
            <MenuButton onClick={() => handleRoute('categories')}>
              {t('restaurant.common.menu')} 
            </MenuButton>
          </InfoControls>
        </InfoWrapper>
        <ReservButton>
          {`${t('restaurant.common.reservation')} ${t('restaurant.common.online')}`} 
        </ReservButton>
        <AddessWrapper>
          <RestaurantName>
            {name}
          </RestaurantName>
          <Hr />
          <AddressContainer>
            <AddressTitle>
              <MapMarkerSvg />
              <Address>
                {address}
              </Address>
            </AddressTitle>
            <MapStyled
              initialCenter={{ lat: 37.778519, lng: -122.405640 }}
              zoom={15}
            >
              <Marker position={{ lat: 37.778519, lng: -122.405640 }} />
            </MapStyled>
          </AddressContainer>
        </AddessWrapper>
        <RateWrapper>
          <RateBlock>
            <Rate>
              <RateImageSvg />
              <RateCurrent>
                {raiting.common.rate.toFixed(1)}
              </RateCurrent>
              <RateMax>
                &nbsp;/&nbsp;10
              </RateMax>
            </Rate>
            <RateComment>
              {raiting.common.comments.length}
              &nbsp;
              {t('restaurant.common.comments')} 
            </RateComment>
            <ReviewsButton onClick={() => handleRoute('categories', true)}>
              {t('restaurant.common.reviewies')} 
            </ReviewsButton>
          </RateBlock>
          <RateBlock>
            <Rate>
              <RateTripadvisorSvg />
              <RateCurrent>
                <RateCircle rate={raiting.tripadvisor.rate} />
              </RateCurrent>
            </Rate>
            <RateComment>
              {raiting.tripadvisor.comments.length}
              &nbsp;
              {t('restaurant.common.comments')} 
            </RateComment>
            <ReviewsButton onClick={() => handleRoute('categories', true)}>
              {t('restaurant.common.reviewies')} 
            </ReviewsButton>
          </RateBlock>
        </RateWrapper>
      </Content>
      <ThankYou />
    </Wrapper>
  );
});

export default Information;
