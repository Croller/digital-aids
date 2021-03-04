import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { GlobalSvg, DishSvg, DishApplinesSvg } from 'client/assets/images';
import {
  ScrollHideBlockStyled,
  Wrapper,
  Item,
  IconWrapper, CountBandage,
  // Icon,
  Text,
} from './styled';

export const MobileMenu = memo(({
  pathname = null,
  onRoute,
}) => {
  const [t] = useTranslation();
  const { order, categories } = useSelector(store => store.restaurant);

  const getCount = () => {
    if (categories && order) {
      return order.reduce((count, item) => {
        const category = categories.find(f => f.key === item.key);
        if (category.dailymenu) {
          return count + 1;
        }
        return count + item.order.length;
      }, 0);
    }
    return 0;
  };

  const MENU_ITEMS = [
    {
      key: 'language',
      icon: <GlobalSvg />,
      text: 'en',
    },
    {
      key: 'categories',
      icon: <DishApplinesSvg />,
      text: t('common.menu'),
    },
    {
      key: 'order',
      icon: <DishSvg />,
      text: t('common.order'),
    },
  ];

  return (
    <ScrollHideBlockStyled direction="down">
      <Wrapper>
        {MENU_ITEMS.map(({ key, icon, text }, m) => (
          <Item
            key={key}
            active={pathname.indexOf(key) > -1}
            onClick={() => onRoute(key)}
          >
            <IconWrapper>
              {m === 2 && order && (
                <CountBandage>
                  {getCount()}
                </CountBandage>
              )}
              {icon}
            </IconWrapper>
            <Text>{text}</Text>
          </Item>
        ))}
      </Wrapper>
    </ScrollHideBlockStyled>
  );
});
