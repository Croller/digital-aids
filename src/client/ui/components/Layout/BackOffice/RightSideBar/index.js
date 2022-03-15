import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAccess } from 'client/utils/common';
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
    role: 'account',
  },
];

const MENU_USER_LIST = [
  {
    key: 'orders',
    icon: <ShoppingBagSvg />,
    role: 'account',
  },
  {
    key: 'notify',
    icon: <BellSvg />,
    role: 'account',
  },
  {
    key: 'bookmarks',
    icon: <BookmarkSvg />,
    role: 'account',
  },
  {
    key: 'settings',
    icon: <ToolsSvg />,
    role: 'account',
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
        {MENU_USER_LIST.filter(f => getAccess({ role: f.role, roles })).map(({ key, icon }) => (
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
