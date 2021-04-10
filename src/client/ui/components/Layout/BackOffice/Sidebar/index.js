import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  UserCircleSvg,
  RestaurantSvg,
} from 'client/assets/images';
import { 
  SidebarWrapper,
  Menu,
  Item,
  Icon,
} from './styled';

const MENU_LIST = [
  {
    key: 'restaurants',
    icon: <RestaurantSvg />,
  },
  {
    key: 'users',
    icon: <UserCircleSvg />,
  },
];

export const Sidebar = memo(({
  path,
  onRoute,
}) => {
  const [t] = useTranslation();

  return (
    <SidebarWrapper>
      <Menu>
        {MENU_LIST.map(({ key, icon }) => (
          <Item
            key={`_item_menu_${key}`}
            active={path.indexOf(key) > -1}
            onClick={() => onRoute(key)}
          >
            <Icon>
              {icon}
            </Icon>
            {t(`common.words.${key}`)}
          </Item>
        ))}
      </Menu>
    </SidebarWrapper>
  );
});
