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
  FlyerWrapper,
  LoaderStyled,
  NavBarStyled,
  RadioStyled,
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
  TitleTableQR, InputStyled, BlockNumber,
} from './styled';

const Flyer = () => {
  const [t] = useTranslation();
  const [tabValue, setTabValue] = useState('info');
  const [qrCode, setQrCode] = useState(null);
  const [qrCodeTable, setQrCodeTable] = useState(null);
  const [qrCodeWaiter, setQrCodeWaiter] = useState(null);
  const [tableNumber, setTableNumber] = useState(1);
  const [lngValue, setLngValue] = useState(null);
  const { restaurants, loading } = useSelector(state => state.backOffice);
  const params = useParams();
  const { restaurant } = params;

  const TAB_CONFIG = [
    { label: t('common.words.info'), value: 'info' },
    { label: t('common.words.table'), value: 'table' },
    { label: t('common.words.waiter'), value: 'waiter' },
  ];

  const handleGetImg = async (key = 'block-1-print') => {
    const img = await htmlToImage(key);
    downloadFile(img, 'restaurant.png');
  };

  const handleGetPdf = async (key = 'block-1-print') => {
    const img = await htmlToImage(key);
    await imgToPdf(img, 'restaurant');
  };

  const handleChangeTable = (str) => {
    setTableNumber(str);
    const rest = restaurants.find(f => f.id === restaurant);
    setQrCodeTable(`${getUrl()}/restaurant/${rest.key}/information?table_number=${str}`);
  };

  useEffect(() => {
    if (restaurants) {
      const rest = restaurants.find(f => f.id === restaurant);
      if (rest) {
        setQrCode(`${getUrl()}/restaurant/${rest.key}/information`);
        setQrCodeTable(`${getUrl()}/restaurant/${rest.key}/information?table_number=1`);
        setQrCodeWaiter(`${getUrl()}/restaurant/${rest.key}/information?position=waiter`);
        setLngValue(rest.languages);
      }
    }
  }, [restaurants]);

  return (
    <FlyerWrapper>
      <NavBarStyled
        settings={{
          back: { text: 'back' },
          delete: false,
          title: false,
        }}
      />
      <RadioStyled
        options={TAB_CONFIG}
        onChange={(e) => setTabValue(e.target.value)}
        value={tabValue}
        optionType="button"
      />
      {loading && (<LoaderStyled />)}
      {tabValue === 'info' && (
        <ContentWrapper>
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
      )}
      {tabValue === 'table' && (
        <ContentWrapper>
          {qrCodeTable && lngValue && (
            <QRCodeWrapper id="block-2-print">
              <TitleTableQR>
                {t('common.words.menu')}
              </TitleTableQR>
              <BlockNumber>
                {`${t('common.words.table')} #${tableNumber}`}
              </BlockNumber>
              {qrCodeTable && (
                <QRCode
                  size={220}
                  value={qrCodeTable}
                />
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
              {t('backOffice.text.setTable')}
            </TitleDoc>
            <InputStyled type="number" value={tableNumber} onChange={handleChangeTable} />
            <ButtonStyled onClick={() => handleGetPdf('block-2-print')}>
              {`${t('common.words.download')} pdf`}
            </ButtonStyled>
            <ButtonStyled onClick={() => handleGetImg('block-2-print')}>
              {`${t('common.words.download')} png`}
            </ButtonStyled>
          </LoadDocWrapper>
        </ContentWrapper>
      )}
      {tabValue === 'waiter' && (
        <ContentWrapper>
          {qrCodeWaiter && lngValue && (
            <QRCodeWrapper id="block-3-print">
              <TitleQR>
                {t('common.words.waiter')}
              </TitleQR>
              {qrCodeWaiter && (
                <QRCode size={220} value={qrCodeWaiter} />
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
            <ButtonStyled onClick={() => handleGetPdf('block-3-print')}>
              {`${t('common.words.download')} pdf`}
            </ButtonStyled>
            <ButtonStyled onClick={() => handleGetImg('block-3-print')}>
              {`${t('common.words.download')} png`}
            </ButtonStyled>
          </LoadDocWrapper>
        </ContentWrapper>
      )}
    </FlyerWrapper>
  );
};

export default Flyer;
