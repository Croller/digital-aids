import React from 'react';
import { DishImage } from 'client/ui/components/_block/DishImage';
import { Counter } from 'client/ui/components/_block/Counter';
import {
  DishWrapper,
  CounterWrapper,
  Price,
  CheckBoxStyled,
} from './styled';

export const DishBlock = ({
  dish,
  order,
  group,
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
      onClick={() => dailymenu && onSelect({ ...group, dish })}
    >
      <DishImage
        source={dish}
        onShowAllergens={() => onShowAllergens(dish.allergens)}
      />
      {dailymenu ? (
        <CheckBoxStyled
          value={getCheck(dish.id) || false}
          onClick={() => onSelect({ ...group, dish })}
        />
      ) : (
        <CounterWrapper>
          <Counter
            value={getCount(dish.id)}
            onClick={(order_count) => onSelect({ ...dish, order_count })}
          />
          <Price selected={getCount(dish.id)}>
            {`${dish.price.toFixed(2)}${currency[0]}`}
          </Price>
        </CounterWrapper>
      )}
    </DishWrapper>
  );
};
