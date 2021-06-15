import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RestaurantSvg,
  AlertCircleSvg,
  UsersSvg,
  Conversation1Svg,
  Conversation2Svg,
  ChecklistSvg,
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
    roles: [1, 2, 3, 4],
  },
  {
    key: 'users',
    icon: <UsersSvg />,
    roles: [1],
  },
  {
    key: 'staff',
    icon: <UsersSvg />,
    roles: [1],
  },
  {
    key: 'reports',
    icon: <ChecklistSvg />,
    roles: [1],
  },
  {
    key: 'chat',
    icon: <Conversation1Svg />,
    roles: [1],
  },
  {
    key: 'news',
    icon: <Conversation2Svg />,
    roles: [1],
  },
  // {
  //   key: 'mails',
  //   icon: <Conversation1Svg />,
  //   roles: [1],
  // },
];

export const Sidebar = memo(({
  roles,
  path,
  onRoute,
}) => {
  const [t] = useTranslation();

  return (
    <SidebarWrapper>
      <Menu>
        {MENU_LIST.filter(f => roles.some(s => f.roles.includes(s))).map(({ key, icon }) => (
          <Item
            key={`_item_menu_${key}`}
            active={path.indexOf(key.slice(0, -1)) > -1}
            onClick={() => onRoute(key)}
          >
            <Icon>
              {icon}
            </Icon>
            {t(`common.words.${key}`)}
          </Item>
        ))}
      </Menu>
      <Menu>
        <Item onClick={() => onRoute('auth')}>
          <Icon>
            <AlertCircleSvg />
          </Icon>
          {t('common.words.logout')}
        </Item>
      </Menu>
    </SidebarWrapper>
  );
});
