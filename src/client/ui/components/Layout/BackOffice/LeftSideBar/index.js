import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAccess } from 'client/utils/common';
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
    role: 'root',
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
    role: 'account',
  },
  {
    key: 'staff',
    icon: <UsersSvg />,
    role: 'root',
  },
  {
    key: 'schedule',
    icon: <CalendarAltSvg />,
    role: 'root',
  },
  {
    key: 'reports',
    icon: <ChecklistSvg />,
    role: 'root',
  },
  {
    key: 'news',
    icon: <Conversation2Svg />,
    role: 'root',
  },
  {
    key: 'chat',
    icon: <Conversation1Svg />,
    role: 'root',
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
      {getAccess({ role: 'root', roles }) && (
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
