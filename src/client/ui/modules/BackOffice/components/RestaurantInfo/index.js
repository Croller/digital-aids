import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Tooltip } from 'antd';
import { useModal } from 'react-modal-hook';
import { useTranslation } from 'react-i18next';
import { ConfirmChange } from 'client/ui/components/_block/Modal/ConfirmChange';
import {
  ArchiveSvg,
  EditSvg,
  MapMarkerSvg,
  PhoneCallSvg,
  RestaurantSvg,
  TrashSvg,
  PlusSvg,
  QRCodeSvg,
  ClockSvg,
  StarHalfDashedSvg,
} from 'client/assets/images';
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
  NavItemStyled,
} from './styled';

const CONTROL_CONFIG = [
  {
    key: 'opinions',
    icon: <StarHalfDashedSvg />,
    path: '/back-office/restaurant/:restaurant/opinions',
  },
  {
    key: 'reserve',
    icon: <ClockSvg />,
    path: '/back-office/restaurant/:restaurant/reserve',
  },
  {
    key: 'flayer',
    icon: <QRCodeSvg />,
    path: '/back-office/restaurant/:restaurant/flayer',
  },
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

export const RestaurantInfo = ({
  id,
  name,
  address,
  phone,
  onEvent = () => {},
  className,
}) => {
  const [t] = useTranslation();
  const history = useHistory();
  const { pathname } = useLocation();
  const [event, setEvent] = useState(null);
  const [showConfirm, hideConfirm] = useModal(() => (
    <ConfirmChange
      title={t(`backOffice.confirmModal.restaurant.${event.key}`)}
      textOk={t(`common.words.${event.key}`)}
      textCancel={t('common.words.doNot')}
      onCancel={hideConfirm}
      onClose={hideConfirm}
      onOk={() => {
        hideConfirm();
        onEvent(event.params);
      }}
    />
  ), [event]);

  const handleRoute = (key, path) => {
    const params = { id };
    if (path) {
      history.push(path.replace(':restaurant', id));
      return;
    }

    if (key === 'restore') params.is_archived = false;
    if (key === 'delete') params.is_deleted = true;
    if (key === 'archive') params.is_archived = true;

    setEvent({ key, params });
    showConfirm();
  };

  const getControl = () => {
    const arr = [...CONTROL_CONFIG];
    if (pathname.indexOf('/restaurants') > -1) {
      if (pathname.indexOf('/restaurants/archive') > -1) {
        return arr.filter(({ key }) => ['restore', 'delete'].includes(key));
      }
      return arr.filter(({ key }) => ['archive', 'edit'].includes(key));
    }
    if (pathname.indexOf('/restaurant/') > -1 && pathname.indexOf('/language') > -1) {
      return arr.filter(({ key }) => ['flayer', 'reserve', 'opinions'].includes(key));
    }
    return [];
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
            text={phone ? phone[0] : ''}
          />
          <Address
            icon={<MapMarkerSvg />}
            text={address}
          />
        </Contacts>
        <NavItemStyled id={id} onClick={(path) => handleRoute('restaurant', path)} />
      </Content>
    </Wrapper>
  );
};
