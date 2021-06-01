import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DishBlock } from 'client/ui/modules/Restaurant/components/DishBlock';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import { InfoCircleSvg, ClockSvg } from 'client/assets/images';
import { updateOrder } from 'client/store/restaurant';
import { useModal } from 'react-modal-hook';
import { AllergensModal } from 'client/ui/components/_block/Modal/Allergens';
import { DailyInfoModal } from 'client/ui/components/_block/Modal/DailyInfo';
import { DailyConfirmModal } from 'client/ui/components/_block/Modal/DailyConfirm';
// import { OfferCategoryModal } from 'client/ui/components/_block/Modal/Offer/Category';
import { setOfferViewed } from 'client/utils/localStorageEdit';
import { getDictionaryItem } from 'client/utils/common';
import { v4 as uuidv4 } from 'uuid';
import { getWorkTime } from 'client/utils/restaurant';
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
    // offers,
    // dishes,
    order,
    dictionary,
  } = useSelector(store => store.restaurant);
  const { category } = useParams();
  const history = useHistory();
  const rootDispatch = useDispatch();
  const [t] = useTranslation();
  const [orderId, setOrderId] = useState(uuidv4());
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
      source={categoryItem.options}
      onClose={hideDailyInfo}
    />
  ), [offer]);

  // const [showOffer, hideOffer] = useModal(() => (
  //   <OfferCategoryModal
  //     source={offer}
  //     onClose={hideOffer}
  //   />
  // ), [offer]);

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
    let edited = null;
    data = [...categoryOrder.filter(f => f.id !== obj.id)];
    if (obj.dishes) {
      const edit = {
        ...obj,
        dishes: obj.dishes.filter(f => f.order_count !== 0),
      };
      if (edit.dishes.length !== 0) {
        edited = edit;
      }
    }
    if (!obj.dishes && obj.order_count !== 0) {
      edited = obj;
    }
    if (edited) {
      data.push(obj);
    }

    if (categoryItem.type !== 'daily') {
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
    setOrderId(order ? uuidv4() : orderId + 1);
  };

  const handleToggleModalAllergens = (arr) => {
    const edited = dictionary.allergens.filter(f => arr.includes(f.id));
    setAllergens(edited);
    showAllergens();
  };

  const handleShowDaily = () => {
    setOffer(categoryItem);
    showDailyInfo();
  };

  useEffect(() => {
    const categItem = categories.find(f => f.key === category) || null;
    
    if (categItem && categItem.type === 'daily') {
      setOfferViewed(categItem.id, () => {
        setOffer(categItem);
        showDailyInfo();
      });
    }
    // if (categItem.dishes) {
    //   const specialDeal = offers.find(f => categItem.dishes.some(d => d.id === f.id));
    //   console.log('specialDeal', specialDeal, categories);
    //   if (specialDeal) {
    //     setOfferViewed(specialDeal.id, () => {
    //       setOffer(specialDeal);
    //       showDailyInfo();
    //     });
    //   }
    // }

    if (order) {
      const catOrder = order.find(f => f.key === category && categItem.type !== 'daily');
      setCategoryOrder(catOrder ? catOrder.order : []);
    }
    if (categItem && categItem.dailymenu) {
      setCategoryOrder([]);
    }
    setOrderId(order ? uuidv4() : orderId);
    setCategoryItem(categItem);

    return () => {
      setOrderId(null);
      setCategoryItem(null);
    };
  }, []);

  return categoryItem && (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>
            {categoryItem.name}
          </Title>
          {categoryItem.type === 'daily' && (
            <InfoDailyButton onClick={handleShowDaily}>
              <InfoCircleSvg />
            </InfoDailyButton>
          )}
        </TitleWrapper>
        {categoryItem.type === 'daily' && (
          <WorkDailyButton>
            <ClockSvg />
            {getWorkTime(categoryItem.options.at_work)}
          </WorkDailyButton>
        )}
        <DishList>
          {categoryItem.children && categoryItem.children.map(group => group.dishes.length > 0 && (
            <DailyWrapper key={group.key}>
              <TitleGroup>
                {group.name}
              </TitleGroup>
              {group.dishes.map(dish => DishBlock({
                dish,
                category: group,
                order: categoryOrder,
                dailymenu: categoryItem.type === 'daily',
                currency: getDictionaryItem(currency[0], 'id', dictionary.currency, 'symbol'),
              }, handleToggleModalAllergens, handleSetOrder))}
            </DailyWrapper>
          ))}
          {!categoryItem.type !== 'daily' && !categoryItem.children && categoryItem.dishes.map(dish => DishBlock({
            dish,
            category: categoryItem,
            order: categoryOrder,
            currency: getDictionaryItem(currency[0], 'id', dictionary.currency, 'symbol'),
          }, handleToggleModalAllergens, handleSetOrder))} 
        </DishList>
        {categoryItem.type === 'daily' && (
          <DailyOrderWrapper>
            <PriceWrapper>
              <PriceText>
                {t('restaurant.common.price')}
              </PriceText>
              <PriceDaily>
                {`${categoryItem.options.price} ${getDictionaryItem(currency[0], 'id', dictionary.currency, 'symbol')}`}
              </PriceDaily>
            </PriceWrapper>
            <Include>
              {`${t('restaurant.common.include')}: ${categoryItem.options.description}`}
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
