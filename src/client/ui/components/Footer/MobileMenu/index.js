import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { GlobalSvg, DishSvg, MenuSvg } from 'client/assets/images';
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
  const [t, i18n] = useTranslation();
  const { order } = useSelector(store => store.restaurant);

  const getCount = () => {
    if (order) {
      return order.reduce((count, item) => {
        if (item.type === 'daily') {
          return count + 1;
        }
        return count + item.order.length;
      }, 0);
    }
    return null;
  };

  const MENU_ITEMS = [
    {
      key: 'language',
      icon: <GlobalSvg />,
      text: i18n.language,
    },
    {
      key: 'categories',
      icon: <MenuSvg />,
      text: t('restaurant.common.menu'),
    },
    {
      key: 'order',
      icon: <DishSvg />,
      text: t('restaurant.common.order'),
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
              {m === 2 && order && getCount() && (
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
