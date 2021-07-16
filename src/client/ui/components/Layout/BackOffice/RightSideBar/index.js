import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BellSvg,
  AlertCircleSvg,
  BookmarkSvg,
  ToolsSvg,
  UserCircleSvg,
  ShoppingBagSvg,
} from 'client/assets/images';
import { 
  RightSideBarWrapper,
  Hr,
  Menu,
  Item,
  Icon,
} from './styled';

const MENU_ROOT_LIST = [
  {
    key: 'account',
    icon: <UserCircleSvg />,
    roles: ['root', 'root_back', 'owner', 'owner_back', 'manager', 'manager_back', 'employee', 'user'],
  },
];

const MENU_USER_LIST = [
  {
    key: 'orders',
    icon: <ShoppingBagSvg />,
    roles: ['root', 'root_back', 'owner', 'owner_back', 'manager', 'manager_back', 'employee', 'user'],
  },
  {
    key: 'notify',
    icon: <BellSvg />,
    roles: ['root', 'root_back', 'owner', 'owner_back', 'manager', 'manager_back', 'employee', 'user'],
  },
  {
    key: 'bookmarks',
    icon: <BookmarkSvg />,
    roles: ['root', 'root_back', 'owner', 'owner_back', 'manager', 'manager_back', 'employee', 'user'],
  },
  {
    key: 'settings',
    icon: <ToolsSvg />,
    roles: ['root', 'root_back', 'owner', 'owner_back', 'manager', 'manager_back', 'employee', 'user'],
  },
];

export const RightSideBar = memo(({
  roles,
  path,
  onRoute,
}) => {
  const [t] = useTranslation();

  return (
    <RightSideBarWrapper>
      <Menu>
        {MENU_ROOT_LIST.map(({ key, icon }) => (
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
      <Hr />
      <Menu>
        {MENU_USER_LIST.filter(f => f.roles.some(s => roles.some(r => r[s]))).map(({ key, icon }) => (
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
          {t('common.words.signout')}
        </Item>
      </Menu>
    </RightSideBarWrapper>
  );
});
