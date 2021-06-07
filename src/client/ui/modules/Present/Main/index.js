import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useModal } from 'react-modal-hook';
import { CookiesModal } from 'client/ui/components/_block/Modal/Cookies';
import { setUser, getLocal } from 'client/utils/localStorageEdit';
import { useTranslation } from 'react-i18next';
import { BREAKPOINTS } from 'client/style/constants';
import { Helmet } from 'react-helmet';
import {
  PhoneBlock1Png,
  SupportSvg,
  SocialCareSvg,
  Conversation1Svg,
  Conversation2Svg,
  WebSettingsSvg,
  Client1Png,
  Client2Png,
  Client3Png,
  Client4Png,
  DoubleQuotesSvg,
  ChevronSvg,
} from 'client/assets/images';
import QRCode from 'qrcode.react';
// import translate from 'client/i18n';
import { 
  Container,
  Content,
  PresentBlock,
  ImageWrapper,
  PhoneImage,
  PresentWrapper,
  PresentTitle,
  PresentQuestion,
  PresentDescription,
  PresentTime,
  PresentButton,
  RestButton,
  QRCodeWrapper,
  QRCodeTitle,
  QRCodeLanguage,
  QRCodeLanguageList,
  QRCodeLanguageItem,
  OfertaWrapper,
  OfertaContent,
  OfertaTitle,
  OfertaDescription,
  RedLine1SvgStyled,
  RedLine2SvgStyled,
  DigitalBlock,
  DigitalWithImage,
  DigitalTitle,
  DigitalDescription,
  DigitalImage,
  SpanGreen,
  SpanBlack,
  DigitalOptions,
  DigitalOption,
  DigitalOptionTitle,
  DigitalOptionDescription,
  QuestionsBlock,
  QuestionsBlockTitle,
  QuestionsBlockWrapper,
  QuestionsBlockCol,
  CollapseStyled,
  QuestionCollTitle,
  IconBlock,
  QuectionHtml,
  ClientBlock,
  ClientBlockTitle,
  ClientCarouselControl,
  CarouselStyled,
  BlockClient,
  Client,
  ClientHeader,
  ClientImg,
  ClientName,
  ClientWho,
  ClientPosition,
  ClientContent,
  ClientContentTitle,
  ClientContentDescription,
  FormBlock,
  RequestStyled,
} from './styled';

const OPTIONS_ICONS = [
  <SupportSvg />,
  <SocialCareSvg />,
  <Conversation2Svg />,
  <WebSettingsSvg />,
];

const CLIENT_ICONS = {
  client1: Client1Png,
  client2: Client2Png,
  client3: Client3Png,
  client4: Client4Png,
};

