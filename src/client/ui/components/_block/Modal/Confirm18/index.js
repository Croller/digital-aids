import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Modal } from 'client/ui/components/_block/Modal';
import { useTranslation } from 'react-i18next';
import { RestaurantLogoTempPng } from 'client/assets/images';
import {
  Wrapper,
  Content,
  Logo,
  Title,
  Description,
  Controls,
  Ok,
  Cancel,
} from './styled';

export const Confirm18Modal = memo(({
  onOk,
  onCancel,
}) => {
  const history = useHistory();
  const [t] = useTranslation();
  const { key, logo } = useSelector(store => store.restaurant.info);

  const handleRoute = (path = 'categories') => {
    history.push(`/restaurant/${key}/${path}`);
  };
  
  return (
    <Modal>
      <Wrapper>
        <Content>
          <Logo
            src={logo || RestaurantLogoTempPng}
            onClick={() => handleRoute('information')}
          />
          <Title>
            {t('restaurant.compModal.confirm_age.title')}
          </Title>
          <Description>
            {t('restaurant.compModal.confirm_age.description')}
          </Description>
        </Content>
        <Controls>
          <Ok onClick={onOk}>
            {t('restaurant.common.yes_i')}
          </Ok>
          <Cancel onClick={onCancel}>
            {t('restaurant.common.not_i')}
          </Cancel>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
