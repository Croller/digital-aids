import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DishBlock } from 'client/ui/components/_block/DishBlock';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import { InfoCircleSvg, ClockSvg } from 'client/assets/images';
import { updateOrder } from 'client/store/restaurant';
import { useModal } from 'react-modal-hook';
import { AllergensModal } from 'client/ui/components/_block/Modal/Allergens';
import { DailyInfoModal } from 'client/ui/components/_block/Modal/DailyInfo';
import { OfferCategoryModal } from 'client/ui/components/_block/Modal/Offer/Category';
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
    currency,
    categories,
    dishes,
    order,
  } = useSelector(store => store.restaurant);
  const { category } = useParams();
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
      source={categoryItem && categoryItem.options.info}
      onClose={hideDailyInfo}
    />
  ), [categoryItem]);

  const [showOffer, hideOffer] = useModal(() => (
    <OfferCategoryModal
      source={offer}
      onClose={hideOffer}
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
    // to store
    const newOrder = {
      ...categoryItem,
      order_id: orderId,
      order: data,
    };
    console.log(newOrder);
    setCategoryOrder(data);
    rootDispatch(updateOrder(newOrder));
  };

  const getDishes = (arr) => dishes.reduce((items, dish) => {
    if (arr.some(s => s === dish.id)) {
      return [...items, dish];
    }
    return items;
  }, []);

  const handleClearOrder = () => {
    setCategoryOrder([]);
    setOrderId(orderId + 1);
  };

  const handleToggleModalAllergens = (arr) => {
    setAllergens(allergens ? null : arr);
    showAllergens();
  };

  useEffect(() => {
    const categItem = categories.find(f => f.key === category) || null;
    setCategoryItem(categItem || null);

    if (categItem) {
      if (categItem.dailymenu) {
        showDailyInfo();
      }
      if (categItem.offers && !categItem.dailymenu) {
        setOffer(categItem.offers[0]);
        showOffer();
      }
    }

    // update category if order exist
    if (order) {
      const catOrder = order.find(f => f.key === category);
      setOrderId(order.length + 1);
      setCategoryOrder(catOrder ? catOrder.order : []);
    }

    if (categItem && categItem.dailymenu) {
      handleClearOrder();
      showDailyInfo();
    }
  }, []);

  return categoryItem && (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>
            {categoryItem.name}
          </Title>
          {categoryItem.dailymenu && (
            <InfoDailyButton onClick={showDailyInfo}>
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
                currency: t(`common.currency.${currency[0]}`),
              }, handleToggleModalAllergens, handleSetOrder))}
            </DailyWrapper>
          ))}
          {!categoryItem.dailymenu && !categoryItem.groups && getDishes(categoryItem.dishes).map(dish => DishBlock({
            dish,
            order: categoryOrder,
            currency: t(`common.currency.${currency[0]}`),
          }, handleToggleModalAllergens, handleSetOrder))} 
        </DishList>
        {categoryItem.dailymenu && (
          <DailyOrderWrapper>
            <PriceWrapper>
              <PriceText>
                {t('common.price')}
              </PriceText>
              <PriceDaily>
                {`${categoryItem.options.price.toFixed(2)} ${t(`common.currency.${currency[0]}`)}`}
              </PriceDaily>
            </PriceWrapper>
            <Include>
              {`${t('common.include')}: ${categoryItem.options.include}`}
            </Include>
            <DailyOrderButton onClick={handleClearOrder}>
              {t('common.add_to_order')}
            </DailyOrderButton>
          </DailyOrderWrapper>
        )}
      </Wrapper>
      <ThankYou />
    </>
  );
};

export default Category;
