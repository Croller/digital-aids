import React, { memo } from 'react';
import { IconText } from 'client/ui/components/_block/IconText';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MenuSvg,
  InfoCircleSvg,
  ChefHeadSvg,
} from 'client/assets/images';
import { 
  NavItemWrapper,
  Item,
} from './styled';

const NAV_CONFIG = [
  {
    key: 'menu',
    icon: (<MenuSvg />),
    path: '/back-office/restaurant/:restaurant/category',
  },
  {
    key: 'specialDeals',
    icon: (<InfoCircleSvg />),
    path: '/back-office/restaurant/:restaurant/special-deals',
  },
  {
    key: 'foodtips',
    icon: (<ChefHeadSvg />),
    path: '/back-office/restaurant/:restaurant/foodtips',
  },
];

export const NavItem = memo(({
  id = null,
  onClick = () => {},
  className,
}) => {
  const [t] = useTranslation();
  const params = useParams();
  const { pathname } = useLocation();

  const getNav = () => {
    if (pathname.indexOf('restaurants/archive') > -1) {
      return [];
    }
    if (pathname.indexOf('restaurants') > -1) {
      return [NAV_CONFIG[0]];
    }
    if (pathname.indexOf('category') > -1) {
      return NAV_CONFIG.slice(-2);
    }
    return NAV_CONFIG;
  };

  return (
    <NavItemWrapper className={className}>
      {getNav().map(({ key, icon, path }) => (
        <Item key={key} onClick={() => onClick(path.replace(':restaurant', id || params.restaurant))}>
          <IconText
            icon={icon}
            text={t(`common.words.${key}`)}
          />
        </Item>
      ))}
    </NavItemWrapper>
  );
});
