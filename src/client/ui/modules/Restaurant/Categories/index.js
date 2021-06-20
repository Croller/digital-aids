import React, { useState, useEffect } from 'react';
import { useModal } from 'react-modal-hook';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Confirm18Modal } from 'client/ui/components/_block/Modal/Confirm18';
import { OfferRestaurantModal } from 'client/ui/components/_block/Modal/Offer/Restaurant';
import { setOfferViewed, getLocalUser, setLocalUser } from 'client/utils/localStorage';
import { getUrl } from 'client/utils/common';
import {
  Wrapper,
  Title,
  List,
  ButtonStyled,
} from './styled';

const Categories = () => {
  const history = useHistory();
  const { categories, offers, info } = useSelector(store => store.restaurant);
  const [t] = useTranslation();
  const [offer, setOffer] = useState(null);
  const [confirmAge, hideModal] = useModal(() => (
    <Confirm18Modal
      onCancel={hideModal}
      onOk={() => {
        const category = categories.find(f => f.type === 'alcohol');
        if (category) {
          setLocalUser({ check18: true });
          history.push(`category/${category.key}`);
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

  const handleItemClick = (category) => {
    const { check18 } = getLocalUser();
    if (category.type === 'alcohol' && check18) {
      confirmAge();
      return;
    }
    handleRoute(category.key);
  };

  const handleRoute = (key) => {
    history.push(`category/${key}`);
  };

  useEffect(() => {
    window.prerenderReady = true;
    
    if (offers && offers[0]) {
      setOfferViewed(info.key, offers[0].id, () => {
        const {
          name,
          description,
          options: {
            specialPromotion,
          },
          images,
        } = { ...offers[0] };

        setOffer({
          name,
          description,
          text: specialPromotion,
          image: images && images[0] ? `${getUrl()}/static/restaurants/dishes/${images[0]}.png` : null,
        });
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
              onClick={() => handleItemClick(category)}
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
