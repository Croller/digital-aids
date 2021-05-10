import React, { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import { RateCircle } from 'client/ui/components/_block/RateCircle';
import { Marker } from 'google-maps-react';
import {
  CloseSvg,
  ChevronSvg,
  PhoneCallSvg,
  ClockSvg,
  ChefHeadSvg,
  TagSvg,
  MapMarkerSvg,
  LinkExternalSvg,
  RateImageSvg,
  RateTripadvisorSvg,
} from 'client/assets/images';
import { getUrl, getDictionaryItem } from 'client/utils/common';
import { 
  Wrapper,
  ImageWrapper,
  CloseButton,
  CarouselControls, Control,
  Carousel,
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
    info: {
      name,
      key,
      address,
      // geo,
      phone,
      avg_price,
      cuisine,
      images,
      at_work,
      socials,
      currency,
    },
    dictionary,
  } = useSelector(store => store.restaurant);
  const refCarousel = useRef();
  const history = useHistory();
  const [t] = useTranslation();
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const getPathImage = (uuid) => `${getUrl()}/static/restaurants/photos/${uuid}.png`;

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
        url: `${getUrl()}/${key}/information`,
      })
        .then(() => console.log('Successful share! 🎉'))
        .catch(err => console.error(err));
    }
  };

  const hangleChangSlide = (direction) => {
    if (direction === 'next') {
      refCarousel.current.slickNext();
    }

    if (direction === 'prev') {
      refCarousel.current.slickPrev();
    }
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <ImageWrapper>
        {images && images.length > 0 && (
          <>
            <CloseButton onClick={() => handleRoute('back')}>
              <CloseSvg />
            </CloseButton>
            <CarouselControls>
              {['prev', 'next'].map((direction, c) => (
                <Control
                  key={`_slider_control_${c + 1}`}
                  onClick={() => hangleChangSlide(direction)}
                >
                  <ChevronSvg />
                </Control>
              ))}
            </CarouselControls>
            <Carousel ref={refCarousel} {...settings}>
              {images && images.slice(1).map((uuid, s) => (
                <ImgWrapper key={`_image_${s + 1}`}>
                  <Img src={getPathImage(uuid)} />
                </ImgWrapper>
              ))}
            </Carousel>
          </>
        )} 
      </ImageWrapper>
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
              {at_work && at_work.description ? at_work.description : ''}
            </IconText>
          </IconTextWrapper>
          <IconTextWrapper>
            <ChefHeadSvg />
            <IconText>
              {cuisine ? cuisine.join(', ') : ''}
              {/* {t(`restaurant.common.cuisine_type.${cuisine[0]}`)} */}
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
                {getDictionaryItem(currency[0], 'id', dictionary.currency, 'symbol')}
              </Price>
            </IconText>
          </IconTextWrapper>
          <InfoControls>
            <CallButton onClick={() => handleRoute(`tel:${phone ? phone[0] : ''}`, true)}>
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
            {name || ''}
          </RestaurantName>
          <Hr />
          <AddressContainer>
            <AddressTitle>
              <MapMarkerSvg />
              <Address>
                {address || ''}
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
        {socials && (
          <RateWrapper>
            <RateBlock>
              <Rate>
                <RateImageSvg />
                <RateCurrent>
                  {socials.thefork.rate || 0}
                </RateCurrent>
                <RateMax>
                  &nbsp;/&nbsp;10
                </RateMax>
              </Rate>
              <RateComment>
                {socials.thefork.comments}
                &nbsp;
                {t('restaurant.common.comments')} 
              </RateComment>
              {socials.thefork.url && (
                <ReviewsButton onClick={() => handleRoute(socials.thefork.url, true)}>
                  {t('restaurant.common.reviewies')} 
                </ReviewsButton>
              )}
            </RateBlock>
            <RateBlock>
              <Rate>
                <RateTripadvisorSvg />
                <RateCurrent>
                  <RateCircle rate={socials.tripadvisor.rate} />
                </RateCurrent>
              </Rate>
              <RateComment>
                {socials.tripadvisor.comments}
                &nbsp;
                {t('restaurant.common.comments')} 
              </RateComment>
              {socials.tripadvisor.url && (
                <ReviewsButton onClick={() => handleRoute(socials.tripadvisor.url, true)}>
                  {t('restaurant.common.reviewies')} 
                </ReviewsButton>
              )}
            </RateBlock>
          </RateWrapper>
        )}
      </Content>
      <ThankYou />
    </Wrapper>
  );
});

export default Information;
