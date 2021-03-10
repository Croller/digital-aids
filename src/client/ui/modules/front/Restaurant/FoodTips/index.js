import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { updateOrder } from 'client/store/restaurant';
import { 
  CloseSvg,
  FoodTipsTempPng,
} from 'client/assets/images';
import { 
  Wrapper,
  CloseButton,
  Slider,
  ImgWrapper,
  Img,
  Content,
  Dish,
  Description,
  PriceWrapper,
  Total,
  Price,
  AddButton,
  DontWasteStyled,
} from './styled';

const FoodTips = () => {
  const {
    info: { key, currency },
    dishes,
    categories,
    order,
  } = useSelector(store => store.restaurant);
  const rootDispatch = useDispatch();
  const history = useHistory();
  const [t] = useTranslation();
  const [items, setItems] = useState(null);

  const handleRoute = () => {
    const path = `/restaurant/${key}/categories`;

    if (history.action !== 'POP') {
      history.goBack();
      return null;
    }
    history.push(path);
  };

  const handleSetOrder = (obj) => {
    setItems(items.map(item => {
      if (obj.id === item.id) {
        return { ...item, added: true };
      }
      return item;
    }));

    let newOrder = { ...obj };
    newOrder.dish.order_count = 1;
    newOrder.order_id = 1;
    newOrder.order = [newOrder.dish];
    delete newOrder.dish;

    const existOrder = order && order.find(f => f.id === obj.id);
    if (existOrder) {
      newOrder = existOrder;
      newOrder.order = newOrder.order.reduce((arr, dish) => {
        if (obj.dish.id === dish.id) {
          return [...arr, { ...dish, order_count: dish.order_count + 1 }];
        }
        return [...arr, dish];
      }, []);
    }
    rootDispatch(updateOrder(newOrder));
  };

  useEffect(() => {
    window.prerenderReady = true;

    const foodtips = categories
      .filter(f => !f.dailymenu && f.dishes)
      .reduce((arr, category) => {
        const arrDishes = category.dishes.map(id => ({
          ...category,
          dish: dishes.find(f => f.id === id),
          added: false,
        }));
        return [...arr, ...arrDishes];
      }, []);
    setItems(foodtips);
  }, []);

  return (
    <Wrapper>
      <CloseButton onClick={() => handleRoute('information')}>
        <CloseSvg />
      </CloseButton>
      {items && (
        <Slider
          autoPlay={false}
          showThumbs={false}
        >
          {items.map((item, i) => (
            <React.Fragment key={`_dish_${i + 1}`}>
              <ImgWrapper>
                <Img src={item.dish.images ? item.dish.images[0] : FoodTipsTempPng} />
                <Dish>
                  {item.dish.name}
                </Dish>
              </ImgWrapper>
              <Content>
                <Description>
                  {item.dish.foodtips}
                </Description>
                <PriceWrapper>
                  <Total>
                    {`${t('common.total')}:`}
                  </Total>
                  <Price>
                    {`${item.dish.price.toFixed(2)} ${t(`common.currency.${currency[0]}`)}`}
                  </Price>
                </PriceWrapper>
                <AddButton added={item.added} onClick={() => !item.added && handleSetOrder(item)}>
                  {t(`common.add${item.added ? 'ed' : '_to_order'}`)}
                </AddButton>
              </Content>
              <DontWasteStyled />
            </React.Fragment>
          ))}
        </Slider>
      )}
    </Wrapper>
  );
};

export default FoodTips;
