import React, { memo } from 'react';
import { IconText } from 'client/ui/components/_block/IconText';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CloneSvg } from 'client/assets/images';
import { 
  NavItemWrapper,
  Item,
} from './styled';

const NAV_CONFIG = [
  {
    key: 'dashboard',
    icon: <CloneSvg />,
    path: '/back-office/restaurant/:restaurant/language/en/dashboard',
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

  return (
    <NavItemWrapper className={className}>
      {NAV_CONFIG.map(({
        key,
        icon,
        path,
      }) => (
        <Item
          key={key}
          active={pathname.indexOf(path.split('/').splice(-1)) > -1}
          onClick={() => onClick(path.replace(':restaurant', id || params.restaurant))}
        >
          <IconText
            icon={icon}
            text={t(`common.words.${key}`)}
          />
        </Item>
      ))}
    </NavItemWrapper>
  );
});
