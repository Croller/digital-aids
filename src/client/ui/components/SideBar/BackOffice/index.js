import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  UserCircleSvg,
  RestaurantSvg,
} from 'client/assets/images';
import { 
  Wrapper,
  Menu,
  Item,
  Icon,
} from './styled';

const MENU_LIST = [
  {
    key: 'restourants',
    icon: <RestaurantSvg />,
  },
  {
    key: 'managers',
    icon: <UserCircleSvg />,
  },
];

export const SideBar = ({

  onRoute,
}) => {
  const history = useHistory();
  const [t] = useTranslation();
  const { location: { pathname } } = history;

  return (
    <Wrapper>
      <Menu>
        {MENU_LIST.map(({ key, icon }) => (
          <Item
            key={`_item_menu_${key}`}
            active={pathname.indexOf(key) > -1}
            onClick={() => onRoute(key)}
          >
            <Icon>
              {icon}
            </Icon>
            {t(`backOffice.sidebar.${key}`)}
          </Item>
        ))}
      </Menu>
    </Wrapper>
  );
};
