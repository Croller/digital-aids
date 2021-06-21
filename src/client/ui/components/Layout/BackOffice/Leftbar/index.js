import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  UserCircleSvg,
  RestaurantSvg,
  AlertCircleSvg,
  // Conversation1Svg,
} from 'client/assets/images';
import { 
  LeftBarWrapper,
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
    icon: <UserCircleSvg />,
    roles: [1, 2],
  },
  // {
  //   key: 'mails',
  //   icon: <Conversation1Svg />,
  //   roles: [1],
  // },
];

export const LeftBar = memo(({
  roles,
  path,
  onRoute,
}) => {
  const [t] = useTranslation();

  return (
    <LeftBarWrapper>
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
          {t('common.words.signout')}
        </Item>
      </Menu>
    </LeftBarWrapper>
  );
});
