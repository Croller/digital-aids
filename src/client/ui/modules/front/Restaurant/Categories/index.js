import React, { useState, useEffect } from 'react';
import { useModal } from 'react-modal-hook';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Confirm18Modal } from 'client/ui/components/_block/Modal/Confirm18';
import { OfferRestaurantModal } from 'client/ui/components/_block/Modal/Offer/Restaurant';
import { setOfferViewed } from 'client/utils/restaurant';
import {
  Wrapper,
  Title,
  List,
  ButtonStyled,
} from './styled';

const Categories = () => {
  const history = useHistory();
  const { info, categories, offers } = useSelector(store => store.restaurant);
  const [t] = useTranslation();
  const [offer, setOffer] = useState(null);
  const [confirmAge, hideModal] = useModal(() => (
    <Confirm18Modal
      onCancel={hideModal}
      onOk={() => {
        const category = categories.find(f => f.check_age);
        if (category) {
          history.push(`categories/${category.key}`);
        }
      }}
    />
  ));
  const [showOffer, hideOffer] = useModal(() => (
    <OfferRestaurantModal
      source={offer}
      onClose={hideOffer}
    />
  ), [offer]);

  const handleRoute = (key) => {
    history.push(`categories/${key}`);
  };

  useEffect(() => {
    window.prerenderReady = true;
    
    if (info.offers && info.offers[0]) {
      setOfferViewed(info.offers[0], () => {
        setOffer(offers.find(f => f.id === info.offers[0]));
        showOffer();
      });
    }
  }, []);

  return categories && (
    <>
      <Wrapper>
        <Title>
          {t('restaurant.common.menu')}
        </Title>
        <List>
          {(categories).map(category => (
            <ButtonStyled
              key={category.key}
              onClick={() => (category.check_age ? confirmAge({ test: 'etet' }) : handleRoute(category.key))}
            >
              {category.name}
            </ButtonStyled>
          ))}
        </List>
      </Wrapper>
    </>
  );
};

export default Categories;
