import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DishBlock } from 'client/ui/components/_block/DishBlock';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import { InfoCircleSvg, ClockSvg } from 'client/assets/images';
import { updateOrder } from 'client/store/restaurant';
import { useModal } from 'react-modal-hook';
import { AllergensModal } from 'client/ui/components/_block/Modal/Allergens';
import { DailyInfoModal } from 'client/ui/components/_block/Modal/DailyInfo';
import { DailyConfirmModal } from 'client/ui/components/_block/Modal/DailyConfirm';
import { OfferCategoryModal } from 'client/ui/components/_block/Modal/Offer/Category';
import { setOfferViewed } from 'client/utils/restaurant';
import {
  Wrapper,
  TitleWrapper,
  Title,
  InfoDailyButton,
  WorkDailyButton,
  DishList,
  DailyWrapper,
  TitleGroup,
  DailyOrderWrapper,
  PriceWrapper,
  PriceText,
  PriceDaily,
  Include,
  DailyOrderButton,
} from './styled';

const Category = () => {
  const {
    info: { currency },
    categories,
    offers,
    dishes,
    order,
  } = useSelector(store => store.restaurant);
  const { category } = useParams();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const [t] = useTranslation();
  const [orderId, setOrderId] = useState(1);
  const [categoryOrder, setCategoryOrder] = useState([]);
  const [categoryItem, setCategoryItem] = useState(null);
  const [allergens, setAllergens] = useState(null);
  const [offer, setOffer] = useState(null);

  const [showAllergens, hideAllergens] = useModal(() => (
    <AllergensModal
      source={allergens}
      onClose={() => {
        setAllergens(null);
        hideAllergens();
      }}
    />
  ), [allergens]);

  const [showDailyInfo, hideDailyInfo] = useModal(() => (
    <DailyInfoModal
      source={offer}
      onClose={hideDailyInfo}
    />
  ), [offer]);

  const [showOffer, hideOffer] = useModal(() => (
    <OfferCategoryModal
      source={offer}
      onClose={hideOffer}
    />
  ), [offer]);

  const [showDailyConfirm, hideDailyConfirm] = useModal(() => (
    <DailyConfirmModal
      onAccept={hideDailyConfirm}
      onClose={hideDailyConfirm}
      onCancel={() => {
        history.goBack();
        hideDailyConfirm();
      }}
    />
  ), [offer]);

  const handleSetOrder = (obj) => {
    let data = [];
    if (categoryItem.dailymenu) {
      const bool = categoryOrder.some(s => s.id === obj.dish.id);
      data = [...categoryOrder.filter(f => f.id !== obj.id)];
      !bool && data.push(obj);
    } else {
      data = [
        ...categoryOrder.filter(f => f.id !== obj.id),
        obj,
      ];
    }

    if (!categoryItem.dailymenu) {
      rootDispatch(updateOrder({
        ...categoryItem,
        order_id: orderId,
        order: data,
      }));
    }
    setCategoryOrder(data);
  };

  const handleSetDailyOrder = () => {
    showDailyConfirm();
    rootDispatch(updateOrder({
      ...categoryItem,
      order_id: orderId,
      order: categoryOrder,
    }));
    setCategoryOrder([]);
    setOrderId(order ? order.length + 1 : orderId + 1);
  };

  const handleToggleModalAllergens = (arr) => {
    setAllergens(allergens ? null : arr);
    showAllergens();
  };

  const handleShowDaily = () => {
    setOffer(offers.find(f => f.id === categoryItem.offers[0]));
    showDailyInfo();
  };

  const getDishes = (arr) => dishes.reduce((items, dish) => {
    if (arr.some(s => s === dish.id)) {
      return [...items, dish];
    }
    return items;
  }, []);

  useEffect(() => {
    const categItem = categories.find(f => f.key === category) || null;
    setCategoryItem(categItem || null);

    if (categItem) {
      if (categItem.offers && categItem.offers[0]) {
        setOfferViewed(categItem.offers[0], () => {
          setOffer(offers.find(f => f.id === categItem.offers[0]));
          if (categItem.dailymenu) {
            showDailyInfo();
          } else {
            showOffer();
          }
        });
      }
    }
    if (order) {
      const catOrder = order.find(f => f.key === category);
      setCategoryOrder(catOrder ? catOrder.order : []);
    }
    if (categItem && categItem.dailymenu) {
      setCategoryOrder([]);
    }
    setOrderId(order ? order.length + 1 : orderId);
  }, []);

  return categoryItem && (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>
            {categoryItem.name}
          </Title>
          {categoryItem.dailymenu && (
            <InfoDailyButton onClick={handleShowDaily}>
              <InfoCircleSvg />
            </InfoDailyButton>
          )}
        </TitleWrapper>
        {categoryItem.dailymenu && (
          <WorkDailyButton>
            <ClockSvg />
            TODO calc work time
          </WorkDailyButton>
        )}
        <DishList>
          {categoryItem.groups && categoryItem.groups.map(group => (
            <DailyWrapper key={group.key}>
              <TitleGroup>
                {group.name}
              </TitleGroup>
              {getDishes(group.dishes).map(dish => DishBlock({
                dish,
                group,
                order: categoryOrder,
                dailymenu: categoryItem.dailymenu,
                currency: t(`restaurant.common.currency.${currency[0]}`),
              }, handleToggleModalAllergens, handleSetOrder))}
            </DailyWrapper>
          ))}
          {!categoryItem.dailymenu && !categoryItem.groups && getDishes(categoryItem.dishes).map(dish => DishBlock({
            dish,
            order: categoryOrder,
            currency: t(`restaurant.common.currency.${currency[0]}`),
          }, handleToggleModalAllergens, handleSetOrder))} 
        </DishList>
        {categoryItem.dailymenu && (
          <DailyOrderWrapper>
            <PriceWrapper>
              <PriceText>
                {t('restaurant.common.price')}
              </PriceText>
              <PriceDaily>
                {`${categoryItem.options.price.toFixed(2)} ${t(`restaurant.common.currency.${currency[0]}`)}`}
              </PriceDaily>
            </PriceWrapper>
            <Include>
              {`${t('restaurant.common.include')}: ${categoryItem.options.include}`}
            </Include>
            <DailyOrderButton onClick={handleSetDailyOrder}>
              {t('restaurant.common.add_to_order')}
            </DailyOrderButton>
          </DailyOrderWrapper>
        )}
      </Wrapper>
      <ThankYou />
    </>
  );
};

export default Category;
