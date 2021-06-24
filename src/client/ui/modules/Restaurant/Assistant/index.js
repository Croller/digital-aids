import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { update } from 'client/store/user';
import { updateRow } from 'client/store/restaurant';
import { useModal } from 'react-modal-hook';
import { ReserveSend } from 'client/ui/components/_block/Modal/ReserveSend';
import { QRCodeSvg } from 'client/assets/images';
import QrReader from 'react-qr-reader';
import { setLocalUser } from 'client/utils/localStorage';
import {
  Wrapper,
  List,
  ButtonStyled,
  ScanWrapper,
  Title,
  Description,
  ScanButton,
} from './styled';

const Assistant = () => {
  const rootDispatch = useDispatch();
  const history = useHistory();
  const [t] = useTranslation();
  const [showScan, setShowScan] = useState(false);
  const { user, restaurant } = useSelector(s => s);
  const [showConfirm, hideConfirm] = useModal(() => (
    <ReserveSend
      title={t('restaurant.compModal.assistant_send')}
      textOk={t('common.words.ok')}
      onClose={hideConfirm}
      onOk={hideConfirm}
    />
  ));

  const menu = [
    'guest',
    'manager',
    'napkin',
    'appliances',
    'receipt',
    'waiter',
  ];

  const handleEmit = (key) => {
    if (user.position === 'waiter' && key === 'guest') {
      setLocalUser({ position: 'guest' });
      rootDispatch(update({ position: 'guest' }));
    } else {
      rootDispatch(updateRow({
        name: 'data_notify',
        data: {
          restaurant: restaurant.info.id,
          options: menu.reduce((obj, k) => ({ ...obj, [k]: k === key }), {}),
          table_number: restaurant.table_number,
          create_user: user.info.id,
        },
      }));
      showConfirm();
    }
  };

  const handleErrorReader = (err) => {
    console.error('qrcode reader', err);
  };

  const handleScanReader = (data = null) => {
    if (data) {
      window.location.href = data;
    }
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      {restaurant.table_number ? (
        <List>
          {menu.filter(f => f !== user.position).map(key => (
            <ButtonStyled
              key={key}
              onClick={() => handleEmit(key)}
            >
              {t(`restaurant.pageAssistent.${key}`)}
            </ButtonStyled>
          ))}
        </List>
      ) : (
        <ScanWrapper>
          <Title>
            {!showScan ? t('restaurant.pageAssistent.tableNumber.title') : t('restaurant.pageAssistent.tableNumber.scaning')}
          </Title>
          {!showScan ? (
            <>
              <Description>
                {t('restaurant.pageAssistent.tableNumber.desc')}
              </Description>
              <ScanButton onClick={() => setShowScan(true)}>
                <QRCodeSvg />
                {t('restaurant.pageAssistent.tableNumber.scan')}
              </ScanButton>
            </>
          ) : (
            <QrReader
              delay={300}
              onError={handleErrorReader}
              onScan={handleScanReader}
            />
          )}
        </ScanWrapper>
      )}
      
    </Wrapper>
  );
};

export default Assistant;
