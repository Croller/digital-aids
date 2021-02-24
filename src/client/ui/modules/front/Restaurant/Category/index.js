import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DishImage } from 'client/ui/components/_block/DishImage';
import { PlateTempPng } from 'client/assets/images';
import { Counter } from 'client/ui/components/_block/Counter';
import { ThankYou } from 'client/ui/components/Footer/ThankYou';
import {
  Wrapper,
  Title,
  DishList,
  DishWrapper,
  OrderWrapper,
  Price,
} from './styled';

const DISH_LIST = [...Array(8)].reduce((arr, item, i) => ([...arr, {
  id: i,
  src: PlateTempPng,
  number: i + 1,
  title: 'Spicy Korean salad',
  description: 'Spicy Korean salad with beef, fresh cucumbers and paprika',
  foodtips: 'Spicy Korean salad with beef, fresh cucumbers and paprika \n Spicy Korean salad with beef, fresh cucumbers and paprika',
  weight: 200,
  price: 6.50,
  currency: 'euro',
}]), []);

const Category = () => {
  const { categories } = useSelector(store => store.restaurant);

  const history = useHistory();
  const { category } = useParams();
  const [t] = useTranslation();
  const [order, setOrder] = useState([]);

  const handleSetOrder = (obj) => {
    setOrder([
      ...order.filter(f => f.id !== obj.id),
      obj,
    ]);

    // to store
    console.log({
      category,
      order,
    });
  };

  const handleShowAllergens = (id) => {
    console.log('show allergens:', id);
  };

  const getCount = (id) => {
    const dish = order.find(f => f.id === id);
    return dish ? dish.count : 0;
  };

  const getCategory = (key) => {
    const cat = (categories || mock).find(f => f.key === key);
    return cat || history.push('/404');
  };

  return (
    <>
      <Wrapper>
        <Title>
          {getCategory(category).name}
        </Title>
        <DishList>
          {DISH_LIST.map((item, i) => item.dishes(
            <DishWrapper key={`_dish_${i + 1}`}>
              <DishImage
                source={item}
                onShowAllergens={() => handleShowAllergens(i)}
              />
              <OrderWrapper>
                <Counter count={getCount(item.id)} onClick={(count) => handleSetOrder({ ...item, count })} />
                <Price>
                  {`${item.price.toFixed(2)}${t(`common.currency.${item.currency}`)}`}
                </Price>
              </OrderWrapper>
            </DishWrapper>
          ))} 
        </DishList>
      </Wrapper>
      <ThankYou />
    </>
  );
};

export default Category;
