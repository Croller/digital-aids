import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
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
  
  const ITEMS = [
    {
      key: 'language',
      icon: <GlobalSvg />,
      text: 'en',
    },
    {
      key: 'categories',
      icon: <DishApplinesSvg />,
      text: t('footerMobileMenu.menu'),
    },
    {
      key: 'order',
      icon: <DishSvg />,
      text: t('footerMobileMenu.order'),
    },
  ];

  return (
    <ScrollHideBlockStyled direction="down">
      <Wrapper>
        {ITEMS.map(({ key, icon, text }, i) => (
          <Item
            key={key}
            active={pathname.indexOf(key) > -1}
            onClick={() => onRoute(key)}
          >
            <IconWrapper>
              {i === 2 && (
                <CountBandage>
                  20
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
