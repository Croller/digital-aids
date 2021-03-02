import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DishBlock } from 'client/ui/components/_block/DishBlock';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import { InfoCircleSvg, ClockSvg } from 'client/assets/images';
import { updateOrder } from 'client/store/restaurant';
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

  const handleShowAllergens = (arr) => {
    console.log('show allergens:', arr);
  };

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
    if (order) {
      setOrderId(order ? order.length + 1 : 1);
    }
  };

  useEffect(() => {
    const categItem = categories.find(f => f.key === category) || null;
    setCategoryItem(categItem || null);

    // update category if order exist
    let catOrder = null;
    if (order) {
      catOrder = order.find(f => f.key === category);
      setOrderId(order ? order.length + 1 : orderId);
    }
    setCategoryOrder(catOrder ? catOrder.order : []);

    return () => {
      handleClearOrder();
    };
  }, []);
  
  return categoryItem && (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>
            {categoryItem.name}
          </Title>
          {categoryItem.dailymenu && (
            <InfoDailyButton>
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
          {categoryItem.dailymenu ? categoryItem.groups.map(group => (
            <DailyWrapper key={group.key}>
              <TitleGroup>
                {group.name}
              </TitleGroup>
              {getDishes(group.dishes).map(dish => DishBlock({
                dish,
                group,
                order: categoryOrder,
                dailymenu: true,
                currency: t(`common.currency.${currency[0]}`),
              }, handleShowAllergens, handleSetOrder))}
            </DailyWrapper>
          )) : getDishes(categoryItem.dishes).map(dish => DishBlock({
            dish,
            order: categoryOrder,
            currency: t(`common.currency.${currency[0]}`),
          }, handleShowAllergens, handleSetOrder))} 
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
