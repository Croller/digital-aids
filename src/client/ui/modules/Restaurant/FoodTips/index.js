import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { updateOrder } from 'client/store/restaurant';
import { getDictionaryItem, getUrl } from 'client/utils/common';
import { v4 as uuidv4 } from 'uuid';
import { 
  ChevronSvg,
  CloseSvg,
} from 'client/assets/images';
import { 
  Wrapper,
  CloseButton,
  CarouselControls, Control,
  CarouselDots,
  CarouselDot,
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
    dictionary,
    foodtips,
    order,
  } = useSelector(store => store.restaurant);
  const rootDispatch = useDispatch();
  const history = useHistory();
  const [t] = useTranslation();
  const [slide, setSlide] = useState(0);
  const [items, setItems] = useState(null);

  const hangleChangSlide = (direction) => {
    if (direction === 'next') {
      if (slide + 1 <= items.length - 1) {
        setSlide(slide + 1);
        return null;
      }
    }
    if (direction === 'prev') {
      if (slide > 0) {
        setSlide(slide - 1);
        return null;
      }
    }
    setSlide(direction === 'next' ? 0 : items.length - 1);
  };

  const handleRoute = (part = 'categories') => {
    const path = `/restaurant/${key}/${part}`;

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

    let newOrder = { ...foodtips };
    newOrder.dish = { ...obj };
    newOrder.dish.order_count = 1;
    newOrder.order_id = uuidv4();
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
    setItems(foodtips.dishes.map(f => ({ ...f, added: false })));
  }, []);

  return items && (
    <Wrapper>
      <CloseButton onClick={() => handleRoute('menu')}>
        <CloseSvg />
      </CloseButton>
      <CarouselControls>
        {['prev', 'next'].map((direction, c) => (
          <Control
            key={`_slider_control_${c + 1}`}
            onClick={() => hangleChangSlide(direction)}
          >
            <ChevronSvg />
          </Control>
        ))}
      </CarouselControls>
      <CarouselDots>
        {items.map((item, i) => (<CarouselDot key={`_dot_${i + 1}`} active={i === slide} />))}
      </CarouselDots>
      {items.filter((f, i) => i === slide).map((item, i) => (
        <React.Fragment key={`_dish_${i + 1}`}>
          <ImgWrapper>
            <Img src={item.images && item.images[0] ? `${getUrl()}/static/restaurants/dishes/${item.images[1] || item.images[0]}.png` : null} />
            <Dish>
              {item.name}
            </Dish>
          </ImgWrapper>
          <Content>
            <Description>
              {item.description}
            </Description>
            <PriceWrapper>
              <Total>
                {`${t('restaurant.common.total')}:`}
              </Total>
              <Price>
                {`${item.price[0].cost} ${getDictionaryItem(currency[0], 'id', dictionary.currency, 'symbol')}`}
              </Price>
            </PriceWrapper>
            <AddButton added={item.added} onClick={() => !item.added && handleSetOrder(item)}>
              {t(`restaurant.common.add${item.added ? 'ed' : '_to_order'}`)}
            </AddButton>
          </Content>
          <DontWasteStyled />
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

export default FoodTips;
