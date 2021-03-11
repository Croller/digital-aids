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
  Description,
  Controls,
  Ok,
} from './styled';

export const OpinionModal = memo(({
  onOk,
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
          <Description>
            {t('restaurant.compModal.opinion_exist')}
          </Description>
        </Content>
        <Controls>
          <Ok onClick={onOk}>
            {t('restaurant.common.ok')}
          </Ok>
        </Controls>
      </Wrapper>
    </Modal>
  );
});
