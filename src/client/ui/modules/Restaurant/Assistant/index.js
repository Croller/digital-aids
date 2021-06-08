import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateRow } from 'client/store/restaurant';
import { useModal } from 'react-modal-hook';
import { ReserveSend } from 'client/ui/components/_block/Modal/ReserveSend';
import {
  Wrapper,
  List,
  ButtonStyled,
} from './styled';

const Assistant = () => {
  const rootDispatch = useDispatch();
  const history = useHistory();
  const [t] = useTranslation();
  const { user, restaurant } = useSelector(s => s);
  const [showConfirm] = useModal(() => (
    <ReserveSend
      title={t('restaurant.compModal.assistant_send')}
      textOk={t('common.words.ok')}
      onClose={() => history.goBack()}
      onOk={() => history.goBack()}
    />
  ));

  const menu = [
    'waiter',
    'receipt',
    'napkin',
    'appliances',
    'manager',
  ];

  const handleEmit = (key) => {
    showConfirm();
    rootDispatch(updateRow({
      name: 'data_notify',
      data: {
        restaurant: restaurant.info.id,
        options: menu.reduce((obj, k) => ({ ...obj, [k]: k === key }), {}),
        table_number: restaurant.table_number,
        create_user: user.info.id,
      },
    }));
  };

  useEffect(() => {
    window.prerenderReady = true;
  }, []);

  return (
    <Wrapper>
      <List>
        {(menu).map(key => (
          <ButtonStyled
            key={key}
            onClick={() => handleEmit(key)}
          >
            {t(`common.words.${key}`)}
          </ButtonStyled>
        ))}
      </List>
    </Wrapper>
  );
};

export default Assistant;