const Main = () => {
  const refCarousel = useRef();
  const history = useHistory();
  const [t] = useTranslation();
  const [carausel, setCarousel] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  const [showCookies, hideCookies] = useModal(() => (
    <CookiesModal
      onAccept={() => {
        hideCookies();
        handleSetCookies();
      }}
      onClose={hideCookies}
    />
  ));

  const handleSetCookies = () => {
    setUser({ cookies: true });
  };

  // const handleChnageLng = (lng) => {
  //   translate.changeLanguage(lng);
  // };

  const hangleChangSlide = (direction) => {
    if (direction === 'next') {
      refCarousel.current.slickNext();
    }

    if (direction === 'prev') {
      refCarousel.current.slickPrev();
    }
  };

  const handleRoute = (path = '/') => {
    history.push(path);
  };

  useEffect(() => {
    const local = getLocal();
    if (!local.user.cookies) {
      showCookies();
    }
    
    const settings = { ...carausel };
    const showSlide = window.innerWidth <= Number(BREAKPOINTS.small.replace('px', '')) ? 1 : 2;
    settings.slidesToShow = showSlide;
    settings.slidesToScroll = showSlide;
    setCarousel(settings);

    window.prerenderReady = true;
  }, []);

  const ClinetBlock = (s, c = 0) => (
    <Client key={`_client_${s + 1}`}>
      <ClientHeader>
        <ClientImg src={CLIENT_ICONS[`client${s + 1 + (c === 0 ? 0 : 2)}`]} />
        <ClientName>
          <ClientWho>
            {t(`present.main.fourth.client${s + 1 + (c === 0 ? 0 : 2)}.name`)}
          </ClientWho>
          <ClientPosition>
            {t(`present.main.fourth.client${s + 1 + (c === 0 ? 0 : 2)}.position`)}
          </ClientPosition>
        </ClientName>
      </ClientHeader>
      <ClientContent>
        <DoubleQuotesSvg />
        <ClientContentTitle>
          {t(`present.main.fourth.client${s + 1 + (c === 0 ? 0 : 2)}.title`)}
        </ClientContentTitle>
        <ClientContentDescription>
          {t(`present.main.fourth.client${s + 1 + (c === 0 ? 0 : 2)}.description`)}
        </ClientContentDescription>
        <DoubleQuotesSvg />
      </ClientContent>
    </Client>
  );

  return (
    <Container>
      <Helmet>
        <meta content="Digital Carte" />
        <title>
          Digital Carte
        </title>
      </Helmet>
      <Content>
        <PresentBlock>
          <ImageWrapper>
            <PhoneImage src={PhoneBlock1Png} />
            <OfertaWrapper>
              <OfertaContent>
                <OfertaTitle>
                  {t('present.main.first.oferta.title')}  
                </OfertaTitle>
                <OfertaDescription>
                  {t('present.main.first.oferta.description')} 
                </OfertaDescription>
              </OfertaContent>
              <RedLine1SvgStyled />
              <RedLine2SvgStyled />
            </OfertaWrapper>
          </ImageWrapper>
          <PresentWrapper>
            <PresentTitle>
              {t('present.main.first.col2.title')}  
            </PresentTitle>
            <PresentQuestion>
              {t('present.main.first.col2.question')}  
            </PresentQuestion>
            <PresentDescription>
              {t('present.main.first.col2.description')}  
            </PresentDescription>
            <PresentTime>
              {t('present.main.first.col2.time')}  
            </PresentTime>
            <PresentButton onClick={() => handleRoute('/tutorial')}>
              {t('present.main.first.col2.button')}  
            </PresentButton>
            <RestButton onClick={() => handleRoute('/restaurants')}>
              {t('present.main.first.col2.restaurants')}  
            </RestButton>
          </PresentWrapper>
          <QRCodeWrapper>
            <QRCodeTitle>
              {t('present.main.first.col3.title')}  
            </QRCodeTitle>
            <QRCode size={178} value={`${process.env.HOST}/restaurant/las-ceuvas/information`} />
            <QRCodeLanguage>
              {t('present.main.first.col3.language')}  
            </QRCodeLanguage>
            <QRCodeLanguageList>
              {['en', 'ru', 'es', 'de', 'no'].map(lng => (
                <QRCodeLanguageItem
                  key={`_language_${lng}`}
                  // onClick={() => handleChnageLng(lng)}
                >
                  {lng}
                </QRCodeLanguageItem>
              ))}
            </QRCodeLanguageList>
          </QRCodeWrapper>
        </PresentBlock>
        {/* <OfertaWrapper>
          <OfertaContent>
            <OfertaTitle>
              {t('present.main.first.oferta.title')}  
            </OfertaTitle>
            <OfertaDescription>
              {t('present.main.first.oferta.description')} 
            </OfertaDescription>
          </OfertaContent>
          <RedLine1SvgStyled />
          <RedLine2SvgStyled />
        </OfertaWrapper> */}
        <DigitalBlock>
          <DigitalWithImage>
            <DigitalTitle>
              {t('present.main.second.col1.title1')}
              &nbsp;
              <SpanGreen>
                {t('present.main.second.col1.title2')}
              </SpanGreen>
            </DigitalTitle>
            <DigitalDescription>
              {t('present.main.second.col1.description1')}
              &nbsp;
              <SpanBlack>
                {t('present.main.second.col1.description2')}
              </SpanBlack>
            </DigitalDescription>
            <DigitalImage />
          </DigitalWithImage>
          <DigitalOptions>
            {OPTIONS_ICONS.map((icon, i) => (
              <DigitalOption key={`_option_${i + 1}`}>
                {icon}
                <DigitalOptionTitle>
                  {t(`present.main.second.col2.option${i + 1}.title`)}
                </DigitalOptionTitle>
                <DigitalOptionDescription>
                  {t(`present.main.second.col2.option${i + 1}.description`)}
                </DigitalOptionDescription>
              </DigitalOption>
            ))}
          </DigitalOptions>
        </DigitalBlock>
        <QuestionsBlock>
          <QuestionsBlockTitle>
            {t('present.main.third.title')}
          </QuestionsBlockTitle>
          <QuestionsBlockWrapper>
            {[[...new Array(3)], [...new Array(3)]].map((items, c) => (
              <QuestionsBlockCol key={`_col_${c + 1}`}>
                {items.map((item, q) => (
                  <CollapseStyled
                    key={`_question_${q + 1}`}
                    title={(
                      <QuestionCollTitle>
                        <IconBlock>
                          <Conversation1Svg />
                        </IconBlock>
                        {t(`present.main.third.question${q + 1 + (c === 0 ? 0 : 3)}.question`)}
                      </QuestionCollTitle>
                    )}
                  >
                    <QuectionHtml
                      dangerouslySetInnerHTML={{
                        __html: t(`present.main.third.question${q + 1 + (c === 0 ? 0 : 3)}.description`),
                      }}
                    />
                  </CollapseStyled>
                ))}
              </QuestionsBlockCol>
            ))}
          </QuestionsBlockWrapper>
        </QuestionsBlock>
        <ClientBlock>
          <ClientBlockTitle>
            {t('present.main.fourth.title')}
            <ClientCarouselControl>
              {['prev', 'next'].map((direction, c) => (
                <ChevronSvg
                  key={`_slider_control_${c + 1}`}
                  onClick={() => hangleChangSlide(direction)}
                />
              ))}
            </ClientCarouselControl>
          </ClientBlockTitle>
          <CarouselStyled ref={refCarousel} {...carausel}>
            {
              [...new Array(4)].map((clients, c) => (
                <BlockClient key={`_slide_${c + 1}`}>
                  {ClinetBlock(c)}
                </BlockClient>
              ))
            }
          </CarouselStyled>
        </ClientBlock>
        <FormBlock>
          <RequestStyled />
        </FormBlock>
      </Content>
    </Container>
  );
};

export default Main;
