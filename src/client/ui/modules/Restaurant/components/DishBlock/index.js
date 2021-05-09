import React from 'react';
import { DishImage } from 'client/ui/modules/Restaurant/components/DishImage';
import { Counter } from 'client/ui/modules/Restaurant/components/Counter';
import {
  DishWrapper,
  CounterWrapper,
  Price,
  CheckBoxStyled,
} from './styled';

export const DishBlock = ({
  dish,
  order,
  category,
  dailymenu = false,
  currency,
}, onShowAllergens, onSelect) => {
  const getCount = (id) => {
    const item = order.find(f => f.id === id);
    return item ? item.order_count : 0;
  };

  const getCheck = (id) => {
    const bool = order.find(f => f.dish && f.dish.id === id);
    return bool || false;
  };

  return (
    <DishWrapper
      key={`${dish.key}_${dish.id}`}
      onClick={() => dailymenu && onSelect({ ...category, dish })}
    >
      <DishImage
        source={dish}
        onShowAllergens={() => onShowAllergens(dish.allergens)}
      />
      {dailymenu ? (
        <CheckBoxStyled
          value={getCheck(dish.id) || false}
          onClick={() => onSelect({ ...category, dish })}
        />
      ) : (
        <CounterWrapper>
          <Counter
            value={getCount(dish.id)}
            onClick={(order_count) => onSelect({ ...dish, order_count })}
          />
          <Price selected={getCount(dish.id)}>
            {`${dish.price[0].cost}${currency}`}
          </Price>
        </CounterWrapper>
      )}
    </DishWrapper>
  );
};
