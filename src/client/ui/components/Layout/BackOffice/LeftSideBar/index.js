import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RestaurantSvg,
  UsersSvg,
  Conversation1Svg,
  Conversation2Svg,
  ChecklistSvg,
  CalendarAltSvg,
  QuestionCircleSvg,
} from 'client/assets/images';
import { 
  LeftSideBarWrapper,
  Hr,
  Menu,
  Item,
  Icon,
} from './styled';

const MENU_ROOT_LIST = [
  {
    key: 'users',
    icon: <UsersSvg />,
    roles: ['root', 'root_back'],
  },
  // {
  //   key: 'mails',
  //   icon: <Conversation1Svg />,
  //   roles: ['root', 'root_back'],
  // },
];

const MENU_USER_LIST = [
  {
    key: 'restaurants',
    icon: <RestaurantSvg />,
    roles: ['root', 'root_back', 'owner', 'manager', 'employee', 'account'],
  },
  {
    key: 'staff',
    icon: <UsersSvg />,
    roles: ['root'],
  },
  {
    key: 'schedule',
    icon: <CalendarAltSvg />,
    roles: ['root'],
  },
  {
    key: 'reports',
    icon: <ChecklistSvg />,
    roles: ['root'],
  },
  {
    key: 'news',
    icon: <Conversation2Svg />,
    roles: ['root'],
  },
  {
    key: 'chat',
    icon: <Conversation1Svg />,
    roles: ['root'],
  },
];

export const LeftSideBar = memo(({
  roles,
  path,
  onRoute,
}) => {
  const [t] = useTranslation();

  return (
    <LeftSideBarWrapper>
      {roles.some(s => s.root || s.root_back) && (
        <>
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
        </>
      )}
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
        <Item onClick={() => onRoute('support')}>
          <Icon>
            <QuestionCircleSvg />
          </Icon>
          {t('common.words.support')}
        </Item>
      </Menu>
    </LeftSideBarWrapper>
  );
});
