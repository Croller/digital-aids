import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IconText } from 'client/ui/components/_block/IconText';
import { Tooltip } from 'antd';
import { useModal } from 'react-modal-hook';
import {
  ArchiveSvg,
  EditSvg,
  MapMarkerSvg,
  PhoneCallSvg,
  RestaurantSvg,
  TrashSvg,
  MenuSvg,
  InfoCircleSvg,
  ChefHeadSvg,
  PlusSvg,
} from 'client/assets/images';
import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import { 
  Wrapper,
  Header,
  Name,
  Controls,
  Control,
  Hr,
  Content,
  Contacts,
  Phone,
  Address,
  NavWrapper,
  NavButton,
} from './styled';

const CONTROL_CONFIG = [
  {
    key: 'archive',
    icon: <ArchiveSvg />,
    path: null,
  },
  {
    key: 'edit',
    icon: <EditSvg />,
    path: 'restaurant/:restaurant',
  },
  {
    key: 'restore',
    icon: <PlusSvg />,
    path: null,
  },
  {
    key: 'delete',
    icon: <TrashSvg />,
    path: null,
  },
];

const NAV_CONFIG = [
  {
    key: 'menu',
    icon: (<MenuSvg />),
    path: 'restaurant/:restaurant/category',
  },
  {
    key: 'specialDeals',
    icon: (<InfoCircleSvg />),
    path: 'restaurant/:restaurant/special-deals',
  },
  {
    key: 'foodtips',
    icon: (<ChefHeadSvg />),
    path: 'restaurant/:restaurant/foodtips',
  },
];

export const RestaurantInfo = ({
  t,
  id,
  name,
  address,
  phone,
  onClick = () => {},
  className,
}) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [eventKey, setEventKey] = useState(null);
  const [showConfir, hideConfirm] = useModal(() => (
    <ConfirmChange
      title={t(`backOffice.confirmChange.${eventKey}`)}
      textOk={t(`common.words.${eventKey}`)}
      textCancel={t('common.words.doNot')}
      onCancel={hideConfirm}
      onClose={hideConfirm}
      onOk={() => {
        hideConfirm();
        onClick(eventKey);
      }}
    />
  ), [eventKey]);

  const handleRoute = (key, path) => {
    const obj = { id };
    if (path) {
      history.push(path.replace(':restaurant', id));
      return;
    }

    if (key === 'restore') obj.is_archived = false;
    if (key === 'delete') obj.is_deleted = true;
    if (key === 'archive') obj.is_archived = true;

    setEventKey(key);
    showConfir();
  };

  const getControl = () => {
    const arr = [...CONTROL_CONFIG];
    if (pathname.indexOf('restaurants/archive') > -1) {
      return arr.slice(-2);
    }
    return arr.splice(0, 2);
  };

  const getNav = () => {
    if (pathname.indexOf('restaurants/archive') > -1) {
      return [];
    }
    if (pathname.indexOf('restaurants') > -1) {
      return [NAV_CONFIG[0]];
    }
    return NAV_CONFIG.slice(-2);
  };

  return (
    <Wrapper className={className}>
      <Header>
        <Name
          icon={<RestaurantSvg />}
          text={name}
        />
        <Controls>
          {getControl().map(({ key, icon, path }) => (
            <Tooltip key={key} placement="top" title={t(`common.words.${key}`)}>
              <Control onClick={() => handleRoute(key, path)}>
                {icon}
              </Control>
            </Tooltip>
          ))}
        </Controls>
      </Header>
      <Hr />
      <Content>
        <Contacts>
          <Phone
            icon={<PhoneCallSvg />}
            text={phone[0]}
          />
          <Address
            icon={<MapMarkerSvg />}
            text={address}
          />
        </Contacts>
        <NavWrapper>
          {getNav().map(({ key, icon, path }) => (
            <NavButton key={key} onClick={() => handleRoute(key, path)}>
              <IconText
                icon={icon}
                text={t(`common.words.${key}`)}
              />
            </NavButton>
          ))}
        </NavWrapper>
      </Content>
    </Wrapper>
  );
};
