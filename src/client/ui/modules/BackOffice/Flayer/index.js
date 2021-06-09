import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import {
  getUrl,
  htmlToImage,
  downloadFile,
  imgToPdf,
} from 'client/utils/common';
import {
  FlayerWrapper,
  LoaderStyled,
  NavBarStyled,
  ContentWrapper,
  QRCodeWrapper,
  TitleQR,
  TextCovid,
  LngAvaible,
  LngList,
  LngItem,
  LoadDocWrapper,
  TitleDoc,
  ButtonStyled,
} from './styled';

const Flayer = () => {
  const [t] = useTranslation();
  const [qrCode, setQrCode] = useState(null);
  const [lngValue, setLngValue] = useState(null);
  const { restaurants, loading } = useSelector(state => state.backOffice);
  const params = useParams();
  const { restaurant } = params;

  const handleGetImg = async (key = 'block-1-print') => {
    const img = await htmlToImage(key);
    downloadFile(img, 'restaurant.png');
  };

  const handleGetPdf = async (key = 'block-1-print') => {
    const img = await htmlToImage(key);
    await imgToPdf(img, 'restaurant');
  };

  useEffect(() => {
    if (restaurants) {
      const rest = restaurants.find(f => f.id === restaurant);
      if (rest) {
        const host = getUrl();
        setQrCode(`${host}/restaurant/${rest.key}/information`);
        setLngValue(rest.languages);
      }
    }
  }, [restaurants]);

  return (
    <FlayerWrapper>
      <NavBarStyled
        settings={{
          back: { text: 'back' },
          delete: false,
          title: false,
        }}
      />
      <ContentWrapper>
        {loading && (<LoaderStyled />)}
        {qrCode && lngValue && (
          <QRCodeWrapper id="block-1-print">
            <TitleQR>
              {t('common.words.menu')}
            </TitleQR>
            <TextCovid>
              {t('backOffice.text.protocolCovid')}
            </TextCovid>
            {qrCode && (
              <QRCode size={148} value={qrCode} />
            )}
            <LngAvaible>
              {t('backOffice.text.avaibleLanguage')}
            </LngAvaible>
            {lngValue && (
              <LngList>
                {lngValue.map(lng => (
                  <LngItem key={`_language_${lng}`}>
                    {lng}
                  </LngItem>
                ))}
              </LngList>
            )}
          </QRCodeWrapper>
        )}
        <LoadDocWrapper>
          <TitleDoc>
            {t('backOffice.text.scanQRcode')}
          </TitleDoc>
          <ButtonStyled onClick={() => handleGetPdf('block-1-print')}>
            {`${t('common.words.download')} pdf`}
          </ButtonStyled>
          <ButtonStyled onClick={() => handleGetImg('block-1-print')}>
            {`${t('common.words.download')} png`}
          </ButtonStyled>
        </LoadDocWrapper>
      </ContentWrapper>
      <ContentWrapper>
        {loading && (<LoaderStyled />)}
        {qrCode && lngValue && (
          <QRCodeWrapper id="block-2-print">
            <TitleQR>
              {t('common.words.menu')}
            </TitleQR>
            {qrCode && (
              <QRCode size={220} value={qrCode} />
            )}
            <LngAvaible>
              {t('backOffice.text.avaibleLanguage')}
            </LngAvaible>
            {lngValue && (
              <LngList>
                {lngValue.map(lng => (
                  <LngItem key={`_language_${lng}`}>
                    {lng}
                  </LngItem>
                ))}
              </LngList>
            )}
          </QRCodeWrapper>
        )}
        <LoadDocWrapper>
          <TitleDoc>
            {t('backOffice.text.scanQRcode')}
          </TitleDoc>
          <ButtonStyled onClick={() => handleGetPdf('block-2-print')}>
            {`${t('common.words.download')} pdf`}
          </ButtonStyled>
          <ButtonStyled onClick={() => handleGetImg('block-2-print')}>
            {`${t('common.words.download')} png`}
          </ButtonStyled>
        </LoadDocWrapper>
      </ContentWrapper>
    </FlayerWrapper>
  );
};

export default Flayer;
